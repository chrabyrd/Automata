import Board from "./board";
import Automata from "./automata";

class Game {
  constructor (ctx) {
    this.ctx = ctx;
    this.playEvent = false;
    this.board;
    this.automata;
    this.startGame;
  }

  handleClickEvent (e) {
    e.preventDefault();
    if (this.playEvent) {
      this.board.toggleCell(e);
    } else {
      this.handlePlayEvent();
    }
  }

  handlePlayEvent () {
    this.playEvent = true;
    this.board = new Board(this.ctx);
    this.automata = new Automata(this.board);

    const singleMove = () => {
      this.gameWon();
      this.automata.cellLogic();
    };

    this.levelOne();
    this.startGame = setInterval(singleMove, 350);
  }

  handleResetEvent () {
    this.playEvent = false;
    this.resetCells();
    this.ctx.clearRect(0, 0, 550, 550);
  }

  resetCells () {
    clearInterval(this.startGame);
    for (let i = 0; i < this.board.cells.length; i++) {
      this.board.cells[i].alive = false;
    }
  }

  gameWon () {
    if (this.board.cells.every(cell => !cell.alive)) {
      clearInterval(this.startGame);
      this.playEvent = false;
      this.ctx.clearRect(0, 0, 550, 550);
      this.ctx.fillStyle = "darkgrey";
      this.ctx.font = "50px Arial ghostwhite";
      this.ctx.fillText("You Win!", 190, 260);
    }
  }

  levelOne () {
    // const startingCells = [38, 48, 50, 59, 61, 71];
    const startingCells = [38, 48, 50, 60];

    for (let i = 0; i < startingCells.length; i++) {
      this.board.cells[startingCells[i]].changeState();
    }
  }
}

export default Game;
