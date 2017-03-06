import Board from "./board";
import Automata from "./automata";
import { levels } from "./levels";

class Game {
  constructor (mainCanvas, mainCtx) {
    this.mainCanvas = mainCanvas;
    this.mainCtx = mainCtx;
    this.cellSize = 16;
    this.width = window.outerWidth;
    this.height = window.outerHeight;
    this.pauseEvent = false;
    this.cellType = 'typeOne';
    this.startGame = null;
    this.getGridSize();
    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
    this.handlePlayEvent();
    // this.levels = levels;
    // this.currentLevel = 0;

  }

  closestValue (num, array) {
    return array.sort( (a, b) => Math.abs(num - a) - Math.abs(num - b) )[0];
  }

  getGridSize () {
    let min = this.height - 20;
    let max = this.width;

    if (this.width < this.height) {
      min = this.width - 20;
      max = this.height;
    }

    const valid = [];

    for (let i = min; i <= max; i++) {
      let isValid = [2, 4, 8, 16].every(num => (
        i % num === 0
      ));
      if (isValid) valid.push(i);
    }

    this.width = this.closestValue(this.width, valid);
    this.height = this.closestValue(this.height, valid);
    this.mainCanvas.width = this.width;
    this.mainCanvas.height = this.height;
  }

  handleClickEvent (e) {
    e.preventDefault();
    this.board.toggleCell(e, this.cellType);
  }

  toggleColor (e) {
    if (e.keyCode === 49) {
      this.cellType = 'typeOne';
    } else if (e.keyCode === 50) {
      this.cellType = 'typeTwo';
    } else if (e.keyCode === 51) {
      this.cellType = 'typeThree';
    }
  }

  handlePlayEvent () {
    this.startGame = setInterval(() => {
      this.automata.cellLogic();
    }, 50);
  }

  handlePauseEvent (e) {
    e.preventDefault();

    this.board = new Board(this.mainCtx, 2, this.width, this.height);
    this.automata = new Automata(this.board);
    this.handlePlayEvent();

    if (this.pauseEvent) {
      this.pauseEvent = false;
      this.handlePlayEvent();
    } else {
      this.pauseEvent = true;
      clearInterval(this.startGame);
    }
  }

  handleResetEvent () {
    clearInterval(this.startGame);
    this.board = new Board(this.mainCtx, 5, 800, 600);
    this.automata = new Automata(this.board);
  }
}

export default Game;
