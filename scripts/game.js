import Board from "./board";
import Automata from "./automata";

class Game {
  constructor (ctx) {
    this.ctx = ctx;
    this.rulesEvent = false;
    this.playEvent = false;
    this.board;
    this.automata;
    this.startGame;

    this.opener();
  }

  opener () {
    const openingStatement = "Once you click play,";
    const openingStatementTwo=  "you'll have 10 seconds";
    const openingStatementThree = "to clear the board.";
    const openingStatementFour = "Click black squares";
    const openingStatementFive = "to bring them to life.";
    const openingStatementSix = "Good Luck!";

    this.ctx.fillStyle = "darkgrey";
    this.ctx.font = "50px Arial ghostwhite";
    this.ctx.fillText(openingStatement, 50, 80);
    this.ctx.fillText(openingStatementTwo, 40, 140);
    this.ctx.fillText(openingStatementThree, 80, 200);
    this.ctx.fillText(openingStatementFour, 80, 320);
    this.ctx.fillText(openingStatementFive, 80, 380);
    this.ctx.fillText(openingStatementSix, 140, 490);
  }

  handleClickEvent (e) {
    e.preventDefault();
    if (this.rulesEvent) {
      // this.handleRulesEvent();
    } else if (this.playEvent) {
      this.board.toggleCell(e);
    } else {
      this.handlePlayEvent();
    }
  }

  handlePlayEvent () {
    this.playEvent = true;
    this.board = new Board(this.ctx);
    this.automata = new Automata(this.board);

    const singleMove = () => {
      this.gameWon();
      this.automata.neighborLogic();
    };

    this.levelOne();
    this.startGame = setInterval(singleMove, 300);
  }

  handleResetEvent () {
    this.playEvent = false;
    this.resetCells();
    this.ctx.clearRect(0, 0, 550, 550);
    this.ctx.stroke();
    this.opener();
  }

  handleRulesEvent () {

  }

  resetCells () {
    for (let i = 0; i < this.board.cells.length; i++) {
      this.board.cells[i].alive = false;
    }
  }

  winCondition () {
    let gameWon = true;

    for (let i = 0; i < this.board.cells.length; i++) {
      if (this.board.cells[i].alive) gameWon = false;
    }

    return gameWon;
  }

  gameWon () {
    if (this.winCondition()) {
      this.playEvent = false;
      this.ctx.fillStyle = "darkgrey";
      this.ctx.font = "50px Arial ghostwhite";
      this.ctx.fillText("You Win!", 190, 260);
    }
  }

  endGame () {
    this.playEvent = false;
    this.ctx.clearRect(0, 0, 550, 550);
    this.ctx.fillStyle = "darkgrey";
    this.ctx.font = "50px Arial ghostwhite";
    this.ctx.fillText("You Lose!", 180, 270);
  }

  levelOne () {
    // const startingCells = [38, 48, 50, 59, 61, 71];
    const startingCells = [38, 48, 50, 60];

    for (let i = 0; i < startingCells.length; i++) {
      this.board.cells[startingCells[i]].changeState();
    }
  }
}

export default Game;
