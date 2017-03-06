import Board from "./board";
import Automata from "./automata";
import { levels } from "./levels";

class Game {
  constructor (mainCanvas, mainCtx) {
    this.mainCanvas = mainCanvas;
    this.mainCtx = mainCtx;
    this.validCellSizes = [];
    this.cellSize = 6;
    this.width = window.outerWidth % 2 === 0 ? window.outerWidth : window.outerWidth - 1;
    this.height = window.outerHeight % 2 === 0 ? window.outerHeight : window.outerHeight - 1;
    this.getGridSize();
    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
    this.pauseEvent = false;
    this.cellType = 'typeOne';
    this.startGame = null;
    this.handlePlayEvent();
    // this.levels = levels;
    // this.currentLevel = 0;
  }

  getCellSizes () {
    const temp = [];

    for (let i = 0; i < Math.sqrt(this.width); i++) {
      if (this.width % i === 0) temp.push(i);
    }

    for (let i = 0; i < Math.sqrt(this.height); i++) {
      if (this.height % i === 0) temp.push(i);
    }

    for (let i = 0; i < temp.length; i++) {
      let num = temp.shift();
      if (temp.includes(num)) this.validCellSizes.push(num);
    }
  }

  getGridSize () {
    while (this.validCellSizes.length !== 8) {
      this.validCellSizes = [];
      Math.floor(Math.random() * 2) === 1 ? this.width++ : this.width--;
      Math.floor(Math.random() * 2) === 1 ? this.height++ : this.height--;
      this.getCellSizes();
      this.mainCanvas.width = this.width;
      this.mainCanvas.height = this.height;
    }
    console.log(this.validCellSizes);
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
