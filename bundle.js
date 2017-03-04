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

	  // Pause Button && color shift
	  document.body.addEventListener('keydown', function (e) {
	    if (e.keyCode === 32) {
	      game.handlePauseEvent(e);
	    } else {
	      game.toggleColor(e);
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

	    this.type = 'cabbage';
	  }

	  _createClass(Game, [{
	    key: "handleClickEvent",
	    value: function handleClickEvent(e) {
	      e.preventDefault();
	      if (this.playEvent) {
	        this.board.toggleCell(e, this.type);
	        this.clickCount--;
	        this.clickCounter();
	      } else {
	        this.handlePlayEvent();
	      }
	    }
	  }, {
	    key: "toggleColor",
	    value: function toggleColor(e) {
	      if (e.keyCode === 49) {
	        this.type = 'cabbage';
	      } else if (e.keyCode === 50) {
	        this.type = 'rabbit';
	      } else if (e.keyCode === 51) {
	        this.type = 'fox';
	      }
	    }
	  }, {
	    key: "handlePlayEvent",
	    value: function handlePlayEvent() {
	      this.handleResetEvent();
	      this.playEvent = true;
	      // const currentLevel = this.levels[this.currentLevel];
	      // const startingCells = currentLevel.startingCells;
	      // this.clickCount = currentLevel.clickCount;
	      // this.clickCounter();
	      //
	      // for (let i = 0; i < startingCells.length; i++) {
	      //   this.board.cells[startingCells[i]].changeState();
	      // }

	      // this.startGame = setInterval(() => {
	      this.automata.cellLogic();
	      // this.winCondition();
	      // }, 100);
	    }
	  }, {
	    key: "handlePauseEvent",
	    value: function handlePauseEvent(e) {
	      e.preventDefault();
	      // if (this.pauseEvent && this.playEvent) {
	      //   this.pauseEvent = false;
	      //
	      //   this.startGame = setInterval(() => {
	      this.automata.cellLogic();
	      // this.winCondition();
	      //   }, 100);
	      //
	      // } else if (this.playEvent) {
	      //   this.pauseEvent = true;
	      //   clearInterval(this.startGame);
	      // }
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
	    value: function toggleCell(e, type) {
	      var clickedCell = this.cells.find(function (cell) {
	        if (e.offsetX >= cell.xmin && e.offsetX <= cell.xmax) {
	          if (e.offsetY >= cell.ymin && e.offsetY <= cell.ymax) {
	            return cell;
	          }
	        }
	      });

	      clickedCell.changeState(type);
	    }
	  }, {
	    key: "populateGrid",
	    value: function populateGrid() {
	      var y = 0;
	      var id = 1;

	      for (var i = 0; i < 60; i++) {
	        var x = 0;

	        for (var j = 0; j < 80; j++) {
	          this.cells.push(new _cell2.default(this.ctx, id, x, y));
	          x += 10;
	          id++;
	        }

	        y += 10;
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
	    this.xmax = x + 10;
	    this.ymin = y + 1;
	    this.ymax = y + 10;
	    this.type = false;
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
	      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      this.type = type;
	      this.render();
	    }
	  }, {
	    key: 'getNeighbors',
	    value: function getNeighbors() {
	      var _this = this;

	      var top = this.id - 80;
	      var topRight = this.id - 79;
	      var right = this.id + 1;
	      var bottomRight = this.id + 81;
	      var bottom = this.id + 80;
	      var bottomLeft = this.id + 79;
	      var left = this.id - 1;
	      var topLeft = this.id - 81;
	      var neighborArray = void 0;

	      if (this.id % 80 === 1) {
	        // Left side
	        neighborArray = [top, topRight, right, bottomRight, bottom];
	      } else if (this.id % 80 === 0) {
	        // Right side
	        neighborArray = [top, bottom, bottomLeft + 1, left, topLeft];
	      } else {
	        // Center
	        neighborArray = [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft];
	      }

	      neighborArray.forEach(function (num) {
	        if (num > 0 && num <= 4800) {
	          _this.neighbors.push(num);
	        }
	      });

	      // Edge case
	      if (this.id === 4722) {
	        this.neighbors = this.neighbors.filter(function (num) {
	          return num < 4800;
	        });
	      }
	    }

	    // getRandomColor() {
	    //   let length = 6;
	    //   const chars = '0123456789ABCDEF';
	    //   let hex = '#';
	    //   while(length--) hex += chars[(Math.random() * 16) | 0];
	    //   return hex;
	    // }

	  }, {
	    key: 'render',
	    value: function render() {
	      this.ctx.clearRect(this.x, this.y, 10, 10);

	      if (this.type === 'cabbage') {
	        this.ctx.fillStyle = 'green';
	        this.ctx.fillRect(this.x, this.y, 10, 10);
	      } else if (this.type === 'rabbit') {
	        this.ctx.fillStyle = 'blue';
	        this.ctx.fillRect(this.x, this.y, 10, 10);
	      } else if (this.type === 'fox') {
	        this.ctx.fillStyle = 'purple';
	        this.ctx.fillRect(this.x, this.y, 10, 10);
	      }

	      // this.ctx.strokeRect(this.x, this.y, 10, 10);
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
	    key: "random",
	    value: function random(array) {
	      return array[Math.floor(Math.random() * array.length)] - 1;
	    }
	  }, {
	    key: "shuffle",
	    value: function shuffle(array) {
	      for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	      }
	      return array;
	    }
	  }, {
	    key: "cellLogic",
	    value: function cellLogic() {
	      var _this = this;

	      var changingCells = {};
	      var changeRecord = {};
	      var cells = this.board.cells;
	      var shuffledCells = this.shuffle(this.board.cells.map(function (cell) {
	        return cell.id - 1;
	      }));

	      shuffledCells.forEach(function (id) {
	        var cellNeighbors = cells[id].neighbors;
	        var typeHash = { "cabbage": 0, "rabbit": 0, "fox": 0 };

	        cellNeighbors.forEach(function (num) {
	          if (cells[num - 1].type === 'rabbit') {
	            typeHash["rabbit"]++;
	          } else if (cells[num - 1].type === 'cabbage') {
	            typeHash["cabbage"]++;
	          } else if (cells[num - 1].type === 'fox') {
	            typeHash["fox"]++;
	          }
	        });

	        if (!cells[id].type) return;

	        if (cells[id].type === 'cabbage') {
	          (function () {

	            var validNeighbors = cellNeighbors.filter(function (cell) {
	              cell = cell - 1;
	              return !changingCells[cell] && !cells[cell].type;
	            });

	            var grow = function grow() {
	              if (validNeighbors.length > 0) {
	                var nextCell = _this.random(validNeighbors);
	                changeRecord[id] = nextCell;
	                changingCells[nextCell] = 'cabbage';
	              }
	            };

	            grow();
	          })();
	        } else if (cells[id].type === 'rabbit') {
	          (function () {

	            var validNeighbors = cellNeighbors.filter(function (cell) {
	              cell = cell - 1;
	              return !changingCells[cell] && (cells[cell].type === 'cabbage' || !cells[cell].type);
	            });

	            var wander = function wander() {
	              if (validNeighbors.length === 0) return;
	              var nextCell = _this.random(validNeighbors);
	              changeRecord[id] = nextCell;
	              changingCells[nextCell] = 'rabbit';
	              changingCells[id] = false;
	            };

	            var reproduce = function reproduce() {
	              if (validNeighbors.length === 0) return;
	              var nextCell = _this.random(validNeighbors);
	              changeRecord[id] = nextCell;
	              changingCells[nextCell] = 'rabbit';
	            };

	            var die = function die() {
	              changingCells[id] = false;
	            };

	            // const hunt = () => {
	            //
	            //   const prey = cellNeighbors.filter(function(num) {
	            //     return cells[num - 1].type === 'cabbage';
	            //   });
	            //
	            //   if (prey.length > 0) {
	            //     const preyCell = this.random(prey);
	            //
	            //     if (changeRecord[preyCell]) {
	            //       changingCells[changeRecord[preyCell]] = 'rabbit';
	            //       changeRecord[id] = changeRecord[preyCell];
	            //     } else {
	            //       changingCells[preyCell] = 'rabbit';
	            //       changeRecord[id] = preyCell;
	            //     }
	            //
	            //     changingCells[id] = false;
	            //
	            //   } else {
	            //     wander();
	            //   }
	            // };

	            if (!typeHash['cabbage']) {
	              die();
	            } else {
	              wander();
	              if (!typeHash['fox'] && typeHash['rabbit']) {
	                reproduce();
	              }
	            }
	          })();
	        } else if (cells[id].type === 'fox') {
	          (function () {

	            var validNeighbors = cellNeighbors.filter(function (cell) {
	              cell = cell - 1;
	              return !changingCells[cell] && (cells[cell].type === 'cabbage' || !cells[cell].type);
	            });

	            var wander = function wander() {
	              if (validNeighbors.length === 0) return;
	              var nextCell = _this.random(validNeighbors);
	              changeRecord[id] = nextCell;
	              changingCells[nextCell] = 'fox';
	              changingCells[id] = false;
	            };

	            var reproduce = function reproduce() {
	              if (validNeighbors.length === 0) return;
	              var nextCell = _this.random(validNeighbors);
	              changeRecord[id] = nextCell;
	              changingCells[nextCell] = 'fox';
	            };

	            var die = function die() {
	              changingCells[id] = false;
	            };

	            // const hunt = () => {
	            //
	            //   const prey = cellNeighbors.filter(function(num) {
	            //     return cells[num - 1].type === 'rabbit';
	            //   });
	            //
	            //   if (prey.length > 0) {
	            //     const preyCell = this.random(prey);
	            //
	            //     if (changeRecord[preyCell]) {
	            //       changingCells[changeRecord[preyCell]] = 'fox';
	            //       changeRecord[id] = changeRecord[preyCell];
	            //     } else {
	            //       changingCells[preyCell] = 'fox';
	            //       changeRecord[id] = preyCell;
	            //     }
	            //
	            //     changingCells[id] = false;
	            //
	            //   } else {
	            //     wander();
	            //   }
	            // };


	            if (!typeHash['cabbage']) {
	              die();
	            } else {
	              wander();
	              if (typeHash['fox'] && !typeHash['rabbit']) {
	                reproduce();
	              }
	            }
	          })();
	        }
	      });

	      Object.keys(changingCells).forEach(function (key) {
	        cells[parseInt(key)].changeState(changingCells[key]);
	      });
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