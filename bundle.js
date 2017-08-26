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
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _Container = __webpack_require__(12);

	var _Container2 = _interopRequireDefault(_Container);

	var _hashes = __webpack_require__(6);

	var _tutorial = __webpack_require__(7);

	var _gridControls = __webpack_require__(8);

	var _CellControlBar = __webpack_require__(11);

	var _CellControlBar2 = _interopRequireDefault(_CellControlBar);

	var _CellLogicModal = __webpack_require__(13);

	var _CellLogicModal2 = _interopRequireDefault(_CellLogicModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.addEventListener("DOMContentLoaded", function () {
	  var mainCanvas = document.getElementById("mainCanvas");
	  var mainCtx = mainCanvas.getContext("2d");

	  var informationModalBackdrop = document.getElementById("informationModalBackdrop");

	  var informationModal = document.getElementById("informationModal");
	  var tutorialModal = document.getElementById("tutorialModal");

	  var gridControls = document.getElementById("gridControls");
	  var playPauseButton = document.getElementById("playPauseButton");

	  var currentWidth = document.getElementById("currentWidth");
	  var currentHeight = document.getElementById("currentHeight");

	  var demoButton = document.getElementById("demoButton");
	  var newGridButton = document.getElementById("newGridButton");

	  var conditionalHash = _hashes.defaultHash;
	  var container = void 0;

	  var cellControlBar = new _CellControlBar2.default(container, _hashes.defaultHash);
	  var cellLogicModal = new _CellLogicModal2.default(container);

	  var mouseStateToggle = false;

	  mainCanvas.addEventListener('mousedown', function (e) {
	    return mouseStateToggle = true;
	  }, false);

	  mainCanvas.addEventListener('mouseup', function (e) {
	    return mouseStateToggle = false;
	  }, false);

	  mainCanvas.addEventListener('click', function (e) {
	    return container.handleClickEvent(e);
	  }, false);

	  mainCanvas.addEventListener('mousemove', function (e) {
	    if (mouseStateToggle === true) {
	      container.handleClickEvent(e);
	    }
	  }, false);

	  // Keyboard Shortcuts
	  document.body.addEventListener('keydown', function (e) {
	    if (e.target.classList.contains('cellNames')) return;
	    if (e.metaKey !== false) return;

	    switch (e.keyCode) {
	      case 27:
	        // Esc
	        toggleUI();
	        break;
	      case 32:
	        // Spacebar
	        e.preventDefault();
	        handlePauseEvent();
	        break;
	      case 49:
	        // 1
	        cellControlBar.changeCurrentCellType('typeOne');
	        break;
	      case 50:
	        // 2
	        cellControlBar.changeCurrentCellType('typeTwo');
	        break;
	      case 51:
	        // 3
	        cellControlBar.changeCurrentCellType('typeThree');
	        break;
	      case 52:
	        // 4
	        cellControlBar.changeCurrentCellType('typeFour');
	        break;
	      case 73:
	        // i
	        toggleInformationModal();
	        break;
	      case 78:
	        // n
	        handleNextFrameEvent();
	        break;
	      case 79:
	        // o
	        cellLogicModal.toggleCellLogicModal();
	        break;
	      case 82:
	        // r
	        handleResetEvent();
	        break;
	    }
	  });

	  var toggleInformationModal = function toggleInformationModal() {
	    if (!container.pauseEvent) handlePauseEvent();

	    // modalBackdrop.style.display = 'none';
	    informationModalBackdrop.style.display = 'flex';
	    informationModal.style.display = 'flex';
	    // cellLogicControls.style.zIndex = 0;
	  };

	  var toggleUI = function toggleUI() {
	    cellLogicModal.style.display = 'none';
	    informationModal.style.display = 'none';
	    // modalBackdrop.style.display = 'none';
	    gridControls.style.display = 'flex';

	    // cellControlBar.showCellTypeContainers();
	    //
	    // if (gridControls.style.opacity === '0') {
	    //   gridControls.style.opacity = '1';
	    //
	    //   for (let i = 0; i < cellControlBar.cellTypeContainers.length; i++) {
	    //     const currentType = Object.keys(conditionalHash)[i];
	    //
	    //     if (currentType === container.cellType) {
	    //       cellControlBar.cellTypeContainers[i].style.opacity = '1';
	    //     }
	    //   }
	    // } else {
	    //   gridControls.style.opacity = '0';
	    //
	    //   for (let i = 0; i < cellControlBar.cellTypeContainers.length; i++) {
	    //     cellControlBar.cellTypeContainers[i].style.opacity = '0';
	    //   }
	    // }
	  };

	  var handlePauseEvent = function handlePauseEvent() {
	    playPauseButton.classList.toggle("fa-pause");
	    playPauseButton.classList.add("fa-play");
	    container.handlePauseEvent();
	  };

	  var handleNextFrameEvent = function handleNextFrameEvent() {
	    if (playPauseButton.classList.contains("fa-pause")) {
	      playPauseButton.classList.toggle("fa-pause");
	      playPauseButton.classList.add("fa-play");
	    }
	    container.handleNextFrameEvent();
	  };

	  var handleResetEvent = function handleResetEvent() {
	    container.handleResetEvent();
	  };

	  var handleInformationModalBehavior = function handleInformationModalBehavior() {

	    var particleEffect = function particleEffect() {
	      var colors = {
	        aqua: "#00ffff",
	        azure: "#f0ffff",
	        beige: "#f5f5dc",
	        blue: "#0000ff",
	        brown: "#a52a2a",
	        cyan: "#00ffff",
	        darkblue: "#00008b",
	        darkcyan: "#008b8b",
	        darkgrey: "#a9a9a9",
	        darkgreen: "#006400",
	        darkkhaki: "#bdb76b",
	        darkmagenta: "#8b008b",
	        darkolivegreen: "#556b2f",
	        darkorange: "#ff8c00",
	        darkorchid: "#9932cc",
	        darkred: "#8b0000",
	        darksalmon: "#e9967a",
	        darkviolet: "#9400d3",
	        fuchsia: "#ff00ff",
	        gold: "#ffd700",
	        green: "#008000",
	        indigo: "#4b0082",
	        khaki: "#f0e68c",
	        lightblue: "#add8e6",
	        lightcyan: "#e0ffff",
	        lightgreen: "#90ee90",
	        lightpink: "#ffb6c1",
	        lightyellow: "#ffffe0",
	        lime: "#00ff00",
	        magenta: "#ff00ff",
	        maroon: "#800000",
	        navy: "#000080",
	        olive: "#808000",
	        orange: "#ffa500",
	        pink: "#ffc0cb",
	        purple: "#800080",
	        violet: "#800080",
	        red: "#ff0000",
	        silver: "#c0c0c0",
	        yellow: "#ffff00"
	      };

	      var generateParticle = function generateParticle() {
	        var getRandomInt = function getRandomInt(min, max) {
	          min = Math.ceil(min);
	          max = Math.floor(max);
	          return Math.floor(Math.random() * (max - min)) + min;
	        };

	        var size = getRandomInt(10, 40);
	        var randomColor = Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)];

	        var box = document.createElement('div');

	        box.style.width = size + "px";
	        box.style.height = size + "px";
	        box.style.left = getRandomInt(0, window.innerWidth) + "px";
	        box.style.bottom = getRandomInt(0, window.innerWidth) + "px";
	        box.classList.add("particle");
	        box.style.backgroundColor = randomColor;
	        informationModalBackdrop.appendChild(box);

	        setTimeout(function () {
	          box.style.webkitAnimationName = 'boxFadeOut';
	          box.style.webkitAnimationDuration = '1s';
	        }, 1600);

	        setTimeout(function () {
	          box.parentNode.removeChild(box);
	        }, 2000);
	      };

	      generateParticle();
	    };

	    var changeHash = function changeHash(hash) {
	      conditionalHash = hash;
	      container = new _Container2.default(mainCanvas, mainCtx, conditionalHash);

	      var populateGridDimensions = function populateGridDimensions() {
	        var possibleDimensions = container.gridDimensions.sort(function (a, b) {
	          return a - b;
	        });

	        possibleDimensions.reverse().forEach(function (num) {
	          var widthOption = document.createElement('option');
	          widthOption.value = num;
	          widthOption.text = num;

	          var heightOption = document.createElement('option');
	          heightOption.value = num;
	          heightOption.text = num;

	          currentWidth.add(widthOption);
	          currentHeight.add(heightOption);
	        });

	        currentWidth.value = container.width;
	        currentHeight.value = container.height;
	      };

	      informationModal.style.display = 'none';
	      informationModalBackdrop.style.display = 'none';
	      gridControls.style.display = 'flex';

	      clearInterval(particleEffect, 40);

	      handleResetEvent();
	      cellControlBar.populateTypeContainers();
	      populateGridDimensions();
	      cellControlBar.showCellTypeContainers();
	    };

	    setInterval(particleEffect, 40);

	    newGridButton.addEventListener('click', function () {
	      changeHash(_hashes.defaultHash);
	      (0, _gridControls.handleGridControlButtons)(container);
	    });

	    demoButton.addEventListener('click', function () {
	      changeHash(_hashes.demoHash);
	      (0, _gridControls.handleGridControlButtons)(container);
	      (0, _tutorial.startTutorial)();
	    });

	    // Use this pattern for later presets
	    // demoButton.addEventListener('click', () => {
	    //   changeHash(demoHash);
	    // });
	  };

	  cellControlBar.populateTypeContainers();
	  handleInformationModalBehavior();
	});

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
	    value: function toggleCell(e, type, color) {
	      var clickedCell = this.cells.find(function (cell) {
	        if (e.offsetX >= cell.xmin && e.offsetX <= cell.xmax) {
	          if (e.offsetY >= cell.ymin && e.offsetY <= cell.ymax) {
	            return cell;
	          }
	        }
	      });

	      clickedCell.changeState(type, color);
	      return clickedCell;
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
	    this.neighbors = [];

	    this.ctx = ctx;
	    this.cellSize = cellSize;
	    this.gridWidth = gridWidth;
	    this.x = x;
	    this.y = y;

	    this.type = 'false';
	    this.color = 'rgba(255, 255, 255, 0)';

	    this.getNeighbors(gridWidth, gridHeight, cellSize);
	    this.render();
	  }

	  _createClass(Cell, [{
	    key: 'changeState',
	    value: function changeState(type, color) {
	      this.type = type;
	      this.color = color;
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
	        if (num >= 0 && num <= maxCellId - 1) {
	          _this.neighbors.push(num);
	        }
	      });
	    }
	  }, {
	    key: 'hexToRgbA',
	    value: function hexToRgbA(hex) {
	      var c = void 0;

	      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
	        c = hex.substring(1).split('');
	        if (c.length === 3) {
	          c = [c[0], c[0], c[1], c[1], c[2], c[2]];
	        }
	        c = '0x' + c.join('');
	        return 'rgba(' + [c >> 16 & 255, c >> 8 & 255, c & 255].join(',') + ', .9)';
	      }
	      throw new Error('Bad Hex');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.ctx.clearRect(this.x, this.y, this.cellSize, this.cellSize);

	      if (this.type === 'false') return;

	      // Converting Hex to RGBA in case of future opacity tweaking
	      this.ctx.fillStyle = this.hexToRgbA(this.color);

	      this.ctx.fillRect(this.x, this.y, this.cellSize, this.cellSize);
	    }
	  }]);

	  return Cell;
	}();

	exports.default = Cell;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cellLogic = __webpack_require__(5);

	var _cellLogic2 = _interopRequireDefault(_cellLogic);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Automata = function () {
	  function Automata(board) {
	    _classCallCheck(this, Automata);

	    this.board = board;
	    this.livingCells = {};
	    this.changingCells = {};
	    this.dyingCells = [];
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
	      var _this = this;

	      this.shuffle(this.dyingCells).forEach(function (cell) {
	        var cellLogic = new _cellLogic2.default(_this.changingCells, _this.board.cells, cell);
	        cellLogic.live(conditionalHash);

	        cell.neighbors.forEach(function (id) {
	          if (_this.livingCells[id]) return;
	          _this.livingCells[id] = _this.board.cells[id];
	        });
	      });

	      this.dyingCells = [];

	      this.shuffle(Object.values(this.livingCells)).forEach(function (cell) {
	        if (_this.changingCells[cell.id]) return;
	        var cellLogic = new _cellLogic2.default(_this.changingCells, _this.board.cells, cell);
	        cellLogic.live(conditionalHash);
	      });

	      this.livingCells = {};

	      Object.keys(this.changingCells).forEach(function (key) {
	        _this.board.cells[key].changeState(_this.changingCells[key], conditionalHash[_this.changingCells[key]].color);

	        _this.dyingCells.push(_this.board.cells[key]);
	      });

	      this.changingCells = {};
	    }
	  }]);

	  return Automata;
	}();

	exports.default = Automata;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CellLogic = function () {
	  function CellLogic(changingCells, cellList, cell) {
	    _classCallCheck(this, CellLogic);

	    this.cell = cell;
	    this.cellList = cellList;
	    this.changingCells = changingCells;
	  }

	  _createClass(CellLogic, [{
	    key: 'random',
	    value: function random(array) {
	      return array[Math.floor(Math.random() * array.length)];
	    }
	  }, {
	    key: 'getValidNeighbors',
	    value: function getValidNeighbors(cellTypeArray) {
	      var _this = this;

	      var validNeighbors = this.cell.neighbors;
	      var changingCells = this.changingCells;

	      validNeighbors = validNeighbors.filter(function (neighbor) {
	        var isValid = false;
	        cellTypeArray.forEach(function (type) {
	          if (_this.cellList[neighbor].type === type && !changingCells[neighbor]) {
	            isValid = true;
	          }
	        });
	        return isValid;
	      });

	      return validNeighbors;
	    }
	  }, {
	    key: 'wander',
	    value: function wander(array) {
	      var nextCell = this.random(array);
	      this.changingCells[nextCell] = this.cell.type;
	      this.changingCells[this.cell.id] = 'false';
	    }
	  }, {
	    key: 'stay',
	    value: function stay() {
	      this.changingCells[this.cell.id] = this.cell.type;
	    }
	  }, {
	    key: 'reproduce',
	    value: function reproduce(array) {
	      // console.log(array);
	      var nextCell = this.random(array);
	      this.changingCells[nextCell] = this.cell.type;
	    }
	  }, {
	    key: 'die',
	    value: function die() {
	      this.changingCells[this.cell.id] = 'false';
	    }
	  }, {
	    key: 'live',
	    value: function live(conditionalHash) {
	      var _this2 = this;

	      if (this.changingCells[this.cell.id]) return;

	      var type = this.cell.type;
	      var typeHash = {};

	      var neighborTypes = Object.keys(conditionalHash[type]['neighborHash']);

	      var validTypesWithFalse = neighborTypes.filter(function (neighborType) {
	        return conditionalHash[type]['neighborHash'][neighborType] === true;
	      });

	      var validTypesWithoutFalse = neighborTypes.filter(function (neighborType) {
	        var currentType = conditionalHash[type]['neighborHash'][neighborType];

	        if (currentType === true && neighborType !== 'false') return true;
	      });

	      var validNeighborsWithFalse = this.getValidNeighbors(validTypesWithFalse);
	      var validNeighborsWithoutFalse = this.getValidNeighbors(validTypesWithoutFalse);

	      var totalNeighbors = this.cell.neighbors.filter(function (id) {
	        return _this2.cellList[id].type !== 'false';
	      });

	      neighborTypes.forEach(function (neighborType) {
	        typeHash[neighborType] = 0;
	      });

	      this.cell.neighbors.forEach(function (num) {
	        typeHash[_this2.cellList[num].type]++;
	      });

	      if (eval(conditionalHash[type]['conditions']['skipCon'])) {
	        return;
	      } else if (eval(conditionalHash[type]['conditions']['dieCon'])) {
	        this.die();
	      } else if (eval(conditionalHash[type]['conditions']['reproduceCon'])) {
	        this.reproduce(validNeighborsWithFalse);
	      } else if (eval(conditionalHash[type]['conditions']['wanderCon'])) {
	        this.wander(validNeighborsWithFalse);
	      } else {
	        this.stay();
	      }
	    }
	  }]);

	  return CellLogic;
	}();

	exports.default = CellLogic;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaultHash = exports.defaultHash = {
	  'typeOne': {
	    'name': 'A',
	    'color': '#FF0000',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0',
	      'dieCon': 'Math.random() * 100 < 0',
	      'stayCon': 'Math.random() * 100 < 0',
	      'wanderCon': 'Math.random() * 100 < 0',
	      'reproduceCon': 'Math.random() * 100 < 0'
	    },
	    'neighborHash': {
	      'typeOne': true,
	      'typeTwo': true,
	      'typeThree': true,
	      'typeFour': true,
	      'false': true
	    }
	  },

	  'typeTwo': {
	    'name': 'B',
	    'color': '#FFA500',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0',
	      'dieCon': 'Math.random() * 100 < 0',
	      'stayCon': 'Math.random() * 100 < 0',
	      'wanderCon': 'Math.random() * 100 < 0',
	      'reproduceCon': 'Math.random() * 100 < 0'
	    },
	    'neighborHash': {
	      'typeOne': true,
	      'typeTwo': true,
	      'typeThree': true,
	      'typeFour': true,
	      'false': true
	    }
	  },

	  'typeThree': {
	    'name': 'C',
	    'color': '#FFFF00',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0',
	      'dieCon': 'Math.random() * 100 < 0',
	      'stayCon': 'Math.random() * 100 < 0',
	      'wanderCon': 'Math.random() * 100 < 0',
	      'reproduceCon': 'Math.random() * 100 < 0'
	    },
	    'neighborHash': {
	      'typeOne': true,
	      'typeTwo': true,
	      'typeThree': true,
	      'typeFour': true,
	      'false': true
	    }
	  },

	  'typeFour': {
	    'name': 'D',
	    'color': '#0000FF',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0',
	      'dieCon': 'Math.random() * 100 < 0',
	      'stayCon': 'Math.random() * 100 < 0',
	      'wanderCon': 'Math.random() * 100 < 0',
	      'reproduceCon': 'Math.random() * 100 < 0'
	    },
	    'neighborHash': {
	      'typeOne': true,
	      'typeTwo': true,
	      'typeThree': true,
	      'typeFour': true,
	      'false': true
	    }
	  },

	  'false': {
	    'name': 'false',
	    'color': 'rgba(255, 255, 255, 0)',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100',
	      'dieCon': 'Math.random() * 100 < 0',
	      'stayCon': 'Math.random() * 100 < 0',
	      'wanderCon': 'Math.random() * 100 < 0',
	      'reproduceCon': 'Math.random() * 100 < 0'
	    },
	    'neighborHash': {
	      'typeOne': false,
	      'typeTwo': false,
	      'typeThree': false,
	      'typeFour': false,
	      'false': true
	    }
	  }
	};

	var demoHash = exports.demoHash = {
	  'typeOne': {
	    'name': 'Grass',
	    'color': '#507F2C',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0',
	      'dieCon': 'Math.random() * 100 < 0',
	      'stayCon': 'Math.random() * 100 < 0',
	      'wanderCon': 'Math.random() * 100 < 0',
	      'reproduceCon': 'Math.random() * 100 < 100'
	    },
	    'neighborHash': {
	      'typeOne': false,
	      'typeTwo': false,
	      'typeThree': false,
	      'typeFour': false,
	      'false': true
	    }
	  },

	  'typeTwo': {
	    'name': 'Sheep',
	    'color': '#2552B2',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0',
	      'dieCon': 'Math.random() * 100 < 100 && typeHash[\'typeOne\'] === 0',
	      'stayCon': 'Math.random() * 100 < 33',
	      'wanderCon': 'Math.random() * 100 < 50',
	      'reproduceCon': 'Math.random() * 100 < 25 && typeHash[\'typeTwo\'] > 0 && typeHash[\'typeOne\'] > 2'
	    },
	    'neighborHash': {
	      'typeOne': true,
	      'typeTwo': false,
	      'typeThree': false,
	      'typeFour': false,
	      'false': true
	    }
	  },

	  'typeThree': {
	    'name': 'Human',
	    'color': '#FF851B',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0',
	      'dieCon': 'Math.random() * 100 < 100 && validNeighborsWithoutFalse.length === 0',
	      'stayCon': 'Math.random() * 100 < 33',
	      'wanderCon': 'Math.random() * 100 < 100',
	      'reproduceCon': 'Math.random() * 100 < 25 && typeHash[\'typeThree\'] > 0 && validNeighborsWithoutFalse.length > 2'
	    },
	    'neighborHash': {
	      'typeOne': true,
	      'typeTwo': true,
	      'typeThree': false,
	      'typeFour': false,
	      'false': true
	    }
	  },

	  'typeFour': {
	    'name': 'Fence',
	    'color': '#654321',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0',
	      'dieCon': 'Math.random() * 100 < 0',
	      'stayCon': 'Math.random() * 100 < 100',
	      'wanderCon': 'Math.random() * 100 < 0',
	      'reproduceCon': 'Math.random() * 100 < 0'
	    },
	    'neighborHash': {
	      'typeOne': true,
	      'typeTwo': false,
	      'typeThree': false,
	      'typeFour': false,
	      'false': true
	    }
	  },

	  'false': {
	    'name': 'false',
	    'color': 'rgba(255, 255, 255, 0)',
	    'conditions': {
	      'skipCon': 'Math.random() * 100 < 100',
	      'dieCon': 'Math.random() * 100 < 0',
	      'stayCon': 'Math.random() * 100 < 0',
	      'wanderCon': 'Math.random() * 100 < 0',
	      'reproduceCon': 'Math.random() * 100 < 0'
	    },
	    'neighborHash': {
	      'typeOne': false,
	      'typeTwo': false,
	      'typeThree': false,
	      'typeFour': false,
	      'false': true
	    }
	  }
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var startTutorial = exports.startTutorial = function startTutorial() {

	  var tutorialModal = document.getElementById("tutorialModal");
	  var modalBackdrop = document.getElementById("modalBackdrop");
	  var informationModalBackdrop = document.getElementById("informationModalBackdrop");
	  var informationModal = document.getElementById("informationModal");
	  var cellLogicControls = document.getElementById('cellLogicControls');
	  var tutorialInformation = document.getElementById("tutorialInformation");
	  var nextSlideButton = document.getElementById("nextSlideButton");
	  var exitTutorialButton = document.getElementById("exitTutorialButton");

	  var handleTutorialShortcuts = function handleTutorialShortcuts(keyCode) {
	    if (keyCode === 49) {
	      cellLogicControls.style.zIndex = 1;
	      document.body.removeEventListener('keydown', tutorialKeyOne);
	      document.body.addEventListener('keydown', tutorialKeyTwo);

	      tutorialInformation.innerText = "";
	      tutorialInformation.innerText = "\n          This is a cell type.\n\n          From this toolbar you can change a cell's color, name, and behavior.\n\n          Please press 2.\n        ";
	    } else if (keyCode === 50 || keyCode === 51 || keyCode === 52) {
	      document.body.removeEventListener('keydown', tutorialKeyTwo);

	      tutorialInformation.innerText = "";
	      tutorialInformation.innerText = "\n        You just accessed a new cell type!\n\n        You can change cell types with the keys 1 - 4.\n        ";

	      nextSlideButton.style.display = 'flex';
	    }
	  };

	  var tutorialKeyOne = handleTutorialShortcuts.bind(null, 49);
	  var tutorialKeyTwo = handleTutorialShortcuts.bind(null, 50);

	  var returnToMainMenu = function returnToMainMenu() {
	    modalBackdrop.style.display = 'none';
	    informationModal.style.display = 'flex';
	    informationModalBackdrop.style.display = 'flex';
	    cellLogicControls.style.zIndex = 0;
	  };

	  var firstSlide = function firstSlide() {
	    tutorialInformation.innerText = "";
	    tutorialInformation.innerText = "\n      Hello, and welcome to the tutorial.\n\n      You can exit at any time by pressing the \"X\" button in the upper-left corner.\n    ";

	    nextSlideButton.onclick = secondSlide;
	  };

	  var secondSlide = function secondSlide() {
	    tutorialInformation.innerText = "";
	    tutorialInformation.innerText = "\n      Automata is a cellular automation engine.\n\n      Cellular automation, put simply, means that every cell in a grid derives its behavior from the conditions of its surrounding cells.\n\n      Automata lets you control exactly what this cell behavior should be, and under what conditions it should change.\n    ";

	    nextSlideButton.onclick = thirdSlide;
	  };

	  var thirdSlide = function thirdSlide() {
	    tutorialInformation.innerText = "";
	    tutorialInformation.innerText = "\n      We've loaded a pre-configured scenario: Simple Farm.\n\n      There are four different cell types: Grass, Sheep, Human, and Fence.\n\n      Please press 1.\n    ";

	    document.body.addEventListener('keydown', tutorialKeyOne);
	    nextSlideButton.style.display = 'none';
	    nextSlideButton.onclick = fourthSlide;
	  };

	  var fourthSlide = function fourthSlide() {
	    tutorialInformation.innerText = "";
	    tutorialInformation.innerText = "\n      There are more key bindings and a thorough explanation in the ReadMe.\n\n      You can pause or unpause the engine with Spacebar.\n      If you want to render a single frame, press 'N'.\n\n      But for now, why not try adjusting some cell behavior?\n\n      Click the gear icon next to a cell's name.\n    ";

	    nextSlideButton.style.display = 'none';
	  };

	  modalBackdrop.style.display = 'flex';
	  tutorialModal.style.display = 'flex';
	  nextSlideButton.style.display = 'flex';

	  exitTutorialButton.addEventListener('click', returnToMainMenu);

	  firstSlide();
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var handleGridControlButtons = exports.handleGridControlButtons = function handleGridControlButtons(container) {
	  var mainCanvas = document.getElementById("mainCanvas");

	  var cellLogicControls = document.getElementById("cellLogicControls");

	  var modalBackdrop = document.getElementById("modalBackdrop");
	  var informationModalBackdrop = document.getElementById("informationModalBackdrop");
	  var informationModal = document.getElementById("informationModal");

	  var playPauseButton = document.getElementById("playPauseButton");
	  var nextFrameButton = document.getElementById("nextFrameButton");
	  var resetButton = document.getElementById("resetButton");

	  var speedSlider = document.getElementById("speedSlider");
	  var cellSizeDropdown = document.getElementById("cellSizeDropdown");
	  var currentWidth = document.getElementById("currentWidth");
	  var currentHeight = document.getElementById("currentHeight");

	  var informationButton = document.getElementById("informationButton");

	  var handlePauseEvent = function handlePauseEvent() {
	    playPauseButton.classList.toggle("fa-pause");
	    playPauseButton.classList.add("fa-play");
	    container.handlePauseEvent();
	  };

	  var handleNextFrameEvent = function handleNextFrameEvent() {
	    if (playPauseButton.classList.contains("fa-pause")) {
	      playPauseButton.classList.toggle("fa-pause");
	      playPauseButton.classList.add("fa-play");
	    }
	    container.handleNextFrameEvent();
	  };

	  var handleResetEvent = function handleResetEvent() {
	    container.handleResetEvent();
	  };

	  var toggleInformationModal = function toggleInformationModal() {
	    if (!container.pauseEvent) handlePauseEvent();

	    modalBackdrop.style.display = 'none';
	    informationModalBackdrop.style.display = 'flex';
	    informationModal.style.display = 'flex';
	    cellLogicControls.style.zIndex = 0;
	  };

	  var handleSpeedChangeEvent = function handleSpeedChangeEvent() {
	    container.handleSpeedChangeEvent(300 - speedSlider.value);
	  };

	  var handleCellResizeEvent = function handleCellResizeEvent() {
	    container.handleCellResizeEvent(cellSizeDropdown.value);
	  };

	  var handleResizeWidthEvent = function handleResizeWidthEvent() {
	    container.handleResizeEvent('width', parseInt(currentWidth.value));
	  };

	  var handleResizeHeightEvent = function handleResizeHeightEvent() {
	    container.handleResizeEvent('height', parseInt(currentHeight.value));
	  };

	  playPauseButton.addEventListener('click', handlePauseEvent);
	  nextFrameButton.addEventListener('click', handleNextFrameEvent);
	  resetButton.addEventListener('click', handleResetEvent);
	  speedSlider.addEventListener('change', handleSpeedChangeEvent);
	  cellSizeDropdown.addEventListener('change', handleCellResizeEvent);
	  currentWidth.addEventListener('change', handleResizeWidthEvent);
	  currentHeight.addEventListener('change', handleResizeHeightEvent);
	  informationButton.addEventListener('click', toggleInformationModal);
	};

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CellControlBar = function () {
	  function CellControlBar(container, conditionalHash) {
	    _classCallCheck(this, CellControlBar);

	    this.container = container;
	    this.conditionalHash = conditionalHash;

	    this.cellLogicControls = document.getElementById("cellLogicControls");
	    this.cellNames = document.getElementsByClassName("cellNames");
	    this.colorPickers = document.getElementsByClassName("colorPickers");

	    this.cellTypeContainers = document.getElementsByClassName("cellTypeContainers");

	    this.logicModalButtons = document.getElementsByClassName("logicModalButtons");
	  }

	  _createClass(CellControlBar, [{
	    key: "populateTypeContainers",
	    value: function populateTypeContainers() {
	      var _this = this;

	      this.handleCellNames();
	      this.populateColorPickers();
	      this.hideCellTypeContainers();

	      this.cellTypeContainers[0].style.opacity = '1';

	      var _loop = function _loop(i) {
	        var currentTypeContainer = _this.cellTypeContainers[i];
	        var currentLogicModalButton = _this.logicModalButtons[i];
	        var currentType = Object.keys(_this.conditionalHash)[i];

	        currentLogicModalButton.addEventListener('click', function () {
	          // tutorialModal.style.display = 'none';
	          _this.hideCellTypeContainers();
	          // changeCellLogicModalType(currentType);
	        });

	        currentTypeContainer.addEventListener('click', function () {
	          _this.changeCurrentCellType(currentType);
	        });

	        currentTypeContainer.addEventListener('mouseover', function () {
	          currentTypeContainer.style.opacity = '1';
	        });

	        currentTypeContainer.addEventListener('mouseleave', function () {
	          if (currentType !== _this.container.cellType) {
	            currentTypeContainer.style.opacity = '0';
	          }
	        });
	      };

	      for (var i = 0; i < this.cellTypeContainers.length; i++) {
	        _loop(i);
	      }
	    }
	  }, {
	    key: "showCellTypeContainers",
	    value: function showCellTypeContainers() {
	      for (var i = 0; i < this.cellTypeContainers.length; i++) {
	        var _currentType = Object.keys(this.conditionalHash)[i];

	        this.cellTypeContainers[i].style.display = 'flex';
	        this.cellTypeContainers[i].style.opacity = '0';

	        if (_currentType === this.cellType) {
	          this.cellTypeContainers[i].style.opacity = '1';
	        }
	      }
	    }
	  }, {
	    key: "hideCellTypeContainers",
	    value: function hideCellTypeContainers() {
	      for (var i = 0; i < this.cellTypeContainers.length; i++) {
	        this.cellTypeContainers[i].style.display = 'none';
	      }
	    }
	  }, {
	    key: "changeCurrentCellType",
	    value: function changeCurrentCellType(type) {
	      for (var i = 0; i < this.cellNames.length; i++) {
	        var currentName = this.cellNames[i];
	        var _currentTypeContainer = this.cellTypeContainers[i];

	        _currentTypeContainer.style.opacity = 0;

	        if (currentName.id === type) {
	          _currentTypeContainer.style.opacity = 1;
	        }
	      }

	      this.cellType = type;
	    }
	  }, {
	    key: "handleCellNames",
	    value: function handleCellNames(cellType) {
	      var _this2 = this;

	      var _loop2 = function _loop2(i) {
	        var currentName = _this2.cellNames[i];

	        currentName.value = _this2.conditionalHash[currentName.id].name;

	        currentName.addEventListener('input', function () {
	          _this2.conditionalHash[currentName.id].name = currentName.value;
	        });
	      };

	      for (var i = 0; i < this.cellNames.length; i++) {
	        _loop2(i);
	      }
	    }
	  }, {
	    key: "populateColorPickers",
	    value: function populateColorPickers() {
	      var _this3 = this;

	      var _loop3 = function _loop3(i) {
	        var currentColorPicker = _this3.colorPickers[i];
	        var currentType = Object.keys(_this3.conditionalHash)[i];

	        currentColorPicker.value = _this3.conditionalHash[currentType].color;
	        currentColorPicker.addEventListener('change', function (e) {
	          _this3.conditionalHash[currentType].color = e.target.value;
	        });
	      };

	      for (var i = 0; i < this.colorPickers.length; i++) {
	        _loop3(i);
	      }
	    }
	  }]);

	  return CellControlBar;
	}();

	exports.default = CellControlBar;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

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
	  function Container(mainCanvas, mainCtx, conditionalHash) {
	    _classCallCheck(this, Container);

	    this.mainCanvas = mainCanvas;
	    this.mainCtx = mainCtx;
	    this.conditionalHash = conditionalHash;
	    this.gridDimensions = [];
	    this.cellSizes = [1, 2, 4, 8, 16, 32];
	    this.width = window.innerWidth;
	    this.height = window.innerHeight;
	    this.drawspeed = 50;
	    this.cellSize = 16;
	    this.pauseEvent = false;
	    this.cellType = 'typeOne';
	    this.start = null;
	    this.getGridSize();
	    this.board = new _board2.default(this.mainCtx, this.cellSize, this.width, this.height);
	    this.automata = new _automata2.default(this.board);
	    this.handlePlayEvent();
	  }

	  _createClass(Container, [{
	    key: "closestValue",
	    value: function closestValue(num, array) {
	      var sortedArray = array.sort(function (a, b) {
	        return Math.abs(num - a) - Math.abs(num - b);
	      });

	      return sortedArray.filter(function (val) {
	        return val >= num;
	      })[0];
	    }
	  }, {
	    key: "getGridSize",
	    value: function getGridSize() {
	      var gridDimensions = [];

	      for (var i = 200; i <= 4000; i++) {
	        if (i % 32 === 0) gridDimensions.push(i);
	      }

	      this.width = this.closestValue(this.width, gridDimensions);
	      this.height = this.closestValue(this.height, gridDimensions);
	      this.mainCanvas.width = this.width;
	      this.mainCanvas.height = this.height;
	      this.gridDimensions = gridDimensions;
	    }
	  }, {
	    key: "handleClickEvent",
	    value: function handleClickEvent(e) {
	      var color = this.conditionalHash[this.cellType].color;
	      var selectedCell = this.board.toggleCell(e, this.cellType, color);

	      this.automata.dyingCells.push(selectedCell);
	    }
	  }, {
	    key: "handlePlayEvent",
	    value: function handlePlayEvent() {
	      var _this = this;

	      this.start = setInterval(function () {
	        _this.automata.cellLogic(_this.conditionalHash);
	      }, this.drawspeed);
	    }
	  }, {
	    key: "handlePauseEvent",
	    value: function handlePauseEvent() {
	      if (this.pauseEvent) {
	        this.pauseEvent = false;
	        this.handlePlayEvent();
	      } else {
	        this.pauseEvent = true;
	        clearInterval(this.start);
	      }
	    }
	  }, {
	    key: "handleNextFrameEvent",
	    value: function handleNextFrameEvent() {
	      if (!this.pauseEvent) this.handlePauseEvent();
	      this.automata.cellLogic(this.conditionalHash);
	    }
	  }, {
	    key: "handleResetEvent",
	    value: function handleResetEvent() {
	      this.handlePauseEvent();
	      this.board = new _board2.default(this.mainCtx, this.cellSize, this.width, this.height);
	      this.automata = new _automata2.default(this.board);
	      this.handlePauseEvent();
	    }
	  }, {
	    key: "handleSpeedChangeEvent",
	    value: function handleSpeedChangeEvent(speed) {
	      this.handlePauseEvent();
	      this.drawspeed = speed;
	      this.handlePauseEvent();
	    }
	  }, {
	    key: "handleCellResizeEvent",
	    value: function handleCellResizeEvent(size) {
	      this.cellSize = parseInt(size);
	      this.handleResetEvent();
	    }
	  }, {
	    key: "handleResizeEvent",
	    value: function handleResizeEvent(dimension, size) {
	      if (dimension === 'width') {
	        this.width = size;
	        this.mainCanvas.width = size;
	      } else if (dimension === 'height') {
	        this.height = size;
	        this.mainCanvas.height = size;
	      }

	      this.handleResetEvent();
	    }
	  }]);

	  return Container;
	}();

	exports.default = Container;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CellLogicModal = function () {
	  function CellLogicModal(container) {
	    var _this = this;

	    _classCallCheck(this, CellLogicModal);

	    this.container = container;
	    this.modalBackdrop = document.getElementById("modalBackdrop");
	    this.cellLogicModal = document.getElementById("cellLogicModal");

	    this.cellName = document.getElementById("cellName");

	    this.chanceSliders = document.getElementsByClassName("chanceSliders");
	    this.chanceOutputs = document.getElementsByClassName("chanceOutputs");
	    this.conditionOptions = document.getElementsByClassName("conditionOptions");
	    this.neighborTypes = document.getElementsByClassName("neighborTypes");
	    this.comparators = document.getElementsByClassName("comparators");
	    this.comparisonValues = document.getElementsByClassName("comparisonValues");
	    this.conditionalStatements = document.getElementsByClassName("conditionalStatements");
	    this.conditionalStatementContainers = document.getElementsByClassName("conditionalStatementContainers");
	    this.conditionalSubmitButtons = document.getElementsByClassName("conditionalSubmitButtons");

	    this.neighborTypeNames = document.getElementsByClassName("neighborTypeNames");
	    this.validNeighborBoxes = document.getElementsByClassName("validNeighborBox");

	    this.modalBackdrop.addEventListener('click', function (e) {
	      if (e.target.id !== 'modalBackdrop') return;
	      _this.toggleCellLogicModal();
	    });
	  }

	  _createClass(CellLogicModal, [{
	    key: "toggleCellLogicModal",
	    value: function toggleCellLogicModal() {
	      //     // if (tutorialModal.style.display !== 'none') return;
	      //     if (container.pauseEvent) handlePauseEvent();
	      //
	      //     const updateModal = () => {
	      //       const cellTypes = Object.keys(conditionalHash);
	      //
	      //       for (let i = 0; i < cellTypes.length; i++) {
	      //         const currentType = cellTypes[i];
	      //         if (currentType === container.cellType) {
	      //           changeCellLogicModalType(currentType);
	      //         }
	      //       }
	      //     };
	      //
	      //     if (modalBackdrop.style.display === 'none') {
	      //       modalBackdrop.style.display = 'flex';
	      //       gridControls.style.display = 'none';
	      //       informationModal.style.display = 'none';
	      //       updateModal();
	      //       cellControlBar.hideCellTypeContainers();
	      //     } else {
	      //       modalBackdrop.style.display = 'none';
	      //       tutorialModal.style.display = 'none';
	      //       gridControls.style.display = 'flex';
	      //       cellLogicModal.style.display = 'none';
	      //       cellControlBar.showCellTypeContainers();
	      //     }
	      //   }
	    }
	  }, {
	    key: "translateStatement",
	    value: function translateStatement(string) {
	      var translationHash = {
	        // "&&": `AND`,
	        // "||": `OR`,
	        "typeHash['typeOne']": "" + conditionalHash['typeOne'].name,
	        "typeHash['typeTwo']": "" + conditionalHash['typeTwo'].name,
	        "typeHash['typeThree']": "" + conditionalHash['typeThree'].name,
	        "typeHash['typeFour']": "" + conditionalHash['typeFour'].name,
	        "validNeighborsWithFalse.length": "Valid (+ false)",
	        "validNeighborsWithoutFalse.length": "Valid (- false)",
	        "totalNeighbors.length": "Total"
	        // ">": `is greater than`,
	        // ">=": `is greater than or equal to`,
	        // "<": `is less than`,
	        // "<=": `is less than or equal to`,
	        // "===": `is equal to`,
	        // "!==": `is not equal to`,
	        // "0": `zero`,
	        // "1": `one`,
	        // "2": `two`,
	        // "3": `three`,
	        // "4": `four`,
	        // "5": `five`,
	        // "6": `six`,
	        // "7": `seven`,
	        // "8": `eight`,
	      };

	      var filteredString = string.split(' ').map(function (str) {
	        if (Object.keys(translationHash).includes(str)) {
	          str = translationHash[str];
	        }
	        return str;
	      });

	      var valueArray = parseConditionalHashStatements(filteredString.join(' '));

	      var filteredArray = valueArray.filter(function (statement) {
	        if (!statement.startsWith('Math') && !statement.startsWith('true')) {
	          return statement;
	        }
	      });

	      return filteredArray.join(' ');
	    }
	  }, {
	    key: "populateConditionalDropdowns",
	    value: function populateConditionalDropdowns() {

	      var populateDropdown = function populateDropdown(arr) {
	        for (var i = 0; i < arr.length; i++) {
	          var currentType = arr[i];

	          for (var j = 0; j < currentType.options.length; j++) {
	            var currentOption = currentType.options[j];
	            currentOption.innerText = translateStatement(currentOption.value);
	          }
	        }
	      };

	      populateDropdown(neighborTypes);
	      populateDropdown(comparators);
	      populateDropdown(comparisonValues);
	    }
	  }, {
	    key: "parseConditionalHashStatements",
	    value: function parseConditionalHashStatements(condition) {

	      var flatten = function flatten(arr) {
	        return arr.reduce(function (acc, val) {
	          return acc.concat(Array.isArray(val) ? flatten(val) : val);
	        }, []);
	      };

	      var parseConditionalValues = function parseConditionalValues(value, operator) {
	        var valueArray = value.split(" " + operator + " ");
	        var returnArray = [];
	        for (var j = 0; j < valueArray.length - 1; j++) {
	          returnArray.push(valueArray[j].concat(" " + operator));
	        }
	        returnArray.push(valueArray[valueArray.length - 1]);
	        return returnArray;
	      };

	      var andOperator = parseConditionalValues(condition, '&&');

	      var bothOperators = andOperator.map(function (value) {
	        return parseConditionalValues(value, '||');
	      });

	      return flatten(bothOperators);
	    }
	  }, {
	    key: "changeModalCellName",
	    value: function changeModalCellName(cellType) {
	      cellName.innerText = conditionalHash[cellType].name + " Cell Behavior";
	    }
	  }, {
	    key: "refreshConditionalStatements",
	    value: function refreshConditionalStatements(cellType) {
	      for (var i = 0; i < conditionalStatements.length; i++) {
	        conditionalStatements[i].innerHTML = "";
	      }
	      populateConditionalStatements(cellType);
	    }
	  }, {
	    key: "populateConditionalStatements",
	    value: function populateConditionalStatements(cellType) {
	      var _loop = function _loop(i) {
	        var currentStatement = conditionalStatements[i];
	        var conditionalStatement = conditionalHash[cellType]['conditions'][currentStatement.id];
	        var conditionalStatementArray = parseConditionalHashStatements(conditionalStatement);

	        var _loop2 = function _loop2(j) {
	          var li = document.createElement("li");
	          var andButton = document.createElement("button");
	          var orButton = document.createElement("button");
	          var deleteButton = document.createElement("button");
	          var statement = conditionalStatementArray[j];

	          var mapButtonBehavior = function mapButtonBehavior(button, symbol) {
	            var statementArray = statement.split(' ');
	            var conditionalArray = conditionalHash[cellType]['conditions'][currentStatement.id].split(' ');

	            var removeStatementFromConditionalHash = function removeStatementFromConditionalHash(conditionalHashStatement) {
	              var currentCondition = conditionalHash[cellType]['conditions'][currentStatement.id];
	              var returnCondition = currentCondition.replace("" + conditionalHashStatement, '');

	              returnCondition = returnCondition.trim();

	              if (returnCondition.endsWith('&&') || returnCondition.endsWith('||')) {
	                returnCondition = returnCondition.slice(0, returnCondition.length - 3);
	              }

	              conditionalHash[cellType]['conditions'][currentStatement.id] = returnCondition;
	            };

	            var mapButtonSymbol = function mapButtonSymbol() {
	              if (symbol === 'Delete') {
	                button.classList.add('deleteButtons');
	                button.classList.add('fa');
	                button.classList.add('fa-times');
	              } else {
	                button.innerText = "" + symbol;
	              }
	            };

	            mapButtonSymbol();

	            button.addEventListener('click', function () {
	              for (var k = 0; k < conditionalArray.length; k++) {
	                var conditionalSlice = conditionalArray.slice(k, k + statementArray.length);
	                var conditionalSliceStatement = conditionalSlice.join(' ');
	                var operatorIndex = k + conditionalSlice.length - 1;

	                if (conditionalSlice.join(' ') === statement) {

	                  if (symbol === 'Delete') {
	                    removeStatementFromConditionalHash(conditionalSliceStatement);
	                  } else {

	                    if (symbol === '&&') {
	                      conditionalArray[operatorIndex] = "||";
	                    } else if (symbol === '||') {
	                      conditionalArray[operatorIndex] = "&&";
	                    }
	                    conditionalHash[cellType]['conditions'][currentStatement.id] = conditionalArray.join(' ');
	                  }

	                  refreshConditionalStatements(cellType);
	                }
	              }
	            });
	          };

	          var simplifyStatement = function simplifyStatement(string) {
	            var filteredString = string.split(' ').filter(function (str) {
	              return str !== '||' && str !== '&&';
	            });

	            return filteredString.join(' ');
	          };

	          var translatedStatement = translateStatement(statement);
	          var simplifiedStatement = simplifyStatement(translatedStatement);

	          mapButtonBehavior(andButton, '&&');
	          mapButtonBehavior(orButton, '||');
	          mapButtonBehavior(deleteButton, 'Delete');

	          if (!simplifiedStatement) return "continue";

	          li.appendChild(document.createTextNode(simplifiedStatement));

	          if (translatedStatement.endsWith('&&')) {
	            li.appendChild(andButton);
	          } else if (translatedStatement.endsWith('||')) {
	            li.appendChild(orButton);
	          }

	          li.appendChild(deleteButton);

	          currentStatement.appendChild(li);
	        };

	        for (var j = 0; j < conditionalStatementArray.length; j++) {
	          var _ret2 = _loop2(j);

	          if (_ret2 === "continue") continue;
	        }
	      };

	      for (var i = 0; i < conditionalStatements.length; i++) {
	        _loop(i);
	      }
	    }
	  }, {
	    key: "addStatementToConditionalHash",
	    value: function addStatementToConditionalHash(cellType, button) {
	      var currentCondition = conditionalHash[cellType]['conditions'][button.name];
	      var returnString = "";

	      var addValueToReturnString = function addValueToReturnString(nodeArr, buttonType) {
	        for (var j = 0; j < nodeArr.length; j++) {
	          var currentItem = nodeArr[j];

	          if (currentItem.name === buttonType) {
	            returnString += " " + currentItem.value;
	          }
	        }
	      };

	      var addReturnStringToConditionalHash = function addReturnStringToConditionalHash() {
	        addValueToReturnString(neighborTypes, button.name);
	        addValueToReturnString(comparators, button.name);
	        addValueToReturnString(comparisonValues, button.name);

	        returnString = returnString.trim();

	        if (!returnString) return;

	        conditionalHash[cellType]['conditions'][button.name] += " && " + returnString;
	      };

	      addReturnStringToConditionalHash();
	    }
	  }, {
	    key: "resetMenuValues",
	    value: function resetMenuValues() {
	      var button = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	      var resetMenuValue = void 0;

	      if (!button) {
	        resetMenuValue = function resetMenuValue(menuName) {
	          for (var j = 0; j < menuName.length; j++) {
	            menuName[j].value = "";
	          }
	        };
	      } else {
	        resetMenuValue = function resetMenuValue(menuName) {
	          for (var j = 0; j < menuName.length; j++) {
	            if (menuName[j].name === button.name) {
	              menuName[j].value = "";
	            }
	          }
	        };
	      }

	      resetMenuValue(neighborTypes);
	      resetMenuValue(comparators);
	      resetMenuValue(comparisonValues);
	    }
	  }, {
	    key: "handleChanceSliders",
	    value: function handleChanceSliders(cellType) {
	      var _loop3 = function _loop3(i) {
	        var currentSlider = chanceSliders[i];
	        var currentOutput = chanceOutputs[i];
	        var currentConditionOption = conditionOptions[i];
	        var currentStatementContainer = conditionalStatementContainers[i];
	        var currentHashCondition = conditionalHash[cellType]['conditions'][currentSlider.name];
	        var conditionalArray = parseConditionalHashStatements(currentHashCondition);

	        var toggleConditionalStatements = function toggleConditionalStatements() {
	          if (currentSlider.value === '0') {
	            currentConditionOption.style.display = 'none';
	            currentStatementContainer.style.display = 'none';
	          } else {
	            currentConditionOption.style.display = 'flex';
	            currentStatementContainer.style.display = 'flex';
	          }
	        };

	        var updateOutput = function updateOutput() {
	          var originalValue = currentOutput.value;
	          var updatedCondition = conditionalHash[cellType]['conditions'][currentOutput.name].replace("Math.random() * 100 < " + originalValue, "Math.random() * 100 < " + currentSlider.value);

	          toggleConditionalStatements();
	          conditionalHash[cellType]['conditions'][currentOutput.name] = updatedCondition;
	          currentOutput.value = currentSlider.value;
	        };

	        var setSliderValues = function setSliderValues() {
	          conditionalArray.forEach(function (statement) {
	            if (statement.substring(0, 4) === 'Math') {
	              var percentage = statement.match(/\d+/g)[1];
	              currentSlider.value = percentage;
	              currentOutput.value = percentage;
	            }
	          });

	          if (currentSlider.value === '0') {
	            currentConditionOption.style.display = 'none';
	            currentStatementContainer.style.display = 'none';
	          }
	        };

	        toggleConditionalStatements();
	        setSliderValues();
	        currentSlider.oninput = updateOutput;
	      };

	      for (var i = 0; i < chanceSliders.length; i++) {
	        _loop3(i);
	      }
	    }
	  }, {
	    key: "handleSubmitEventListeners",
	    value: function handleSubmitEventListeners(cellType) {

	      var clearSubmitEventListeners = function clearSubmitEventListeners() {
	        for (var i = 0; i < conditionalSubmitButtons.length; i++) {
	          var currentButton = conditionalSubmitButtons[i];
	          var clone = currentButton.cloneNode();

	          while (currentButton.firstChild) {
	            clone.appendChild(currentButton.lastChild);
	          }
	          currentButton.parentNode.replaceChild(clone, currentButton);
	        }
	      };

	      var populateSubmitEventListeners = function populateSubmitEventListeners() {
	        var _loop4 = function _loop4(i) {
	          var currentButton = conditionalSubmitButtons[i];

	          currentButton.addEventListener('click', function () {
	            addStatementToConditionalHash(cellType, currentButton);
	            refreshConditionalStatements(cellType);
	            resetMenuValues(currentButton);
	          });
	        };

	        for (var i = 0; i < conditionalSubmitButtons.length; i++) {
	          _loop4(i);
	        }
	      };

	      clearSubmitEventListeners();
	      populateSubmitEventListeners();
	    }
	  }, {
	    key: "populateValidNeighborBoxes",
	    value: function populateValidNeighborBoxes(cellType) {
	      var resetNeighborBoxes = function resetNeighborBoxes() {
	        for (var i = 0; i < validNeighborBoxes.length; i++) {
	          var currentBox = validNeighborBoxes[i];
	          currentBox.checked = false;
	        }
	      };

	      resetNeighborBoxes();

	      var _loop5 = function _loop5(i) {
	        var currentBox = validNeighborBoxes[i];
	        var currentName = neighborTypeNames[i];

	        var getType = function getType() {
	          conditionalHash[cellType]['neighborHash'][currentBox.value] = currentBox.checked;
	        };

	        currentName.setAttribute("name", conditionalHash[currentBox.value].name);

	        currentBox.checked = conditionalHash[cellType]['neighborHash'][currentBox.value];
	        currentBox.onclick = function () {
	          return getType();
	        };
	      };

	      for (var i = 0; i < validNeighborBoxes.length; i++) {
	        _loop5(i);
	      }
	    }
	  }, {
	    key: "changeCellLogicModalType",
	    value: function changeCellLogicModalType(cellType) {

	      if (!container.pauseEvent) handlePauseEvent();

	      cellLogicModal.style.display = 'flex';
	      modalBackdrop.style.display = 'flex';
	      gridControls.style.display = 'none';

	      changeModalCellName(cellType);
	      populateConditionalDropdowns();
	      refreshConditionalStatements(cellType);
	      resetMenuValues();
	      handleChanceSliders(cellType);
	      handleSubmitEventListeners(cellType);
	      populateValidNeighborBoxes(cellType);
	    }
	  }]);

	  return CellLogicModal;
	}();

	exports.default = CellLogicModal;

/***/ })
/******/ ]);