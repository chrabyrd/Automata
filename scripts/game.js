import Board from "./board";
import Automata from "./automata";

class Game {
  constructor (ctx, timerctx) {
    this.ctx = ctx;
    this.timerctx = timerctx;
    this.playButtonPushed = false;
    this.board;
    this.automata;
    this.startGame;
    this.playTimer;
    this.gameTimer;

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

  timer () {
    let timeLeft = 10;
    this.timerctx.font = "20px Arial ghostwhite";
    this.timerctx.textAlign= "center";

    this.playTimer = setInterval(() => {
      this.timerctx.clearRect(0, 0, 50, 50);
      this.timerctx.fillText(timeLeft, 25, 20);
      timeLeft--;
      if (timeLeft <= 0) { clearInterval(this.playTimer); }
    }, 900);
  }

  handlePlayEvent () {
    if (this.playButtonPushed) return;
    delete this.board;
    this.playButtonPushed = false;
    this.board = new Board(this.ctx);
    this.automata = new Automata(this.board);

    const singleMove = () => {
      this.gameWon();
      this.automata.neighborLogic();
    };

    this.playButtonPushed = true;
    this.gameTimer = setTimeout(this.endGame.bind(this), 10000);
    this.timer();
    this.board.populateGrid();
    this.levelOne();
    this.startGame = setInterval(singleMove, 50);
  }

  handlePauseEvent () {
    clearInterval(this.startGame);
  }

  handleResetEvent () {
    this.playButtonPushed = false;
    this.timerctx.clearRect(0, 0, 50, 50);
    this.playButtonPushed = false;
    clearInterval(this.startGame);
    clearInterval(this.playTimer);
    clearTimeout(this.gameTimer);
    this.resetCells();
    this.ctx.clearRect(0, 0, 550, 550);
    this.ctx.stroke();
    this.opener();
  }

  handleClickEvent (e) {
    e.preventDefault();
    if (this.playButtonPushed) this.board.toggleCell(e);
  }

  handleRulesEvent () {

    setTimeout(() => {
      this.ctx.fillStyle = "darkgrey";
      this.ctx.font = "50px Arial ghostwhite";
      this.ctx.clearRect(0, 0, 550, 550);
      this.ctx.fillText("Rule One:", 50, 140);
      this.ctx.fillText("Any live cell with", 50, 260);
      this.ctx.fillText("fewer than two", 50, 320);
      this.ctx.fillText("live neighbours dies.", 50, 380);
    }, 1);

    setTimeout(() => {
      this.ctx.fillStyle = "darkgrey";
      this.ctx.font = "50px Arial ghostwhite";
      this.ctx.clearRect(0, 0, 550, 550);
      this.ctx.fillText("Rule Two:", 50, 140);
      this.ctx.fillText("Any live cell with", 50, 260);
      this.ctx.fillText("two or three live", 50, 320);
      this.ctx.fillText("live neighbours lives.", 50, 380);
    }, 2500);

    setTimeout(() => {
      this.ctx.fillStyle = "darkgrey";
      this.ctx.font = "50px Arial ghostwhite";
      this.ctx.clearRect(0, 0, 550, 550);
      this.ctx.fillText("Rule Three:", 50, 140);
      this.ctx.fillText("Any live cell with", 50, 260);
      this.ctx.fillText("more than three", 50, 320);
      this.ctx.fillText("live neighbours dies.", 50, 380);
    }, 5000);

    setTimeout(() => {
      this.ctx.fillStyle = "darkgrey";
      this.ctx.font = "50px Arial ghostwhite";
      this.ctx.clearRect(0, 0, 550, 550);
      this.ctx.fillText("Rule Four:", 50, 140);
      this.ctx.fillText("Any dead cell with", 50, 260);
      this.ctx.fillText("exactly three live", 50, 320);
      this.ctx.fillText("neighbours comes to", 50, 380);
      this.ctx.fillText("life.", 50, 440);
    }, 7500);

    setTimeout(() => {
      this.ctx.clearRect(0, 0, 550, 550);
      this.opener();
    }, 10000);
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
      this.playButtonPushed = false;
      this.handlePauseEvent();
      clearInterval(this.playTimer);
      clearTimeout(this.gameTimer);
      this.timerctx.clearRect(0, 0, 50, 50);
      this.ctx.fillStyle = "darkgrey";
      this.ctx.font = "50px Arial ghostwhite";
      this.ctx.fillText("You Win!", 190, 260);
    }
  }

  endGame () {
    this.playButtonPushed = false;
    this.handlePauseEvent();
    this.timerctx.clearRect(0, 0, 50, 50);
    this.ctx.clearRect(0, 0, 550, 550);
    this.ctx.fillStyle = "darkgrey";
    this.ctx.font = "50px Arial ghostwhite";
    this.ctx.fillText("You Lose!", 180, 270);
  }

  levelOne () {
    const startingCells = [38, 48, 50, 59, 61, 71];

    for (let i = 0; i < startingCells.length; i++) {
      this.board.cells[startingCells[i]].changeState();
    }
  }
}

export default Game;
