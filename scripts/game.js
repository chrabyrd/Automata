import Board from "./board";
import Automata from "./automata";
import { levels } from "./levels";

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
    this.levels = levels;
    this.currentLevel = 0;
    this.startGame;

    this.type = 'typeOne';

  }

  handleClickEvent (e) {
    e.preventDefault();
    if (this.playEvent) {
      this.board.toggleCell(e, this.type);
      this.clickCount--;
      this.clickCounter();
    } else {
      this.handlePlayEvent();
    }
  }

  toggleColor (e) {
    if (e.keyCode === 49) {
      this.type = 'typeOne';
    } else if (e.keyCode === 50) {
      this.type = 'typeTwo';
    } else if (e.keyCode === 51) {
      this.type = 'typeThree';
    }
  }

  handlePlayEvent () {
    this.handleResetEvent();
    this.playEvent = true;
    // const currentLevel = this.levels[this.currentLevel];
    // const startingCells = currentLevel.startingCells;
    // this.clickCount = currentLevel.clickCount;
    // this.clickCounter();
    //
    // for (let i = 0; i < startingCells.length; i++) {
    //   this.board.cells[startingCells[i]].changeState();
    // }

    this.startGame = setInterval(() => {
      this.automata.cellLogic();
      // this.winCondition();
    }, 100);
  }

  handlePauseEvent (e) {
    e.preventDefault();
    if (this.pauseEvent && this.playEvent) {
      this.pauseEvent = false;

      this.startGame = setInterval(() => {
        this.automata.cellLogic();
        // this.winCondition();
      }, 100);

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

  levelMessage () {
    this.mainCtx.clearRect(0, 0, 550, 550);
    this.mainCtx.fillStyle = "black";
    this.mainCtx.font = "50pt sans-serif";
    this.mainCtx.fillText(`Level ${this.currentLevel + 1}`, 170, 290);
    this.clickCtx.clearRect(0, 0, 550, 550);
  }

  winMessage () {
    this.mainCtx.clearRect(0, 0, 550, 550);
    this.mainCtx.fillStyle = "black";
    this.mainCtx.font = "50pt sans-serif";
    this.mainCtx.fillText("You Win!", 140, 290);
    this.mainCtx.font = "30pt sans-serif";
    this.mainCtx.fillText("(only 3 levels so far)", 100, 360);
    this.clickCtx.clearRect(0, 0, 550, 550);
  }

  loseMessage () {
    this.mainCtx.clearRect(0, 0, 550, 550);
    this.mainCtx.fillStyle = "black";
    this.mainCtx.font = "50pt sans-serif";
    this.mainCtx.fillText("Fail!", 210, 290);
    this.mainCtx.font = "30pt sans-serif";
    this.mainCtx.fillText("(click to play again)", 100, 360);
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
      this.loseMessage();
    } else if (this.board.cells.every(cell => !cell.alive)) {
      clearInterval(this.startGame);
      this.playEvent = false;

      if (this.currentLevel >=2 ) {
        this.currentLevel = 0;
        this.winMessage();
      } else {
        this.currentLevel++;
        this.levelMessage();
        this.clickCtx.clearRect(0, 0, 550, 550);
      }

    }
  }
}

export default Game;
