class Automata {
  constructor (board) {
    this.board = board;
  }

  randomNeighbor(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  cellLogic () {
    const changingCells = [];

    for (let i = 0; i < this.board.cells.length; i++) {
      const currentCell = this.board.cells[i];
      const cellNeighbors = currentCell.neighbors;
      const aliveNeighbors = cellNeighbors.filter(cellId => {
        return this.board.cells[cellId - 1].alive;
      });

      let blue = 0;
      let green = 0;

      aliveNeighbors.forEach(num => {
        if (this.board.cells[num - 1].alive === 'blue') {
          blue++;
        } else {
          green++;
        }
      });

      let color = (blue > green) ? ["blue", [blue, green]] : ["green", [green, blue]];

      if (currentCell.alive) {
        if (blue === 0 && green === 0){
          // Solitary cell
          const randomNeighbor = cellNeighbors[Math.floor(
            Math.random() * cellNeighbors.length)];
          color = [currentCell.alive, [0, 0]];
          changingCells.push([randomNeighbor - 1, color[0]]);
          changingCells.push([i]);

        } else if (aliveNeighbors.length === 1) {
          // Meeting a partner
          let randomNeighbor = cellNeighbors[Math.floor(
            Math.random() * cellNeighbors.length)];

          if (color[0] === currentCell.alive) {
            console.log(randomNeighbor);

            randomNeighbor = cellNeighbors[Math.floor(
              Math.random() * cellNeighbors.length)];

            console.log(randomNeighbor);
          } else {
            changingCells.push([i]);
          }
        }
      }
    }

    for (let i = 0; i < changingCells.length; i++) {
      this.board.cells[changingCells[i][0]].changeState(changingCells[i][1]);
    }
  }
}

export default Automata;
