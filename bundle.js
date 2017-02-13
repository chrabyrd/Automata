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
	  var mainCanvas = document.getElementById("mainCanvas");
	  var mainCtx = mainCanvas.getContext("2d");

	  var clickCanvas = document.getElementById("clickCanvas");
	  var clickCtx = clickCanvas.getContext("2d");

	  var rulesButton = document.getElementById("rulesButton");
	  var rulesModal = document.getElementById("rulesModal");
	  var openerModal = document.getElementById("openerModal");

	  var game = new _game2.default(mainCtx, clickCtx);

	  mainCanvas.addEventListener('click', function (e) {
	    return game.handleClickEvent(e);
	  }, false);

	  // Pause Button
	  document.body.addEventListener('keydown', function (e) {
	    if (e.keyCode === 32) {
	      e.preventDefault();
	      game.handlePauseEvent();
	    }
	  });

	  // Rules Modal
	  rulesButton.addEventListener('click', function () {
	    rulesModal.style.display = "flex";
	  });
	  window.onclick = function (event) {
	    if (event.target === rulesModal || event.target === openerModal) {
	      rulesModal.style.display = "none";
	      openerModal.style.display = "none";
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

	var _levels = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(mainCtx, clickCtx) {
	    _classCallCheck(this, Game);

	    this.mainCtx = mainCtx;
	    this.clickCtx = clickCtx;
	    this.playEvent = false;
	    this.pauseEvent = false;
	    this.gameWon = false;
	    this.clickCount = 0;
	    this.board = new _board2.default(this.mainCtx);
	    this.automata = new _automata2.default(this.board);
	    this.levels = _levels.levels;
	    this.currentLevel = 0;
	    this.startGame;

	    this.levelMessage();
	  }

	  _createClass(Game, [{
	    key: "handleClickEvent",
	    value: function handleClickEvent(e) {
	      e.preventDefault();
	      if (this.playEvent) {
	        this.board.toggleCell(e);
	        this.clickCount--;
	        this.clickCounter();
	      } else {
	        this.handlePlayEvent();
	      }
	    }
	  }, {
	    key: "handlePlayEvent",
	    value: function handlePlayEvent() {
	      var _this = this;

	      this.handleResetEvent();
	      this.playEvent = true;
	      var currentLevel = this.levels[this.currentLevel];
	      var startingCells = currentLevel.startingCells;
	      this.clickCount = currentLevel.clickCount;
	      this.clickCounter();

	      for (var i = 0; i < startingCells.length; i++) {
	        this.board.cells[startingCells[i]].changeState();
	      }

	      this.startGame = setInterval(function () {
	        _this.automata.cellLogic();
	        _this.winCondition();
	      }, 250);
	    }
	  }, {
	    key: "handlePauseEvent",
	    value: function handlePauseEvent() {
	      var _this2 = this;

	      if (this.pauseEvent && this.playEvent) {
	        this.pauseEvent = false;

	        this.startGame = setInterval(function () {
	          _this2.automata.cellLogic();
	          _this2.winCondition();
	        }, 250);
	      } else if (this.playEvent) {
	        this.pauseEvent = true;
	        clearInterval(this.startGame);
	      }
	    }
	  }, {
	    key: "handleResetEvent",
	    value: function handleResetEvent() {
	      this.gameWon = false;
	      this.playEvent = false;
	      clearInterval(this.startGame);
	      this.board = new _board2.default(this.mainCtx);
	      this.automata = new _automata2.default(this.board);
	      this.clickCtx.clearRect(0, 0, 550, 550);
	    }
	  }, {
	    key: "levelMessage",
	    value: function levelMessage() {
	      this.mainCtx.clearRect(0, 0, 550, 550);
	      this.mainCtx.fillStyle = "black";
	      this.mainCtx.font = "50pt sans-serif";
	      this.mainCtx.fillText("Level " + (this.currentLevel + 1), 170, 290);
	      this.clickCtx.clearRect(0, 0, 550, 550);
	    }
	  }, {
	    key: "winMessage",
	    value: function winMessage() {
	      this.mainCtx.clearRect(0, 0, 550, 550);
	      this.mainCtx.fillStyle = "black";
	      this.mainCtx.font = "50pt sans-serif";
	      this.mainCtx.fillText("You Win!", 140, 290);
	      this.mainCtx.font = "30pt sans-serif";
	      this.mainCtx.fillText("(only 3 levels so far)", 100, 360);
	      this.clickCtx.clearRect(0, 0, 550, 550);
	    }
	  }, {
	    key: "loseMessage",
	    value: function loseMessage() {
	      this.mainCtx.clearRect(0, 0, 550, 550);
	      this.mainCtx.fillStyle = "black";
	      this.mainCtx.font = "50pt sans-serif";
	      this.mainCtx.fillText("Fail!", 210, 290);
	      this.mainCtx.font = "30pt sans-serif";
	      this.mainCtx.fillText("(click to play again)", 100, 360);
	      this.clickCtx.clearRect(0, 0, 550, 550);
	    }
	  }, {
	    key: "clickCounter",
	    value: function clickCounter() {
	      this.clickCtx.fillStyle = "black";
	      this.clickCtx.font = "12pt sans-serif";
	      this.clickCtx.clearRect(0, 0, 550, 550);
	      this.clickCtx.fillText("Clicks left: " + this.clickCount, 440, 15);
	    }
	  }, {
	    key: "winCondition",
	    value: function winCondition() {
	      if (this.clickCount <= -1) {
	        clearInterval(this.startGame);
	        this.playEvent = false;
	        this.loseMessage();
	      } else if (this.board.cells.every(function (cell) {
	        return !cell.alive;
	      })) {
	        clearInterval(this.startGame);
	        this.playEvent = false;

	        if (this.currentLevel >= 2) {
	          this.currentLevel = 0;
	          this.winMessage();
	        } else {
	          this.currentLevel++;
	          this.levelMessage();
	          this.clickCtx.clearRect(0, 0, 550, 550);
	        }
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
	    key: "cellLogic",
	    value: function cellLogic() {
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

	      for (var _i = 0; _i < changingCells.length; _i++) {
	        this.board.cells[changingCells[_i]].changeState();
	      }
	    }
	  }]);

	  return Automata;
	}();

	exports.default = Automata;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var levels = exports.levels = {
	  0: { startingCells: [71, 49, 59, 61], clickCount: 3 },
	  1: { startingCells: [38, 48, 50, 59, 61, 71], clickCount: 2 },
	  2: { startingCells: [47, 48, 36, 37, 39, 40, 50, 51, 72, 73, 83, 84, 70, 69, 80, 81], clickCount: 1 }
	};

/***/ }
/******/ ]);