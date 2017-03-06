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

	  var rulesButton = document.getElementById("rulesButton");
	  var rulesModal = document.getElementById("rulesModal");
	  var openerModal = document.getElementById("openerModal");

	  var game = new _game2.default(mainCanvas, mainCtx);

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
	  function Game(mainCanvas, mainCtx) {
	    _classCallCheck(this, Game);

	    this.mainCanvas = mainCanvas;
	    this.mainCtx = mainCtx;
	    this.validCellSizes = [];
	    this.cellSize = 6;
	    this.width = window.outerWidth % 2 === 0 ? window.outerWidth : window.outerWidth - 1;
	    this.height = window.outerHeight % 2 === 0 ? window.outerHeight : window.outerHeight - 1;
	    this.getGridSize();
	    this.board = new _board2.default(this.mainCtx, this.cellSize, this.width, this.height);
	    this.automata = new _automata2.default(this.board);
	    this.pauseEvent = false;
	    this.cellType = 'typeOne';
	    this.startGame = null;
	    this.handlePlayEvent();
	    // this.levels = levels;
	    // this.currentLevel = 0;
	  }

	  _createClass(Game, [{
	    key: "getCellSizes",
	    value: function getCellSizes() {
	      var temp = [];

	      for (var i = 0; i < Math.sqrt(this.width); i++) {
	        if (this.width % i === 0) temp.push(i);
	      }

	      for (var _i = 0; _i < Math.sqrt(this.height); _i++) {
	        if (this.height % _i === 0) temp.push(_i);
	      }

	      for (var _i2 = 0; _i2 < temp.length; _i2++) {
	        var num = temp.shift();
	        if (temp.includes(num)) this.validCellSizes.push(num);
	      }
	    }
	  }, {
	    key: "getGridSize",
	    value: function getGridSize() {
	      while (this.validCellSizes.length !== 8) {
	        this.validCellSizes = [];
	        Math.floor(Math.random() * 2) === 1 ? this.width++ : this.width--;
	        Math.floor(Math.random() * 2) === 1 ? this.height++ : this.height--;
	        this.getCellSizes();
	        this.mainCanvas.width = this.width;
	        this.mainCanvas.height = this.height;
	      }
	      console.log(this.validCellSizes);
	    }
	  }, {
	    key: "handleClickEvent",
	    value: function handleClickEvent(e) {
	      e.preventDefault();
	      this.board.toggleCell(e, this.cellType);
	    }
	  }, {
	    key: "toggleColor",
	    value: function toggleColor(e) {
	      if (e.keyCode === 49) {
	        this.cellType = 'typeOne';
	      } else if (e.keyCode === 50) {
	        this.cellType = 'typeTwo';
	      } else if (e.keyCode === 51) {
	        this.cellType = 'typeThree';
	      }
	    }
	  }, {
	    key: "handlePlayEvent",
	    value: function handlePlayEvent() {
	      var _this = this;

	      this.startGame = setInterval(function () {
	        _this.automata.cellLogic();
	      }, 50);
	    }
	  }, {
	    key: "handlePauseEvent",
	    value: function handlePauseEvent(e) {
	      e.preventDefault();

	      if (this.pauseEvent) {
	        this.pauseEvent = false;
	        this.handlePlayEvent();
	      } else {
	        this.pauseEvent = true;
	        clearInterval(this.startGame);
	      }
	    }
	  }, {
	    key: "handleResetEvent",
	    value: function handleResetEvent() {
	      clearInterval(this.startGame);
	      this.board = new _board2.default(this.mainCtx, 5, 800, 600);
	      this.automata = new _automata2.default(this.board);
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
	  function Board(ctx, cellSize, gridWidth, gridHeight) {
	    _classCallCheck(this, Board);

	    this.ctx = ctx;
	    this.cells = [];

	    this.populateGrid(cellSize, gridWidth, gridHeight);
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

	      console.log(clickedCell.id, clickedCell.neighbors);
	      clickedCell.changeState(type);
	    }
	  }, {
	    key: "populateGrid",
	    value: function populateGrid(cellSize, gridWidth, gridHeight) {
	      var maxWidthCellCount = gridWidth / Math.pow(cellSize, 2);
	      var maxHeightCellCount = gridHeight / Math.pow(cellSize, 2);
	      var y = 0;
	      var id = 1;

	      for (var i = 0; i < cellSize * maxHeightCellCount; i++) {
	        var x = 0;

	        for (var j = 0; j < cellSize * maxWidthCellCount; j++) {
	          this.cells.push(new _cell2.default(this.ctx, gridWidth, gridHeight, cellSize, id, x, y));
	          x += cellSize;
	          id++;
	        }

	        y += cellSize;
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
	  function Cell(ctx, gridWidth, gridHeight, cellSize, id, x, y) {
	    _classCallCheck(this, Cell);

	    this.id = id;
	    this.xmin = x + 1;
	    this.xmax = x + cellSize;
	    this.ymin = y + 1;
	    this.ymax = y + cellSize;
	    this.type = false;
	    this.neighbors = [];

	    this.ctx = ctx;
	    this.cellSize = cellSize;
	    this.gridWidth = gridWidth;
	    this.x = x;
	    this.y = y;

	    this.getNeighbors(gridWidth, gridHeight, cellSize);
	    this.render();
	  }

	  _createClass(Cell, [{
	    key: 'changeState',
	    value: function changeState(type) {
	      this.type = type;
	      this.render();
	    }
	  }, {
	    key: 'getNeighbors',
	    value: function getNeighbors(gridWidth, gridHeight, cellSize) {
	      var _this = this;

	      var offsetValue = gridWidth / cellSize;
	      var maxWidthCount = gridWidth / Math.pow(cellSize, 2);
	      var maxHeightCount = gridHeight / Math.pow(cellSize, 2);
	      var maxCellId = Math.pow(cellSize, 2) * maxWidthCount * maxHeightCount;

	      var top = this.id - offsetValue;
	      var bottom = this.id + offsetValue;
	      var left = this.id - 1;
	      var right = this.id + 1;
	      var topLeft = this.id - (offsetValue + 1);
	      var bottomLeft = this.id + (offsetValue - 1);
	      var topRight = this.id - (offsetValue - 1);
	      var bottomRight = this.id + (offsetValue + 1);

	      var neighborArray = [top, topRight, right, bottomRight, bottom, bottomLeft, left, topLeft];

	      neighborArray.forEach(function (num) {
	        if (num > 0 && num <= maxCellId) {
	          _this.neighbors.push(num);
	        }
	      });
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
	      this.ctx.clearRect(this.x, this.y, this.cellSize, this.cellSize);

	      if (!this.type) return;

	      if (this.type === 'typeOne') {
	        this.ctx.fillStyle = 'green';
	      } else if (this.type === 'typeTwo') {
	        this.ctx.fillStyle = 'blue';
	      } else if (this.type === 'typeThree') {
	        this.ctx.fillStyle = 'purple';
	      }

	      this.ctx.fillRect(this.x, this.y, this.cellSize, this.cellSize);
	      // this.ctx.strokeRect(this.x, this.y, this.cellSize, this.cellSize);
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
	    this.validNeighbors = [];
	  }

	  _createClass(Automata, [{
	    key: "random",
	    value: function random(array) {
	      return array[Math.floor(Math.random() * array.length)];
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
	      var cells = this.board.cells;
	      var shuffledCells = this.shuffle(cells.map(function (cell) {
	        return cell.id - 1;
	      }));

	      shuffledCells.forEach(function (id) {
	        if (!cells[id].type) return;

	        var type = cells[id].type;
	        var typeHash = { "typeOne": 0, "typeTwo": 0, "typeThree": 0 };
	        var cellNeighbors = cells[id].neighbors;
	        cellNeighbors.forEach(function (num) {
	          typeHash[cells[num - 1].type]++;
	        });

	        var getValidNeighbors = function getValidNeighbors(cellTypeArray) {
	          var validNeighbors = cellNeighbors;

	          validNeighbors = cellNeighbors.filter(function (cell) {
	            return !changingCells[cell - 1];
	          });

	          if (!cellTypeArray) return validNeighbors;

	          validNeighbors = validNeighbors.filter(function (cell) {
	            cell = cell - 1;
	            var isValid = false;
	            cellTypeArray.forEach(function (cellType) {
	              if (cells[cell].type === cellType) isValid = true;
	            });
	            return isValid;
	          });

	          return validNeighbors;
	        };

	        var wander = function wander(array) {
	          var nextCell = _this.random(array) - 1;
	          changingCells[nextCell] = type;
	          changingCells[id] = false;
	        };

	        var stay = function stay() {
	          changingCells[id] = type;
	        };

	        var reproduce = function reproduce(array) {
	          var nextCell = _this.random(array) - 1;
	          changingCells[nextCell] = type;
	        };

	        var die = function die() {
	          changingCells[id] = false;
	        };

	        var live = function live(conditionalHash) {

	          if (conditionalHash['skipCon']) {
	            return;
	          } else if (conditionalHash['dieCon']) {
	            die();
	          } else if (conditionalHash['stayCon']) {
	            stay();
	          } else if (conditionalHash['reproduceCon']) {
	            reproduce(_this.validNeighbors);
	            if (conditionalHash['wanderCon']) wander(_this.validNeighbors);
	          } else if (conditionalHash['wanderCon']) {
	            wander(_this.validNeighbors);
	          }
	        };

	        if (type === 'typeOne') {
	          _this.validNeighbors = getValidNeighbors([false]);

	          // EXAMPLE: CABBAGE
	          live({
	            'skipCon': _this.validNeighbors.length === 0,
	            'reproduceCon': true
	          });

	          // EXAMPLE: FRACTALS (DISABLE GENDER)
	          // live({
	          //   'skipCon': this.validNeighbors.length === 0,
	          //   'reproduceCon': !typeHash['typeTwo'] && !typeHash['typeThree']
	          // });
	        } else if (type === 'typeTwo') {
	          _this.validNeighbors = getValidNeighbors([false, 'typeOne']);
	          // EXAMPLE: NON-PREDATOR SPECIES
	          live({
	            'dieCon': !typeHash['typeOne'],
	            'stayCon': _this.validNeighbors.length === 0,
	            'wanderCon': true,
	            'reproduceCon': typeHash[type]
	          });
	        } else if (type === 'typeThree') {
	          _this.validNeighbors = getValidNeighbors([false, 'typeOne']);
	          // EXAMPLE: NON-PREDATOR SPECIES
	          live({
	            'dieCon': !typeHash['typeOne'],
	            'stayCon': _this.validNeighbors.length === 0,
	            'wanderCon': true,
	            'reproduceCon': typeHash[type]
	          });
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