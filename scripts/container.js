import Board from "./board";
import Automata from "./automata";

class Container {
  constructor (mainCanvas, mainCtx) {
    this.mainCanvas = mainCanvas;
    this.mainCtx = mainCtx;
    this.cellSize = 16;
    this.width = window.outerWidth;
    this.height = window.outerHeight;
    this.pauseEvent = false;
    this.cellType = 'typeOne';
    this.start = null;
    this.getGridSize();
    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
    this.handlePlayEvent(this.conditionalHash());
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
            'reproduceCon': `typeHash[type]`
          },
          'neighborArray': [false, 'typeOne']
        },

        'typeThree': {
          'conditions': {
            'skipCon': `false`,
            'dieCon': `!typeHash['typeOne']`,
            'stayCon': `validNeighbors.length === 0`,
            'wanderCon': `true`,
            'reproduceCon': `typeHash[type]`
          },
          'neighborArray': [false, 'typeOne']
        }
      }
    );
  }

  closestValue (num, array) {
    return array.sort( (a, b) => Math.abs(num - a) - Math.abs(num - b) )[0];
  }

  getGridSize () {
    const valid = [];

    for (let i = 0; i <= 4000; i++) {
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

  handlePlayEvent (conditionalHash) {
    this.start = setInterval(() => {
      this.automata.cellLogic(conditionalHash);
    }, 50);
  }

  handlePauseEvent (e) {
    e.preventDefault();

    // this.board = new Board(this.mainCtx, 8, this.width, this.height);
    // this.automata = new Automata(this.board);
    // this.handlePlayEvent();

    if (this.pauseEvent) {
      this.pauseEvent = false;
      this.handlePlayEvent(this.conditionalHash());
    } else {
      this.pauseEvent = true;
      clearInterval(this.start);
    }
  }

  handleResetEvent () {
    clearInterval(this.start);
    this.board = new Board(this.mainCtx, 5, 800, 600);
    this.automata = new Automata(this.board);
  }
}

export default Container;
