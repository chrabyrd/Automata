import Board from "./board";
import Automata from "./automata";
import { levels } from "./levels";

class Game {
  constructor (mainCtx) {
    this.mainCtx = mainCtx;
    this.pauseEvent = false;
    this.board = new Board(this.mainCtx, 5, 800, 600);
    this.automata = new Automata(this.board);
    this.cellType = 'typeOne';
    this.startGame;

    this.handlePlayEvent();
    // this.levels = levels;
    // this.currentLevel = 0;
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
    }, 100);
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
