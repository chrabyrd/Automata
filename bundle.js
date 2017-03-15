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

	var _container = __webpack_require__(1);

	var _container2 = _interopRequireDefault(_container);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.addEventListener("DOMContentLoaded", function () {
	  var mainCanvas = document.getElementById("mainCanvas");
	  var mainCtx = mainCanvas.getContext("2d");

	  var modalBackdrop = document.getElementById("modal-backdrop");

	  var typeOne = document.getElementById("typeOne");
	  var typeTwo = document.getElementById("typeTwo");
	  var typeThree = document.getElementById("typeThree");
	  var falseCell = document.getElementById("falseCell");
	  var typeOneColor = document.getElementById("typeOneColor");
	  var typeTwoColor = document.getElementById("typeTwoColor");
	  var typeThreeColor = document.getElementById("typeThreeColor");
	  var falseCellColor = document.getElementById("falseCellColor");
	  var typeOneContainer = document.getElementById("typeOneContainer");
	  var typeTwoContainer = document.getElementById("typeTwoContainer");
	  var typeThreeContainer = document.getElementById("typeThreeContainer");
	  var falseCellContainer = document.getElementById("falseCellContainer");

	  var cellLogicModal = document.getElementById("cellLogicModal");
	  var cellName = document.getElementById("cellName");
	  var cellColor = document.getElementById("cellColor");
	  var submitButton = document.getElementById("submitButton");

	  var playPauseButton = document.getElementById("playPauseButton");
	  var nextFrameButton = document.getElementById("nextFrameButton");
	  var resetButton = document.getElementById("resetButton");

	  var faster = document.getElementById("faster");
	  var currentSpeed = document.getElementById("currentSpeed");
	  var speedDropdown = document.getElementById("speedDropdown");
	  var speedDropdownContainer = document.getElementById("speedDropdownContainer");
	  var slower = document.getElementById("slower");

	  var gridDropdownContainer = document.getElementById("gridDropdownContainer");
	  var widthDropdownContainer = document.getElementById("widthDropdownContainer");
	  var heightDropdownContainer = document.getElementById("heightDropdownContainer");
	  var widthDropdown = document.getElementById("widthDropdown");
	  var heightDropdown = document.getElementById("heightDropdown");
	  var gridSizeContainer = document.getElementById("gridSizeContainer");
	  var currentWidth = document.getElementById("currentWidth");
	  var currentHeight = document.getElementById("currentHeight");

	  var cellSize = document.getElementById("cellSize");
	  var cellSizeDropdown = document.getElementById("cellSizeDropdown");
	  var cellSizeDropdownContainer = document.getElementById("cellSizeDropdownContainer");

	  var rulesButton = document.getElementById("rulesButton");
	  var rulesModal = document.getElementById("rulesModal");
	  var openerModal = document.getElementById("openerModal");

	  var conditionalHash = {
	    'typeOne': {
	      'name': 'Type One',
	      'color': 'green',
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
	      'name': 'Type Two',
	      'color': 'blue',
	      'conditions': {
	        'skipCon': "false",
	        'dieCon': "!typeHash['typeOne']",
	        'stayCon': "validNeighbors.length === 0",
	        'wanderCon': "true",
	        'reproduceCon': "typeHash[type] && Math.floor(Math.random() * 2) === 0"
	      },
	      'neighborArray': [false, 'typeOne']
	    },

	    'typeThree': {
	      'name': 'Type Three',
	      'color': 'purple',
	      'conditions': {
	        'skipCon': "false",
	        'dieCon': "!typeHash['typeOne']",
	        'stayCon': "validNeighbors.length === 0",
	        'wanderCon': "true",
	        'reproduceCon': "typeHash[type] && Math.floor(Math.random() * 2) === 0"
	      },
	      'neighborArray': [false, 'typeOne']
	    },

	    'false': {
	      'name': 'False Cell',
	      'color': 'brown',
	      'conditions': {
	        'skipCon': "true",
	        'dieCon': "false",
	        'stayCon': "false",
	        'wanderCon': "false",
	        'reproduceCon': "false"
	      },
	      'neighborArray': [false]
	    }
	  };

	  var container = new _container2.default(mainCanvas, mainCtx, conditionalHash);

	  mainCanvas.addEventListener('click', function (e) {
	    return container.handleClickEvent(e);
	  }, false);

	  // Color shift
	  document.body.addEventListener('keydown', function (e) {
	    container.toggleColor(e);
	  });

	  // Modal Backdrop
	  modalBackdrop.addEventListener('click', function (e) {
	    if (e.target.id !== 'modal-backdrop') return;
	    speedDropdown.innerHTML = "";
	    cellSizeDropdown.innerHTML = "";
	    widthDropdown.innerHTML = "";
	    heightDropdown.innerHTML = "";
	    speedDropdownContainer.style.display = null;
	    cellSizeDropdownContainer.style.display = null;
	    widthDropdownContainer.style.display = null;
	    heightDropdownContainer.style.display = null;
	    gridDropdownContainer.style.display = null;
	    cellLogicModal.style.display = null;
	    modalBackdrop.style.display = null;
	  });

	  // Cell Logic Bar
	  typeOne.innerText = conditionalHash['typeOne'].name;
	  typeTwo.innerText = conditionalHash['typeTwo'].name;
	  typeThree.innerText = conditionalHash['typeThree'].name;
	  falseCell.innerText = conditionalHash['false'].name;
	  typeOneColor.style.background = conditionalHash['typeOne'].color;
	  typeTwoColor.style.background = conditionalHash['typeTwo'].color;
	  typeThreeColor.style.background = conditionalHash['typeThree'].color;
	  falseCellColor.style.background = conditionalHash['false'].color;

	  var currentType = void 0;

	  typeOneContainer.addEventListener('click', function (e) {
	    console.log(e);
	    currentType = 'typeOne';
	    cellName.value = typeOne.innerText;
	    cellColor.style.background = typeOneColor.style.background;
	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";
	  });

	  typeTwoContainer.addEventListener('click', function (e) {
	    currentType = 'typeTwo';
	    cellName.value = typeTwo.innerText;
	    cellColor.style.background = typeTwoColor.style.background;
	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";
	  });

	  typeThreeContainer.addEventListener('click', function (e) {
	    currentType = 'typeThree';
	    cellName.value = typeThree.innerText;
	    cellColor.style.background = typeThreeColor.style.background;
	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";
	  });

	  falseCellContainer.addEventListener('click', function (e) {
	    currentType = 'false';
	    cellName.value = falseCell.innerText;
	    cellColor.style.background = falseCellColor.style.background;
	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";
	  });

	  // Cell Logic Modal
	  cellLogicModal.addEventListener('click', function (e) {
	    console.log(e);
	  });

	  submitButton.addEventListener('click', function (e) {
	    conditionalHash[currentType].name = cellName.value;
	    typeOne.innerText = conditionalHash['typeOne'].name;
	    typeTwo.innerText = conditionalHash['typeTwo'].name;
	    typeThree.innerText = conditionalHash['typeThree'].name;
	    falseCell.innerText = conditionalHash['false'].name;
	  });

	  // Play Buttons
	  document.body.addEventListener('keydown', function (e) {
	    if (e.keyCode === 32) {
	      e.preventDefault();
	      playPauseButton.classList.toggle("fa-pause");
	      container.handlePauseEvent(e);
	    } else if (e.keyCode === 78) {
	      if (!container.pauseEvent) playPauseButton.classList.toggle("fa-pause");
	      container.handleNextFrameEvent(e);
	    } else if (e.keyCode === 82) {
	      container.handleResetEvent();
	    }
	  });

	  playPauseButton.addEventListener('click', function (e) {
	    playPauseButton.classList.toggle("fa-pause");
	    container.handlePauseEvent(e);
	  });

	  nextFrameButton.addEventListener('click', function (e) {
	    container.handleNextFrameEvent(e);
	  });

	  resetButton.addEventListener('click', function (e) {
	    container.handleResetEvent(e);
	  });

	  // Speed
	  faster.addEventListener('click', function (e) {
	    container.handleSpeedChangeEvent(container.drawspeed - 1);
	    currentSpeed.innerHTML = (1000 / container.drawspeed).toFixed(2);
	  });

	  slower.addEventListener('click', function (e) {
	    container.handleSpeedChangeEvent(container.drawspeed + 1);
	    currentSpeed.innerHTML = (1000 / container.drawspeed).toFixed(2);
	  });

	  currentSpeed.addEventListener('click', function (e) {
	    container.validDrawspeeds.forEach(function (num) {
	      speedDropdown.innerHTML += "<li>" + num + "</li>";
	    });

	    speedDropdownContainer.style.display = "flex";
	    gridDropdownContainer.style.display = "flex";
	    modalBackdrop.style.display = "flex";
	  });

	  speedDropdown.addEventListener('click', function (e) {
	    container.handleSpeedChangeEvent(1000 / e.target.innerHTML);
	    currentSpeed.innerHTML = e.target.innerHTML;
	    speedDropdown.innerHTML = "";
	    speedDropdown.style.display = null;
	    modalBackdrop.style.display = null;
	  });

	  // Grid Size
	  currentWidth.innerHTML = container.width;
	  currentHeight.innerHTML = container.height;

	  gridSizeContainer.addEventListener('click', function (e) {
	    var gridDimensions = container.gridDimensions.sort(function (a, b) {
	      return a - b;
	    });

	    gridDimensions.forEach(function (num) {
	      widthDropdown.innerHTML += "<li>" + num + "</li>";
	      heightDropdown.innerHTML += "<li>" + num + "</li>";
	    });

	    widthDropdownContainer.style.display = "flex";
	    heightDropdownContainer.style.display = "flex";
	    gridDropdownContainer.style.display = "flex";
	    modalBackdrop.style.display = "flex";
	  });

	  widthDropdown.addEventListener('click', function (e) {
	    container.handleResizeEvent('width', e.target.innerHTML);
	    currentWidth.innerHTML = e.target.innerHTML;
	    widthDropdown.innerHTML = "";
	    widthDropdown.style.display = null;
	    modalBackdrop.style.display = null;
	  });

	  heightDropdown.addEventListener('click', function (e) {
	    container.handleResizeEvent('height', e.target.innerHTML);
	    currentHeight.innerHTML = e.target.innerHTML;
	    heightDropdown.innerHTML = "";
	    heightDropdown.style.display = null;
	    modalBackdrop.style.display = null;
	  });

	  // Cell Size
	  cellSize.addEventListener('click', function (e) {
	    container.cellSizes.forEach(function (num) {
	      cellSizeDropdown.innerHTML += "<li>" + num + "</li>";
	    });

	    cellSizeDropdownContainer.style.display = "flex";
	    gridDropdownContainer.style.display = "flex";
	    modalBackdrop.style.display = "flex";
	  });

	  cellSizeDropdown.addEventListener('click', function (e) {
	    container.handleCellResizeEvent(parseInt(e.target.innerHTML));
	    cellSize.innerHTML = e.target.innerHTML;
	    cellSizeDropdown.innerHTML = "";
	    cellSizeDropdown.style.display = null;
	    modalBackdrop.style.display = null;
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

	var Container = function () {
	  function Container(mainCanvas, mainCtx, conditionalHash) {
	    _classCallCheck(this, Container);

	    this.mainCanvas = mainCanvas;
	    this.mainCtx = mainCtx;
	    this.conditionalHash = conditionalHash;
	    this.gridDimensions = [];
	    this.validDrawspeeds = [];
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
	    this.populateValidDrawspeeds();
	    this.handlePlayEvent();
	  }

	  _createClass(Container, [{
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
	    key: "populateValidDrawspeeds",
	    value: function populateValidDrawspeeds() {
	      for (var i = 1; i <= 200; i++) {
	        this.validDrawspeeds.push((1000 / i).toFixed(2));
	      }
	    }
	  }, {
	    key: "handleClickEvent",
	    value: function handleClickEvent(e) {
	      var color = this.conditionalHash[this.cellType].color;
	      this.board.toggleCell(e, this.cellType, color);
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
	      this.cellSize = size;
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
	    value: function toggleCell(e, type, color) {
	      var clickedCell = this.cells.find(function (cell) {
	        if (e.offsetX >= cell.xmin && e.offsetX <= cell.xmax) {
	          if (e.offsetY >= cell.ymin && e.offsetY <= cell.ymax) {
	            return cell;
	          }
	        }
	      });

	      clickedCell.changeState(type, color);
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

	"use strict";

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

	    this.color = null;

	    this.getNeighbors(gridWidth, gridHeight, cellSize);
	    this.render();
	  }

	  _createClass(Cell, [{
	    key: "changeState",
	    value: function changeState(type, color) {
	      this.type = type;
	      this.color = color;
	      this.render();
	    }
	  }, {
	    key: "getNeighbors",
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
	    key: "render",
	    value: function render() {
	      this.ctx.clearRect(this.x, this.y, this.cellSize, this.cellSize);

	      if (!this.type) return;

	      this.ctx.fillStyle = this.color;
	      this.ctx.fillRect(this.x, this.y, this.cellSize, this.cellSize);
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

	var _cellLogic = __webpack_require__(5);

	var _cellLogic2 = _interopRequireDefault(_cellLogic);

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
	        var cellLogic = new _cellLogic2.default(cells, changingCells, id);
	        cellLogic.live(conditionalHash);
	      });

	      Object.keys(changingCells).forEach(function (key) {
	        cells[key].changeState(changingCells[key]);
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CellLogic = function () {
	  function CellLogic(cellList, changingCells, id) {
	    _classCallCheck(this, CellLogic);

	    this.id = id;
	    this.changingCells = changingCells;
	    this.cells = cellList;
	    this.cellNeighbors = this.cells[id].neighbors;
	    this.type = this.cells[id].type;
	  }

	  _createClass(CellLogic, [{
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

	      validNeighbors = validNeighbors.filter(function (neighbor) {
	        var isValid = false;
	        cellTypeArray.forEach(function (type) {
	          if (cells[neighbor].type === type && !changingCells[neighbor]) {
	            isValid = true;
	          }
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
	      var _this = this;

	      if (this.changingCells[this.id]) return;

	      var type = this.type;
	      var typeHash = { "typeOne": 0, "typeTwo": 0, "typeThree": 0, "false": 0 };
	      var validNeighbors = this.getValidNeighbors(conditionalHash[type]['neighborArray']);

	      this.cellNeighbors.forEach(function (num) {
	        typeHash[_this.cells[num].type]++;
	      });

	      if (eval(conditionalHash[type]['conditions']['skipCon'])) {
	        return;
	      } else if (eval(conditionalHash[type]['conditions']['dieCon'])) {
	        this.die();
	      } else if (eval(conditionalHash[type]['conditions']['stayCon'])) {
	        this.stay();
	      } else if (eval(conditionalHash[type]['conditions']['reproduceCon'])) {
	        this.reproduce(validNeighbors);
	      } else if (eval(conditionalHash[type]['conditions']['wanderCon'])) {
	        this.wander(validNeighbors);
	      }
	    }
	  }]);

	  return CellLogic;
	}();

	exports.default = CellLogic;

/***/ }
/******/ ]);