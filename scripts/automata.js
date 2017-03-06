class Automata {
  constructor (board) {
    this.board = board;
    this.validNeighbors = [];
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)];
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

      const getValidNeighbors = cellTypeArray => {
        let validNeighbors = cellNeighbors;

        validNeighbors = cellNeighbors.filter(function(cell) {
          return !changingCells[cell - 1];
        });

        if (!cellTypeArray) return validNeighbors;

        validNeighbors = validNeighbors.filter(function(cell) {
          cell = cell - 1;
          let isValid = false;
          cellTypeArray.forEach(cellType => {
            if (cells[cell].type === cellType) isValid = true;
          });
          return isValid;
        });

        return validNeighbors;
      };

      const wander = array => {
        const nextCell = this.random(array) - 1;
        changingCells[nextCell] = type;
        changingCells[id] = false;
      };

      const stay = () => {
        changingCells[id] = type;
      };

      const reproduce = array => {
        const nextCell = this.random(array) - 1;
        changingCells[nextCell] = type;
      };

      const die = () => {
        changingCells[id] = false;
      };

      const live = conditionalHash => {

        if (conditionalHash['skipCon']) {
          return;
        } else if (conditionalHash['dieCon']) {
          die();
        } else if (conditionalHash['stayCon']) {
          stay();
        } else if (conditionalHash['reproduceCon']) {
          reproduce(this.validNeighbors);
          if (conditionalHash['wanderCon']) wander(this.validNeighbors);
        } else if (conditionalHash['wanderCon']) {
          wander(this.validNeighbors);
        }

      };

      if (type === 'typeOne') {
        this.validNeighbors = getValidNeighbors([false]);

        // EXAMPLE: CABBAGE
        live({
          'skipCon': this.validNeighbors.length === 0,
          'reproduceCon': true
        });

        // EXAMPLE: FRACTALS (DISABLE GENDER)
        // live({
        //   'skipCon': this.validNeighbors.length === 0,
        //   'reproduceCon': !typeHash['typeTwo'] && !typeHash['typeThree']
        // });

      } else if (type === 'typeTwo') {
        // EXAMPLE: NON-PREDATOR SPECIES
        this.validNeighbors = getValidNeighbors([false, 'typeOne']);
        live({
          'dieCon': !typeHash['typeOne'],
          'stayCon': this.validNeighbors.length === 0,
          'wanderCon': true,
          'reproduceCon': typeHash[type]
        });

      } else if (type === 'typeThree') {
        // EXAMPLE: NON-PREDATOR SPECIES
        this.validNeighbors = getValidNeighbors([false, 'typeOne']);
        live({
          'dieCon': !typeHash['typeOne'],
          'stayCon': this.validNeighbors.length === 0,
          'wanderCon': true,
          'reproduceCon': typeHash[type]
        });
      }

    });

    Object.keys(changingCells).forEach(key => {
      cells[parseInt(key)].changeState(changingCells[key]);
    });
  }
}

export default Automata;
