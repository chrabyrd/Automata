class Automata {
  constructor (board) {
    this.board = board;
  }

  cellLogic () {
    const changingCells = [];

    for (let i = 0; i < this.board.cells.length; i++) {
      const currentCell = this.board.cells[i];
      const cellNeighbors = this.board.cells[i].neighbors;
      const aliveNeighbors = cellNeighbors.filter(cellId => {
        return this.board.cells[cellId - 1].alive;
      });

      if (currentCell.alive) {

        if (aliveNeighbors.length < 2) {
          changingCells.push(i);
        } else if (aliveNeighbors.length > 3) {
          changingCells.push(i);
        }

      } else {

        if (aliveNeighbors.length === 3) {
          changingCells.push(i);
        }

      }
    }

    for (let i = 0; i < changingCells.length; i++) {
      this.board.cells[changingCells[i]].changeState();
    }
  }
}

export default Automata;
