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

	var _container = __webpack_require__(7);

	var _container2 = _interopRequireDefault(_container);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.addEventListener("DOMContentLoaded", function () {
	  var mainCanvas = document.getElementById("mainCanvas");
	  var mainCtx = mainCanvas.getContext("2d");

	  var rulesButton = document.getElementById("rulesButton");
	  var rulesModal = document.getElementById("rulesModal");
	  var openerModal = document.getElementById("openerModal");

	  var container = new _container2.default(mainCanvas, mainCtx);

	  mainCanvas.addEventListener('click', function (e) {
	    return container.handleClickEvent(e);
	  }, false);

	  // Pause Button && color shift
	  document.body.addEventListener('keydown', function (e) {
	    if (e.keyCode === 32) {
	      container.handlePauseEvent(e);
	    } else {
	      container.toggleColor(e);
	    }
	  });

	  // Rules Modal
	  // rulesButton.addEventListener('click', function() {
	  //   rulesModal.style.display = "flex";
	  // });
	  // window.onclick = function(event) {
	  //   if (event.target === rulesModal || event.target === openerModal) {
	  //       rulesModal.style.display = "none";
	  //       openerModal.style.display = "none";
	  //   }
	  // };
	});

/***/ },
/* 1 */,
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

	      // console.log(clickedCell.id, clickedCell.neighbors);
	      clickedCell.changeState(type);
	    }
	  }, {
	    key: "populateGrid",
	    value: function populateGrid(cellSize, gridWidth, gridHeight) {
	      var maxWidthCellCount = gridWidth / Math.pow(cellSize, 2);
	      var maxHeightCellCount = gridHeight / Math.pow(cellSize, 2);
	      var y = 0;
	      var id = 0;

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
	        if (num > 0 && num <= maxCellId - 1) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cellType = __webpack_require__(6);

	var _cellType2 = _interopRequireDefault(_cellType);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Automata = function () {
	  function Automata(board) {
	    _classCallCheck(this, Automata);

	    this.board = board;
	  }

	  _createClass(Automata, [{
	    key: 'random',
	    value: function random(array) {
	      return array[Math.floor(Math.random() * array.length)];
	    }
	  }, {
	    key: 'shuffle',
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
	    key: 'cellLogic',
	    value: function cellLogic(conditionalHash) {
	      var changingCells = {};
	      var cells = this.board.cells;
	      var shuffledCells = this.shuffle(cells.map(function (cell) {
	        return cell.id;
	      }));

	      shuffledCells.forEach(function (id) {
	        if (!cells[id].type) return;

	        var cellType = new _cellType2.default(cells, changingCells, id);
	        cellType.live(conditionalHash);
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
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CellType = function () {
	  function CellType(cellList, changingCells, id) {
	    var _this = this;

	    _classCallCheck(this, CellType);

	    this.id = id;
	    this.changingCells = changingCells;
	    this.cells = cellList;
	    this.cellNeighbors = this.cells[id].neighbors;
	    this.type = this.cells[id].type;
	    this.typeHash = { "typeOne": 0, "typeTwo": 0, "typeThree": 0 };
	    this.cellNeighbors.forEach(function (num) {
	      _this.typeHash[_this.cells[num].type]++;
	    });
	  }

	  _createClass(CellType, [{
	    key: "random",
	    value: function random(array) {
	      return array[Math.floor(Math.random() * array.length)];
	    }
	  }, {
	    key: "getValidNeighbors",
	    value: function getValidNeighbors(cellTypeArray) {
	      var validNeighbors = this.cellNeighbors;
	      var changingCells = this.changingCells;
	      var cells = this.cells;

	      validNeighbors = this.cellNeighbors.filter(function (cell) {
	        return !changingCells[cell];
	      });

	      if (!cellTypeArray) return validNeighbors;

	      validNeighbors = validNeighbors.filter(function (cell) {
	        var isValid = false;
	        cellTypeArray.forEach(function (neighborType) {
	          if (cells[cell].type === neighborType) isValid = true;
	        });
	        return isValid;
	      });

	      return validNeighbors;
	    }
	  }, {
	    key: "wander",
	    value: function wander(array) {
	      var nextCell = this.random(array);
	      this.changingCells[nextCell] = this.type;
	      this.changingCells[this.id] = false;
	    }
	  }, {
	    key: "stay",
	    value: function stay() {
	      this.changingCells[this.id] = this.type;
	    }
	  }, {
	    key: "reproduce",
	    value: function reproduce(array) {
	      var nextCell = this.random(array);
	      this.changingCells[nextCell] = this.type;
	    }
	  }, {
	    key: "die",
	    value: function die() {
	      this.changingCells[this.id] = false;
	    }
	  }, {
	    key: "live",
	    value: function live(conditionalHash) {
	      var type = this.type;
	      var typeHash = this.typeHash;

	      var validNeighbors = this.getValidNeighbors(conditionalHash[type]['neighborArray']);

	      if (eval(conditionalHash[type]['conditions']['skipCon'])) {
	        return;
	      } else if (eval(conditionalHash[type]['conditions']['dieCon'])) {
	        this.die();
	      } else if (eval(conditionalHash[type]['conditions']['stayCon'])) {
	        this.stay();
	      } else if (eval(conditionalHash[type]['conditions']['reproduceCon'])) {
	        if (eval(conditionalHash[type]['conditions']['wanderCon'])) this.wander(validNeighbors);
	        this.reproduce(validNeighbors);
	      } else if (eval(conditionalHash[type]['conditions']['wanderCon'])) {
	        this.wander(validNeighbors);
	      }
	    }
	  }]);

	  return CellType;
	}();

	exports.default = CellType;

/***/ },
/* 7 */
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

	var Container = function () {
	  function Container(mainCanvas, mainCtx) {
	    _classCallCheck(this, Container);

	    this.mainCanvas = mainCanvas;
	    this.mainCtx = mainCtx;
	    this.cellSize = 16;
	    this.width = window.outerWidth;
	    this.height = window.outerHeight;
	    this.pauseEvent = false;
	    this.cellType = 'typeOne';
	    this.start = null;
	    this.getGridSize();
	    this.board = new _board2.default(this.mainCtx, this.cellSize, this.width, this.height);
	    this.automata = new _automata2.default(this.board);
	    this.handlePlayEvent(this.conditionalHash());
	  }

	  _createClass(Container, [{
	    key: "conditionalHash",
	    value: function conditionalHash() {
	      return {
	        'typeOne': {
	          'conditions': {
	            'skipCon': "validNeighbors.length === 0",
	            'dieCon': "false",
	            'stayCon': "false",
	            'wanderCon': "false",
	            // 'reproduceCon': `true`
	            'reproduceCon': "!typeHash['typeTwo'] && !typeHash['typeThree']"
	          },
	          'neighborArray': [false]
	        },

	        'typeTwo': {
	          'conditions': {
	            'skipCon': "false",
	            'dieCon': "!typeHash['typeOne']",
	            'stayCon': "validNeighbors.length === 0",
	            'wanderCon': "true",
	            'reproduceCon': "typeHash[type]"
	          },
	          'neighborArray': [false, 'typeOne']
	        },

	        'typeThree': {
	          'conditions': {
	            'skipCon': "false",
	            'dieCon': "!typeHash['typeOne']",
	            'stayCon': "validNeighbors.length === 0",
	            'wanderCon': "true",
	            'reproduceCon': "typeHash[type]"
	          },
	          'neighborArray': [false, 'typeOne']
	        }
	      };
	    }
	  }, {
	    key: "closestValue",
	    value: function closestValue(num, array) {
	      return array.sort(function (a, b) {
	        return Math.abs(num - a) - Math.abs(num - b);
	      })[0];
	    }
	  }, {
	    key: "getGridSize",
	    value: function getGridSize() {
	      var valid = [];

	      var _loop = function _loop(i) {
	        var isValid = [2, 4, 8, 16].every(function (num) {
	          return i % num === 0;
	        });
	        if (isValid) valid.push(i);
	      };

	      for (var i = 0; i <= 4000; i++) {
	        _loop(i);
	      }
	      this.width = this.closestValue(this.width, valid);
	      this.height = this.closestValue(this.height, valid);
	      this.mainCanvas.width = this.width;
	      this.mainCanvas.height = this.height;
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
	    value: function handlePlayEvent(conditionalHash) {
	      var _this = this;

	      this.start = setInterval(function () {
	        _this.automata.cellLogic(conditionalHash);
	      }, 50);
	    }
	  }, {
	    key: "handlePauseEvent",
	    value: function handlePauseEvent(e) {
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
	  }, {
	    key: "handleResetEvent",
	    value: function handleResetEvent() {
	      clearInterval(this.start);
	      this.board = new _board2.default(this.mainCtx, 5, 800, 600);
	      this.automata = new _automata2.default(this.board);
	    }
	  }]);

	  return Container;
	}();

	exports.default = Container;

/***/ }
/******/ ]);