class Automata {
  constructor (board) {
    this.board = board;
    this.cellsClone = JSON.parse(JSON.stringify(this.board.cells));
    // console.log(this.board.cells);
    // console.log(JSON.stringify(this.board.cells));
    // console.log(this.cellsClone);
  }

  neighborLogic () {
    for (let i=0; i < this.board.cells.length; i++) {
      const currentCell = this.board.cells[i];
      const cellNeighbors = this.board.cells[i].neighbors;
      const aliveNeighbors = cellNeighbors.filter(cellId => {
        return this.board.cells[cellId].alive;
      });

      if (currentCell.alive) {

        if (aliveNeighbors.length < 2) {
          currentCell.changeState();
        } else if (aliveNeighbors.length > 3) {
          currentCell.changeState();
        }

      } else {

        if (aliveNeighbors.length === 3) {
          currentCell.changeState();
        }

      }
    }
  }
}

export default Automata;
