import Board from "./board";
import Automata from "./automata";

class Container {
  constructor (mainCanvas, mainCtx) {
    this.mainCanvas = mainCanvas;
    this.mainCtx = mainCtx;
    this.gridDimensions = [];
    this.validDrawspeeds = [];
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
    this.populateValidDrawspeeds();
    this.handlePlayEvent();
  }

  conditionalHash () {
    return (
      {
        'typeOne': {
          'conditions': {
            'skipCon': `validNeighbors.length === 0`,
            'dieCon': `false`,
            'stayCon': `false`,
            'wanderCon': `false`,
            // 'reproduceCon': `true`
            'reproduceCon': `!typeHash['typeTwo'] && !typeHash['typeThree']`
          },
          'neighborArray': [false]
        },

        'typeTwo': {
          'conditions': {
            'skipCon': `false`,
            'dieCon': `!typeHash['typeOne']`,
            'stayCon': `validNeighbors.length === 0`,
            'wanderCon': `true`,
            'reproduceCon': `typeHash[type] && Math.floor(Math.random() * 2) === 0`
          },
          'neighborArray': [false, 'typeOne']
        },

        'typeThree': {
          'conditions': {
            'skipCon': `false`,
            'dieCon': `!typeHash['typeOne']`,
            'stayCon': `validNeighbors.length === 0`,
            'wanderCon': `true`,
            'reproduceCon': `typeHash[type] && Math.floor(Math.random() * 2) === 0`
          },
          'neighborArray': [false, 'typeOne']
        },

        'false': {
          'conditions': {
            'skipCon': `true`,
            'dieCon': `false`,
            'stayCon': `false`,
            'wanderCon': `false`,
            'reproduceCon': `false`
          },
          'neighborArray': [false]
        }
      }
    );
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

  populateValidDrawspeeds () {
    for (let i = 1; i <= 100; i++) {
      this.validDrawspeeds.push((1000 / i).toFixed(2));
    }
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

  handleClickEvent (e) {
    this.board.toggleCell(e, this.cellType);
  }

  handlePlayEvent () {
    this.start = setInterval(() => {
      this.automata.cellLogic(this.conditionalHash());
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
    this.automata.cellLogic(this.conditionalHash());
  }

  incrementSpeed (str) {
    this.handlePauseEvent();
    str === '+' ? this.drawspeed-- : this.drawspeed++;
    this.handlePauseEvent();
  }

  handleSpeedChangeEvent (speed) {
    speed = 1000 / speed;
    this.handlePauseEvent();
    this.drawspeed = speed;
    this.handlePauseEvent();
  }

  handleCellResizeEvent (size) {
    this.handlePauseEvent();
    this.cellSize = size;
    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
    this.handlePauseEvent();
  }

  handleResizeEvent (dimension, size) {
    this.handlePauseEvent();

    if (dimension === 'width') {
      this.width = size;
      this.mainCanvas.width = size;
    } else if (dimension === 'height') {
      this.height = size;
      this.mainCanvas.height = size;
    }

    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
    this.handlePauseEvent();
  }

  handleResetEvent () {
    this.handlePauseEvent();
    clearInterval(this.start);
    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
    this.handlePauseEvent();
  }
}

export default Container;
