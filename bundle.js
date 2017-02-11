/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _game = __webpack_require__(1);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("canvas");
	  var ctx = canvas.getContext("2d");
	  var resetButton = document.getElementById("resetButton");
	  var rulesButton = document.getElementById("rulesButton");
	  var rulesModal = document.getElementById("rulesModal");

	  var game = new _game2.default(ctx);

	  canvas.addEventListener('click', function (e) {
	    return game.handleClickEvent(e);
	  }, false);
	  resetButton.addEventListener('click', function () {
	    return game.handleResetEvent();
	  }, false);
	  rulesButton.addEventListener('click', function () {
	    rulesModal.style.display = "block";
	  });

	  window.onclick = function (event) {
	    if (event.target === rulesModal) {
	      rulesModal.style.display = "none";
	    }
	  };
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _board = __webpack_require__(2);

	var _board2 = _interopRequireDefault(_board);

	var _automata = __webpack_require__(4);

	var _automata2 = _interopRequireDefault(_automata);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(ctx) {
	    _classCallCheck(this, Game);

	    this.ctx = ctx;
	    this.rulesEvent = false;
	    this.playEvent = false;
	    this.board;
	    this.automata;
	    this.startGame;

	    this.opener();
	  }

	  _createClass(Game, [{
	    key: "opener",
	    value: function opener() {
	      var openingStatement = "Once you click play,";
	      var openingStatementTwo = "you'll have 10 seconds";
	      var openingStatementThree = "to clear the board.";
	      var openingStatementFour = "Click black squares";
	      var openingStatementFive = "to bring them to life.";
	      var openingStatementSix = "Good Luck!";

	      this.ctx.fillStyle = "darkgrey";
	      this.ctx.font = "50px Arial ghostwhite";
	      this.ctx.fillText(openingStatement, 50, 80);
	      this.ctx.fillText(openingStatementTwo, 40, 140);
	      this.ctx.fillText(openingStatementThree, 80, 200);
	      this.ctx.fillText(openingStatementFour, 80, 320);
	      this.ctx.fillText(openingStatementFive, 80, 380);
	      this.ctx.fillText(openingStatementSix, 140, 490);
	    }
	  }, {
	    key: "handleClickEvent",
	    value: function handleClickEvent(e) {
	      e.preventDefault();
	      if (this.rulesEvent) {
	        // this.handleRulesEvent();
	      } else if (this.playEvent) {
	        this.board.toggleCell(e);
	      } else {
	        this.handlePlayEvent();
	      }
	    }
	  }, {
	    key: "handlePlayEvent",
	    value: function handlePlayEvent() {
	      var _this = this;

	      this.playEvent = true;
	      this.board = new _board2.default(this.ctx);
	      this.automata = new _automata2.default(this.board);

	      var singleMove = function singleMove() {
	        _this.gameWon();
	        _this.automata.neighborLogic();
	      };

	      this.levelOne();
	      this.startGame = setInterval(singleMove, 300);
	    }
	  }, {
	    key: "handleResetEvent",
	    value: function handleResetEvent() {
	      this.playEvent = false;
	      this.resetCells();
	      this.ctx.clearRect(0, 0, 550, 550);
	      this.ctx.stroke();
	      this.opener();
	    }
	  }, {
	    key: "handleRulesEvent",
	    value: function handleRulesEvent() {}
	  }, {
	    key: "resetCells",
	    value: function resetCells() {
	      for (var i = 0; i < this.board.cells.length; i++) {
	        this.board.cells[i].alive = false;
	      }
	    }
	  }, {
	    key: "winCondition",
	    value: function winCondition() {
	      var gameWon = true;

	      for (var i = 0; i < this.board.cells.length; i++) {
	        if (this.board.cells[i].alive) gameWon = false;
	      }

	      return gameWon;
	    }
	  }, {
	    key: "gameWon",
	    value: function gameWon() {
	      if (this.winCondition()) {
	        this.playEvent = false;
	        this.ctx.fillStyle = "darkgrey";
	        this.ctx.font = "50px Arial ghostwhite";
	        this.ctx.fillText("You Win!", 190, 260);
	      }
	    }
	  }, {
	    key: "endGame",
	    value: function endGame() {
	      this.playEvent = false;
	      this.ctx.clearRect(0, 0, 550, 550);
	      this.ctx.fillStyle = "darkgrey";
	      this.ctx.font = "50px Arial ghostwhite";
	      this.ctx.fillText("You Lose!", 180, 270);
	    }
	  }, {
	    key: "levelOne",
	    value: function levelOne() {
	      // const startingCells = [38, 48, 50, 59, 61, 71];
	      var startingCells = [38, 48, 50, 60];

	      for (var i = 0; i < startingCells.length; i++) {
	        this.board.cells[startingCells[i]].changeState();
	      }
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cell = __webpack_require__(3);

	var _cell2 = _interopRequireDefault(_cell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Board = function () {
	  function Board(ctx) {
	    _classCallCheck(this, Board);

	    var cells = [];
	    this.ctx = ctx;
	    this.cells = cells;

	    this.populateGrid();
	  }

	  _createClass(Board, [{
	    key: "toggleCell",
	    value: function toggleCell(e) {
	      var clickedCell = this.cells.find(function (cell) {
	        if (e.offsetX >= cell.xmin && e.offsetX <= cell.xmax) {
	          if (e.offsetY >= cell.ymin && e.offsetY <= cell.ymax) {
	            console.log(cell.id);
	            return cell;
	          }
	        }
	      });

	      if (!clickedCell.alive) clickedCell.changeState();
	    }
	  }, {
	    key: "populateGrid",
	    value: function populateGrid() {
	      var y = 0;
	      var id = 0;

	      for (var i = 0; i < 11; i++) {
	        var x = 0;

	        for (var j = 0; j < 11; j++) {
	          this.cells.push(new _cell2.default(this.ctx, id, x, y));
	          x += 50;
	          id++;
	        }
	        y += 50;
	      }
	    }
	  }]);

	  return Board;
	}();

	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Cell = function () {
	  function Cell(ctx, id, x, y) {
	    _classCallCheck(this, Cell);

	    this.id = id;
	    this.xmin = x + 1;
	    this.xmax = x + 50;
	    this.ymin = y + 1;
	    this.ymax = y + 50;
	    this.alive = false;
	    this.neighbors = [];

	    this.ctx = ctx;
	    this.x = x;
	    this.y = y;

	    this.getNeighbors();
	    this.render();
	  }

	  _createClass(Cell, [{
	    key: 'changeState',
	    value: function changeState() {
	      this.alive = this.alive ? false : true;
	      this.render();
	    }
	  }, {
	    key: 'getNeighbors',
	    value: function getNeighbors() {
	      var top = this.id - 11;
	      var topRight = this.id - 10;
	      var right = this.id + 1;
	      var bottomRight = this.id + 12;
	      var bottom = this.id + 11;
	      var bottomLeft = this.id + 10;
	      var left = this.id - 1;
	      var topLeft = this.id - 12;

	      if (this.id % 11 === 0) {
	        // Left side
	        if (this.id === 0) {
	          this.neighbors.push(right, bottomRight, bottom);
	        } else if (this.id === 110) {
	          this.neighbors.push(top, topRight, right);
	        } else {
	          this.neighbors.push(top, topRight, right, bottomRight, bottom);
	        }
	      } else if (this.id % 11 === 10) {
	        // Right side
	        if (this.id === 10) {
	          this.neighbors.push(left, bottomLeft, bottom);
	        } else if (this.id === 120) {
	          this.neighbors.push(top, topLeft, left);
	        } else {
	          this.neighbors.push(top, topLeft, left, bottomLeft, bottom);
	        }
	      } else {
	        // Center
	        this.neighbors.push(top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft);

	        this.neighbors = this.neighbors.filter(function (cellId) {
	          return cellId >= 0 && cellId <= 120;
	        });
	      }
	    }
	  }, {
	    key: 'getRandomColor',
	    value: function getRandomColor() {
	      var length = 6;
	      var chars = '0123456789ABCDEF';
	      var hex = '#';
	      while (length--) {
	        hex += chars[Math.random() * 16 | 0];
	      }return hex;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.alive) {
	        this.ctx.clearRect(this.x, this.y, 50, 50);
	        this.ctx.fillStyle = this.getRandomColor();
	        this.ctx.fillRect(this.x, this.y, 50, 50);
	      } else {
	        this.ctx.clearRect(this.x, this.y, 50, 50);
	        this.ctx.rect(this.x, this.y, 50, 50);
	      }
	    }
	  }]);

	  return Cell;
	}();

	exports.default = Cell;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Automata = function () {
	  function Automata(board) {
	    _classCallCheck(this, Automata);

	    this.board = board;
	  }

	  _createClass(Automata, [{
	    key: "neighborLogic",
	    value: function neighborLogic() {
	      var _this = this;

	      var changingCells = [];

	      for (var i = 0; i < this.board.cells.length; i++) {
	        var currentCell = this.board.cells[i];
	        var cellNeighbors = this.board.cells[i].neighbors;
	        var aliveNeighbors = cellNeighbors.filter(function (cellId) {
	          return _this.board.cells[cellId].alive;
	        });

	        if (currentCell.alive) {

	          if (aliveNeighbors.length < 2) {
	            changingCells.push(i);
	          } else if (aliveNeighbors.length > 3) {
	            changingCells.push(i);
	          }
	        } else {

	          if (aliveNeighbors.length === 3) {
	            changingCells.push(i);
	          }
	        }
	      }

	      changingCells.forEach(function (id) {
	        _this.board.cells[id].changeState();
	      });
	    }
	  }]);

	  return Automata;
	}();

	exports.default = Automata;

/***/ }
/******/ ]);