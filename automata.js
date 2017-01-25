class Automata {
  constructor (board) {
    this.board = board;
    this.play;
  }

  onPlay () {
    this.play = setInterval(() => this.neighborLogic(), 100);
  }

  onPause () {
    clearInterval(this.play);
  }

  redrawBoard () {
    // disappears static elements
    this.board.ctx.clearRect(0, 0, 600, 600);
    this.board.ctx.stroke();
  }

  neighborLogic () {
    for (let i=0; i < this.board.cells.length - 1; i++) {
      const currentCell = this.board.cells[i];
      const cellNeighbors = this.board.cells[i].state.neighbors;
      const aliveNeighbors = cellNeighbors.filter(cellId => {
        return this.board.cells[cellId].state.alive;
      });

      if (currentCell.state.alive) {

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
