import Board from "./board";
import Automata from "./automata";

class Container {
  constructor (mainCanvas, mainCtx, conditionalHash) {
    this.mainCanvas = mainCanvas;
    this.mainCtx = mainCtx;
    this.conditionalHash = conditionalHash;
    this.gridDimensions = [];
    this.cellSizes = [1, 2, 4, 8, 16, 32];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.drawspeed = 50;
    this.cellSize = 16;
    this.pauseEvent = false;
    this.cellType = 'typeOne';
    this.start = null;
    this.getGridSize();
    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
    this.handlePlayEvent();
  }

  closestValue (num, array) {
    const sortedArray = array.sort((a, b) => (
      Math.abs(num - a) - Math.abs(num - b)
    ));

    return sortedArray.filter(function(val) {
      return val >= num;
    })[0];
  }

  getGridSize () {
    const gridDimensions = [];

    for (let i = 200; i <= 4000; i++) {
      if (i % 32 === 0) gridDimensions.push(i);
    }

    this.width = this.closestValue(this.width, gridDimensions);
    this.height = this.closestValue(this.height, gridDimensions);
    this.mainCanvas.width = this.width;
    this.mainCanvas.height = this.height;
    this.gridDimensions = gridDimensions;
  }

  handleClickEvent (e) {
    const color = this.conditionalHash[this.cellType].color;
    this.board.toggleCell(e, this.cellType, color);
  }

  handlePlayEvent () {
    this.start = setInterval(() => {
      this.automata.cellLogic(this.conditionalHash);
    }, this.drawspeed);
  }

  handlePauseEvent () {
    if (this.pauseEvent) {
      this.pauseEvent = false;
      this.handlePlayEvent();
    } else {
      this.pauseEvent = true;
      clearInterval(this.start);
    }
  }

  handleNextFrameEvent () {
    if (!this.pauseEvent) this.handlePauseEvent();
    this.automata.cellLogic(this.conditionalHash);
  }

  handleResetEvent () {
    this.handlePauseEvent();
    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
    this.handlePauseEvent();
  }

  handleSpeedChangeEvent (speed) {
    this.handlePauseEvent();
    this.drawspeed = speed;
    this.handlePauseEvent();
  }

  handleCellResizeEvent (size) {
    this.cellSize = parseInt(size);
    this.handleResetEvent();
  }

  handleResizeEvent (dimension, size) {
    if (dimension === 'width') {
      this.width = size;
      this.mainCanvas.width = size;
    } else if (dimension === 'height') {
      this.height = size;
      this.mainCanvas.height = size;
    }

    this.handleResetEvent();
  }
}

export default Container;
