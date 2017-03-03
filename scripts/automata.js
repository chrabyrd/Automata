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

      if (!cells[id].type) { return; }

      if (cells[id].type === 'cabbage') {

        // const alone = Object.values(typeHash).reduce(function(sum, num) {
        //   return sum + num;
        // }) === 0;
        const validNeighbors = cellNeighbors.filter(function(cell) {
          return (changingCells[cell - 1] === undefined
                  && !cells[cell - 1].type);
        });

        const grow = () => {
          if (validNeighbors.length > 0) {
            changingCells[this.random(validNeighbors)] = 'cabbage';
          }
        };

        const die = () => {
          changingCells[id] = false;
        };

        // Grow
        // if (typeHash['cabbage']) {
          grow();
        // }

      } else if (cells[id].type === 'rabbit') {

        const validNeighbors = cellNeighbors.filter(function(cell) {
          return (changingCells[cell - 1] === undefined
                  && cells[cell - 1].type !== 'rabbit');
        });

        const wander = () => {
          if (validNeighbors.length > 0) {
            changingCells[this.random(validNeighbors)] = 'rabbit';
            changingCells[id] = false;
          }
        };

        const reproduce = () => {
          if (validNeighbors.length > 0) {
            changingCells[this.random(validNeighbors)] = 'rabbit';
          }
        };

        const die = () => {
          changingCells[id] = false;
        };

        if (!typeHash['cabbage'] && !typeHash['fox']) {
          die();
        } else {
          wander();
          if (typeHash['rabbit'] && !typeHash['fox']) {
            reproduce();
          }
        }

      } else if (cells[id].type === 'fox') {

        const validNeighbors = cellNeighbors.filter(function(cell) {
          return (changingCells[cell - 1] === undefined
                  && cells[cell - 1].type !== 'fox');
        });

        const wander = () => {
          if (validNeighbors.length > 0) {
            changingCells[this.random(validNeighbors)] = 'fox';
            changingCells[id] = false;
          }
        };

        const reproduce = () => {
          if (validNeighbors.length > 0) {
            changingCells[this.random(validNeighbors)] = 'fox';
          }
        };

        const die = () => {
          changingCells[id] = false;
        };

        if (!typeHash['cabbage'] && !typeHash['rabbit']) {
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
