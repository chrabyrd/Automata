class Automata {
  constructor (board) {
    this.board = board;
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)] - 1;
  }

  cellLogic () {
    const changingCells = {};
    const cells = this.board.cells;

    for (let i = 0; i < this.board.cells.length; i++) {
      const cellNeighbors = cells[i].neighbors;
      const typeHash = { "cabbage": 0, "rabbit": 0, "fox": 0 };
      let type;

      cellNeighbors.forEach(num => {
        if (cells[num - 1].type === 'rabbit') {
          typeHash["rabbit"]++;
        } else if (cells[num - 1].type === 'cabbage'){
          typeHash["cabbage"]++;
        } else if (cells[num - 1].type === 'fox'){
          typeHash["fox"]++;
        }
      });

      // sets `type` to most common neighbor
      const largestValue = Math.max(...Object.values(typeHash));

      Object.keys(typeHash).forEach(key => {
        if (typeHash[`${key}`] === largestValue) type = key;
      });

      const neighborCount = Object.values(typeHash).reduce(function(sum, num) {
        return sum + num;
      });

      if (cells[i].type) {

        if (cells[i].type === 'cabbage') {
          // Grow
          const validNeighbors = cellNeighbors.filter(function(cell) {
            return (changingCells[cell - 1] === undefined && (!cells[cell - 1].type));
          });

          if (validNeighbors.length > 0) {
            changingCells[this.random(validNeighbors)] = 'cabbage';
          }

        } else if (cells[i].type === 'rabbit') {
          // Wander
          const validNeighbors = cellNeighbors.filter(function(cell) {
            return (changingCells[cell - 1] === undefined && (!cells[cell - 1].type || cells[cell - 1].type === 'cabbage'));
          });

          if (validNeighbors.length > 0) {
            changingCells[this.random(validNeighbors)] = 'rabbit';
            changingCells[i] = false;
          }

        } else if (cells[i].type === 'fox') {
        }

        // if (neighborCount === 0) {
        //
        //   if (cells[i].type === 'rabbit' || cells[i].type === 'fox') {
        //     changingCells.push([this.random(cellNeighbors), cells[i].type]);
        //     changingCells.push([i]);
        //   } else if (cells[i].type === 'cabbage') {
        //     if (Math.floor(Math.random() * 32) === 31) {
        //       changingCells.push([this.random(cellNeighbors), cells[i].type]);
        //     }
        //   }
        //
        // } else if (neighborCount === 1) {
        //
        //   if (cells[i].type === 'cabbage') {
        //     if (type === 'cabbage') {
        //       if (Math.floor(Math.random() * 8) === 7) {
        //         changingCells.push([this.random(cellNeighbors), cells[i].type]);
        //       }
        //     } else if (type === 'rabbit') {
        //       changingCells.push([i]);
        //     }
        //   } else if (cells[i].type === 'rabbit') {
        //     if (type === 'fox') {
        //       changingCells.push([i]);
        //     } else if (type === 'rabbit') {
        //       if (Math.floor(Math.random() * 8) === 7) {
        //         changingCells.push([this.random(cellNeighbors), type]);
        //       }
        //     }
        //     changingCells.push([this.random(cellNeighbors), cells[i].type]);
        //     changingCells.push([i]);
        //   } else if (cells[i].type === 'fox') {
        //     changingCells.push([this.random(cellNeighbors), cells[i].type]);
        //     changingCells.push([i]);
        //   }
        //
        // } else {
        //
        // if (cells[i].type === 'cabbage') {
        // } else if (cells[i].type === 'rabbit') {
        // } else if (cells[i].type === 'fox') {
        // }
        //
        // }
        // else if (typeHash["false"] === 7) {
        //   // Meeting a partner
        //   if (type === cells[i].type) {
        //     changingCells.push([this.random(cellNeighbors), type]);
        //     changingCells.push([i]);
        //   }
        //   changingCells.push([i]);
        // } else {
        //   if (type[1][1] !== 0) {
        //     changingCells.push([i, type[0]]);
        //   }
        // }
      } else {
        // if (neighborCount === 2 && type === 'rabbit') {
        //   if (Math.floor(Math.random() * 8) === 7) {
        //     changingCells.push([i, type]);
        //   }
        // }
      }
    }

    Object.keys(changingCells).forEach(key => {
      cells[key].changeState(changingCells[key]);
    });
  }
}

export default Automata;
