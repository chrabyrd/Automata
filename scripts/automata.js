class Automata {
  constructor (board) {
    this.board = board;
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)] - 1;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  cellLogic () {
    const changingCells = {};
    const cells = this.board.cells;
    const shuffledCells = this.shuffle(cells.map(cell => cell.id - 1));

    shuffledCells.forEach(id => {
      if (!cells[id].type) return;

      const type = cells[id].type;
      const typeHash = { "typeOne": 0, "typeTwo": 0, "typeThree": 0 };
      const cellNeighbors = cells[id].neighbors;
      cellNeighbors.forEach(num => {typeHash[cells[num - 1].type]++;});

      const wander = (array) => {
        const nextCell = this.random(array);
        changingCells[nextCell] = type;
        changingCells[id] = false;
      };

      const reproduce = (array) => {
        const nextCell = this.random(array);
        changingCells[nextCell] = type;
      };

      const die = () => {
        changingCells[id] = false;
      };

      if (type === 'typeOne') {
        // EXAMPLE: CABBAGE
        const validNeighbors = cellNeighbors.filter(function(cell) {
          cell = cell - 1;
          return !changingCells[cell]
          && !cells[cell].type;
        });

        if (validNeighbors.length === 0) return;

        // FRACTALS
        // if (!typeHash['typeTwo'] && !typeHash['typeThree']) {
          reproduce(validNeighbors);
        // }

      } else if (type === 'typeTwo') {
        // EXAMPLE: NON-PREDATOR SPECIES
        const validNeighbors = cellNeighbors.filter(function(cell) {
          cell = cell - 1;
          return !changingCells[cell]
          && (cells[cell].type !== type);
        });

        if (validNeighbors.length === 0) return;

        if (!typeHash['typeOne']) {
          die();
        } else {
          wander(validNeighbors);
          if (typeHash[type]) {
            reproduce(validNeighbors);
          }
        }

      } else if (type === 'typeThree') {
        // EXAMPLE: NON-PREDATOR SPECIES
        const validNeighbors = cellNeighbors.filter(function(cell) {
          cell = cell - 1;
          return !changingCells[cell]
          && (cells[cell].type !== type);
        });

        if (validNeighbors.length === 0) return;

        if (!typeHash['typeOne']) {
          die();
        } else {
          wander(validNeighbors);
          if (typeHash[type]) {
            reproduce(validNeighbors);
          }
        }
      }

    });

    Object.keys(changingCells).forEach(key => {
      cells[parseInt(key)].changeState(changingCells[key]);
    });
  }
}

export default Automata;
