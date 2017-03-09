import Board from "./board";
import Automata from "./automata";

class Container {
  constructor (mainCanvas, mainCtx) {
    this.mainCanvas = mainCanvas;
    this.mainCtx = mainCtx;
    this.cellSize = 16;
    this.width = 200;
    this.height = 200;
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
    this.pauseEvent = false;
    this.cellType = 'typeOne';
    this.start = null;
    this.getGridSize();
    this.board = new Board(this.mainCtx, this.cellSize, this.width, this.height);
    this.automata = new Automata(this.board);
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
            'reproduceCon': `typeHash[type] && Math.floor(Math.random() * 4) === 0`
          },
          'neighborArray': [false, 'typeOne']
        },

        'typeThree': {
          'conditions': {
            'skipCon': `false`,
            'dieCon': `!typeHash['typeOne']`,
            'stayCon': `validNeighbors.length === 0`,
            'wanderCon': `true`,
            'reproduceCon': `typeHash[type] && Math.floor(Math.random() * 4) === 0`
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
    const valid = [];

    for (let i = 0; i <= 4000; i++) {
      let isValid = i % 16 === 0;
      if (isValid) valid.push(i);
    }
    this.width = this.closestValue(this.width, valid);
    this.height = this.closestValue(this.height, valid);
    this.mainCanvas.width = this.width;
    this.mainCanvas.height = this.height;
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
    e.preventDefault();
    this.board.toggleCell(e, this.cellType);
  }

  handlePlayEvent () {
    this.start = setInterval(() => {
      this.automata.cellLogic(this.conditionalHash());
    }, 50);
  }

  handlePauseEvent (e) {
    e.preventDefault();

    if (this.pauseEvent) {
      this.pauseEvent = false;
      this.handlePlayEvent();
    } else {
      this.pauseEvent = true;
      clearInterval(this.start);
    }
  }

  handleNextFrameEvent (e) {
    e.preventDefault();

    if (!this.pauseEvent) this.pauseEvent = true;
    this.automata.cellLogic(this.conditionalHash());
  }

  handleResetEvent () {
    clearInterval(this.start);
    this.board = new Board(this.mainCtx, 5, 800, 600);
    this.automata = new Automata(this.board);
  }
}

export default Container;
