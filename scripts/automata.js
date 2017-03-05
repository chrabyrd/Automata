class Automata {
  constructor (board) {
    this.board = board;
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)] - 1;
  }

  shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
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
      const type = cells[id].type;
      const typeHash = { "typeOne": 0, "typeTwo": 0, "typeThree": 0 };
      const cellNeighbors = cells[id].neighbors;

      const validNeighbors = cellNeighbors.filter(function(cell) {
        cell = cell - 1;
        return !changingCells[cell]
        && (cells[cell].type !== type);
      });

      if (!type) return;

      cellNeighbors.forEach(num => {typeHash[cells[num - 1].type]++;});

      const wander = () => {
        if (validNeighbors.length === 0) return;
        const nextCell = this.random(validNeighbors);
        changingCells[nextCell] = type;
        changingCells[id] = false;
      };

      const reproduce = () => {
        if (validNeighbors.length === 0) return;
        const nextCell = this.random(validNeighbors);
        changingCells[nextCell] = type;
      };

      const die = () => {
        changingCells[id] = false;
      };

      wander();
      if (typeHash[type]) {
        reproduce();
      }
    });

    Object.keys(changingCells).forEach(key => {
      cells[parseInt(key)].changeState(changingCells[key]);
    });
  }
}

export default Automata;
