import Board from "./board";
import Automata from "./automata";

class Game {
  constructor (ctx) {
    const board = new Board(ctx);
    const automata = new Automata(board);
    this.board = board;
    this.automata = automata;
    this.play;
    this.gameTimer;

    this.levelOne();
  }

  handlePlayEvent () {
    const singleMove = () => {
      this.gameWon();
      this.automata.neighborLogic();
    };

    this.play = setInterval(singleMove, 20);
  }

  handlePauseEvent () {
    clearInterval(this.play);
  }

  handleClickEvent (e) {
    this.board.toggleCell(e);
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
      alert("Win");
    }
  }

  endGame () {
    this.handlePauseEvent();
    alert("Loss");
  }

  play () {
    this.gameTimer = setTimeout(this.endGame.bind(this), 8000);
    this.handlePlayEvent();
  }

  levelOne () {
    const startingCells = [53, 64, 76, 89, 78, 66];

    for (let i = 0; i < startingCells.length; i++) {
      this.board.cells[startingCells[i]].changeState();
    }
  }
}

export default Game;
