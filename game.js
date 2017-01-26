import Board from "./board";
import Automata from "./automata";

class Game {
  constructor (ctx) {
    const board = new Board(ctx);
    const automata = new Automata(board);
    this.ctx = ctx;
    this.board = board;
    this.automata = automata;
    this.playButtonPushed = false;
    this.startGame;
    this.gameTimer;

    this.levelOne();
  }

  handlePlayEvent () {
    const singleMove = () => {
      this.gameWon();
      this.automata.neighborLogic();
    };

    this.playButtonPushed = true;
    this.startGame = setInterval(singleMove, 20);
  }

  handlePauseEvent () {
    clearInterval(this.startGame);
  }

  handleResetEvent () {
    this.resetCells();
    this.ctx.clearRect(0, 0, 600, 600);
    this.ctx.stroke();
    this.levelOne();
    clearTimeout(this.gameTimer);
  }

  handleClickEvent (e) {
    e.preventDefault();
    this.playButtonPushed ? this.board.toggleCell(e) : null;
  }

  resetCells () {
    for (let i = 0; i < this.board.cells.length; i++) {
      this.board.cells[i].state.alive = false;
    }
  }

  winCondition () {
    let gameWon = true;
    for (let i = 0; i < this.board.cells.length; i++) {
      if (this.board.cells[i].state.alive) gameWon = false;
    }
    return gameWon;
  }

  gameWon () {
    if (this.winCondition()) {
      this.handlePauseEvent();
      clearTimeout(this.gameTimer);
      this.playButtonPushed = false;
      alert("Win");
    }
  }

  endGame () {
    this.handlePauseEvent();
    this.playButtonPushed = false;
    alert("Loss");
  }

  play () {
    this.gameTimer = setTimeout(this.endGame.bind(this), 8000);
    this.handlePlayEvent();
  }

  levelOne () {
    const startingCells = [38, 48, 50, 59, 61, 71];

    for (let i = 0; i < startingCells.length; i++) {
      this.board.cells[startingCells[i]].changeState();
    }
  }
}

export default Game;
