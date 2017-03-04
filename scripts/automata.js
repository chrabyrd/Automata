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
    const changeRecord = {};
    const cells = this.board.cells;
    const shuffledCells = this.shuffle(this.board.cells.map(cell => cell.id - 1));

    shuffledCells.forEach(id => {
      const cellNeighbors = cells[id].neighbors;
      const typeHash = { "cabbage": 0, "rabbit": 0, "fox": 0 };

      cellNeighbors.forEach(num => {
        if (cells[num - 1].type === 'rabbit') {
          typeHash["rabbit"]++;
        } else if (cells[num - 1].type === 'cabbage'){
          typeHash["cabbage"]++;
        } else if (cells[num - 1].type === 'fox'){
          typeHash["fox"]++;
        }
      });

      if (!cells[id].type) return;

      if (cells[id].type === 'cabbage') {

        const validNeighbors = cellNeighbors.filter(function(cell) {
          cell = cell - 1;
          return !changingCells[cell] && !cells[cell].type;
        });

        const grow = () => {
          if (validNeighbors.length > 0) {
            const nextCell = this.random(validNeighbors);
            changeRecord[id] = nextCell;
            changingCells[nextCell] = 'cabbage';
          }
        };

        grow();

      } else if (cells[id].type === 'rabbit') {

        const validNeighbors = cellNeighbors.filter(function(cell) {
          cell = cell - 1;
          return !changingCells[cell]
                  && (cells[cell].type === 'cabbage'
                    || !cells[cell].type);
        });

        const wander = () => {
          if (validNeighbors.length === 0) return;
          const nextCell = this.random(validNeighbors);
          changeRecord[id] = nextCell;
          changingCells[nextCell] = 'rabbit';
          changingCells[id] = false;
        };

        const reproduce = () => {
          if (validNeighbors.length === 0) return;
          const nextCell = this.random(validNeighbors);
          changeRecord[id] = nextCell;
          changingCells[nextCell] = 'rabbit';
        };

        const die = () => {
          changingCells[id] = false;
        };

        // const hunt = () => {
        //
        //   const prey = cellNeighbors.filter(function(num) {
        //     return cells[num - 1].type === 'cabbage';
        //   });
        //
        //   if (prey.length > 0) {
        //     const preyCell = this.random(prey);
        //
        //     if (changeRecord[preyCell]) {
        //       changingCells[changeRecord[preyCell]] = 'rabbit';
        //       changeRecord[id] = changeRecord[preyCell];
        //     } else {
        //       changingCells[preyCell] = 'rabbit';
        //       changeRecord[id] = preyCell;
        //     }
        //
        //     changingCells[id] = false;
        //
        //   } else {
        //     wander();
        //   }
        // };

        if (!typeHash['cabbage']) {
          die();
        } else {
          wander();
          if (!typeHash['fox'] && typeHash['rabbit']) {
            reproduce();
          }
        }

      } else if (cells[id].type === 'fox') {

        const validNeighbors = cellNeighbors.filter(function(cell) {
          cell = cell - 1;
          return !changingCells[cell]
                  && (cells[cell].type === 'cabbage'
                    || !cells[cell].type);
        });

        const wander = () => {
          if (validNeighbors.length === 0) return;
          const nextCell = this.random(validNeighbors);
          changeRecord[id] = nextCell;
          changingCells[nextCell] = 'fox';
          changingCells[id] = false;
        };

        const reproduce = () => {
          if (validNeighbors.length === 0) return;
          const nextCell = this.random(validNeighbors);
          changeRecord[id] = nextCell;
          changingCells[nextCell] = 'fox';
        };

        const die = () => {
          changingCells[id] = false;
        };

        // const hunt = () => {
        //
        //   const prey = cellNeighbors.filter(function(num) {
        //     return cells[num - 1].type === 'rabbit';
        //   });
        //
        //   if (prey.length > 0) {
        //     const preyCell = this.random(prey);
        //
        //     if (changeRecord[preyCell]) {
        //       changingCells[changeRecord[preyCell]] = 'fox';
        //       changeRecord[id] = changeRecord[preyCell];
        //     } else {
        //       changingCells[preyCell] = 'fox';
        //       changeRecord[id] = preyCell;
        //     }
        //
        //     changingCells[id] = false;
        //
        //   } else {
        //     wander();
        //   }
        // };


        if (!typeHash['cabbage']) {
          die();
        } else {
          wander();
          if (typeHash['fox'] && !typeHash['rabbit']) {
            reproduce();
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
