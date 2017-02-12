import Board from "./board";
import Automata from "./automata";

class Game {
  constructor (mainCtx, clickCtx) {
    this.mainCtx = mainCtx;
    this.clickCtx = clickCtx;
    this.playEvent = false;
    this.pauseEvent = false;
    this.gameWon = false;
    this.clickCount = 0;
    this.board = new Board(this.mainCtx);
    this.automata = new Automata(this.board);
    this.startGame;
  }

  handleClickEvent (e) {
    e.preventDefault();
    if (this.playEvent) {
      this.board.toggleCell(e);
      this.clickCount--;
      this.clickCounter();
    } else {
      this.handlePlayEvent();
    }
  }

  handlePlayEvent () {
    this.handleResetEvent();
    this.playEvent = true;
    this.levelOne();
    this.clickCounter();

    this.startGame = setInterval(() => {
      this.automata.cellLogic();
      this.winCondition();
    }, 350);
  }

  handlePauseEvent () {
    if (this.pauseEvent && this.playEvent) {
      this.pauseEvent = false;

      this.startGame = setInterval(() => {
        this.automata.cellLogic();
        this.winCondition();
      }, 350);

    } else if (this.playEvent) {
      this.pauseEvent = true;
      clearInterval(this.startGame);
    }
  }

  handleResetEvent () {
    this.gameWon = false;
    this.playEvent = false;
    clearInterval(this.startGame);
    this.board = new Board(this.mainCtx);
    this.automata = new Automata(this.board);
    this.clickCtx.clearRect(0, 0, 550, 550);
  }

  clickCounter () {
    this.clickCtx.fillStyle = "black";
    this.clickCtx.font = "12pt sans-serif";
    this.clickCtx.clearRect(0, 0, 550, 550);
    this.clickCtx.fillText(`Clicks left: ${this.clickCount}`, 440, 15);
  }

  winCondition () {
    if (this.clickCount <= -1) {
      clearInterval(this.startGame);
      this.playEvent = false;
      this.mainCtx.clearRect(0, 0, 550, 550);
      this.mainCtx.fillStyle = "black";
      this.mainCtx.font = "50pt sans-serif";
      this.mainCtx.fillText("You Lose!", 190, 260);
      this.clickCtx.clearRect(0, 0, 550, 550);
    } else if (this.board.cells.every(cell => !cell.alive)) {
      clearInterval(this.startGame);
      this.playEvent = false;
      this.mainCtx.clearRect(0, 0, 550, 550);
      this.mainCtx.fillStyle = "black";
      this.mainCtx.font = "50pt sans-serif";
      this.mainCtx.fillText("You Win!", 190, 260);
      this.clickCtx.clearRect(0, 0, 550, 550);
    }
  }

  levelOne () {
    const startingCells = [71, 49, 59, 61];

    this.clickCount = 3;

    for (let i = 0; i < startingCells.length; i++) {
      this.board.cells[startingCells[i]].changeState();
    }
  }

  levelTwo () {
    const startingCells = [38, 48, 50, 59, 61, 71];

    this.clickCount = 3;

    for (let i = 0; i < startingCells.length; i++) {
      this.board.cells[startingCells[i]].changeState();
    }
  }
}

export default Game;
