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
	  var typeOneColor = document.getElementById("typeOneColor");
	  var typeTwoColor = document.getElementById("typeTwoColor");
	  var typeThreeColor = document.getElementById("typeThreeColor");
	  var falseCellColor = document.getElementById("falseCellColor");
	  var typeOneContainer = document.getElementById("typeOneContainer");
	  var typeTwoContainer = document.getElementById("typeTwoContainer");
	  var typeThreeContainer = document.getElementById("typeThreeContainer");

	  var cellLogicModal = document.getElementById("cellLogicModal");
	  var cellName = document.getElementById("cellName");
	  var cellColorContainer = document.getElementById("cellColorContainer");
	  var submitButton = document.getElementById("submitButton");

	  var skipCondition = document.getElementById("skipCondition");
	  var dieCondition = document.getElementById("dieCondition");
	  var stayCondition = document.getElementById("stayCondition");
	  var wanderCondition = document.getElementById("wanderCondition");
	  var reproduceCondition = document.getElementById("reproduceCondition");

	  var neighborTypes = document.getElementsByClassName("neighborTypes");
	  var comparators = document.getElementsByClassName("comparators");
	  var comparisonValues = document.getElementsByClassName("comparisonValues");
	  var conditionalStatements = document.getElementsByClassName("conditionalStatements");
	  var conditionalSubmitButtons = document.getElementsByClassName("conditionalSubmitButtons");

	  var neighborTypeOne = document.getElementById("neighborTypeOne");
	  var neighborTypeTwo = document.getElementById("neighborTypeTwo");
	  var neighborTypeThree = document.getElementById("neighborTypeThree");

	  var validNeighborBoxes = document.getElementsByClassName("validNeighborBox");

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
	        'skipCon': "false",
	        'dieCon': "false",
	        'stayCon': "validNeighbors.length === 0",
	        'wanderCon': "false",
	        'reproduceCon': "true"
	        // 'reproduceCon': `!typeHash['typeTwo'] && !typeHash['typeThree']`
	      },
	      'neighborHash': {
	        'typeOne': false,
	        'typeTwo': false,
	        'typeThree': false,
	        'false': true
	      }
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
	      'neighborHash': {
	        'typeOne': true,
	        'typeTwo': false,
	        'typeThree': false,
	        'false': true
	      }
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
	      'neighborHash': {
	        'typeOne': true,
	        'typeTwo': false,
	        'typeThree': false,
	        'false': true
	      }
	    },

	    'false': {
	      'name': '',
	      'color': 'rgba(255, 255, 255, 0)',
	      'conditions': {
	        'skipCon': "true",
	        'dieCon': "false",
	        'stayCon': "false",
	        'wanderCon': "false",
	        'reproduceCon': "false"
	      },
	      'neighborHash': {
	        'typeOne': false,
	        'typeTwo': false,
	        'typeThree': false,
	        'false': true
	      }
	    }
	  };

	  var container = new _container2.default(mainCanvas, mainCtx, conditionalHash);

	  mainCanvas.addEventListener('click', function (e) {
	    return container.handleClickEvent(e);
	  }, false);

	  // Color shift
	  document.body.addEventListener('keydown', function (e) {

	    if (cellLogicModal.style.display) return;

	    if (e.keyCode === 32) {
	      e.preventDefault();
	      playPauseButton.classList.toggle("fa-pause");
	      container.handlePauseEvent();
	    } else if (e.keyCode === 78) {
	      if (!container.pauseEvent) playPauseButton.classList.toggle("fa-pause");
	      container.handleNextFrameEvent();
	    } else if (e.keyCode === 82) {
	      container.handleResetEvent();
	    } else {
	      container.handleKeystrokeEvent(e);
	    }
	  });

	  // Modals

	  neighborTypeOne.innerText = conditionalHash['typeOne'].name;
	  neighborTypeTwo.innerText = conditionalHash['typeTwo'].name;
	  neighborTypeThree.innerText = conditionalHash['typeThree'].name;

	  modalBackdrop.addEventListener('click', function (e) {
	    if (e.target.id !== 'modal-backdrop') return;
	    if (container.pauseEvent) container.handlePauseEvent(e);
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
	  typeOneColor.style.background = conditionalHash['typeOne'].color;
	  typeTwoColor.style.background = conditionalHash['typeTwo'].color;
	  typeThreeColor.style.background = conditionalHash['typeThree'].color;

	  typeOneContainer.addEventListener('click', function (e) {
	    if (!container.pauseEvent) container.handlePauseEvent(e);

	    cellColorContainer.style.display = 'block';
	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";

	    cellName.value = conditionalHash['typeOne'].name;

	    var populateNeighborTypes = function populateNeighborTypes() {
	      for (var i = 0; i < neighborTypes.length; i++) {
	        var currentNeighborType = neighborTypes[i];
	        var currentValue = comparisonValues[i];

	        for (var j = 0; j < 3; j++) {
	          var currentNeighborOption = currentNeighborType.options[j];
	          var currentValueOption = currentValue.options[j];

	          currentNeighborOption.innerText = conditionalHash[currentNeighborOption.value].name;
	          currentValueOption.innerText = conditionalHash[currentValueOption.value].name;
	        }
	      }
	    };

	    var populateValidNeighborBoxes = function populateValidNeighborBoxes() {
	      var _loop = function _loop(i) {
	        var currentBox = validNeighborBoxes[i];
	        if (conditionalHash['typeOne']['neighborHash'][currentBox.value]) currentBox.checked = true;

	        currentBox.addEventListener('click', function () {
	          conditionalHash['typeOne']['neighborHash'][currentBox.value] = currentBox.checked;
	        });
	      };

	      for (var i = 0; i < validNeighborBoxes.length; i++) {
	        _loop(i);
	      }
	    };

	    var populateConditionalStatements = function populateConditionalStatements() {
	      for (var i = 0; i < conditionalStatements.length; i++) {
	        var currentStatement = conditionalStatements[i];
	        currentStatement.innerText = conditionalHash['typeOne']['conditions'][currentStatement.name];
	      }
	    };

	    var addConditionalSubmitButtons = function addConditionalSubmitButtons() {
	      var _loop2 = function _loop2(i) {
	        var currentButton = conditionalSubmitButtons[i];

	        currentButton.addEventListener('click', function () {

	          var subStrings = {
	            'skipCon': "",
	            'dieCon': "",
	            'stayCon': "",
	            'wanderCon': "",
	            'reproduceCon': ""
	          };

	          for (var j = 0; j < neighborTypes.length; j++) {
	            var currentNeighborType = neighborTypes[j];
	            var currentComparator = comparators[j];
	            var currentComparisonValue = comparisonValues[j];
	            subStrings[currentNeighborType.name] += "typeHash['" + currentNeighborType.value + "']";
	            subStrings[currentComparator.name] += " " + currentComparator.value;
	            subStrings[currentComparisonValue.name] += " " + currentComparisonValue.value;

	            conditionalHash['typeOne']['conditions'][currentButton.name] = subStrings[currentButton.name];
	          }

	          populateConditionalStatements();
	        });
	      };

	      for (var i = 0; i < conditionalSubmitButtons.length; i++) {
	        _loop2(i);
	      }
	    };

	    populateNeighborTypes();
	    populateConditionalStatements();
	    addConditionalSubmitButtons();
	    populateValidNeighborBoxes();

	    cellName.addEventListener('input', function () {
	      conditionalHash['typeOne'].name = cellName.value;
	      neighborTypeOne.innerText = conditionalHash['typeOne'].name;
	      typeOne.innerText = cellName.value;

	      populateNeighborTypes();
	    });

	    $(".basic").spectrum({
	      color: conditionalHash['typeOne'].color,
	      flat: true,
	      showInitial: true,
	      showButtons: false,
	      change: function change(color) {
	        conditionalHash['typeOne'].color = color.toHexString();
	        typeOneColor.style.background = color.toHexString();
	      }
	    });
	  });

	  typeTwoContainer.addEventListener('click', function (e) {

	    cellColorContainer.style.display = 'block';
	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";

	    cellName.value = conditionalHash['typeTwo'].name;

	    if (conditionalHash['typeTwo']['neighborHash']['typeOne']) neighborTypeOneBox.checked = true;
	    if (conditionalHash['typeTwo']['neighborHash']['typeTwo']) neighborTypeTwoBox.checked = true;
	    if (conditionalHash['typeTwo']['neighborHash']['typeThree']) neighborTypeThreeBox.checked = true;
	    if (conditionalHash['typeTwo']['neighborHash']['false']) neighborTypeFalseBox.checked = true;

	    cellName.addEventListener('blur', function () {
	      conditionalHash['typeTwo'].name = cellName.value;
	      neighborTypeTwo.innerText = conditionalHash['typeTwo'].name;
	      typeTwo.innerText = cellName.value;
	    });

	    $(".basic").spectrum({
	      color: conditionalHash['typeTwo'].color,
	      flat: true,
	      showInitial: true,
	      showButtons: false,
	      change: function change(color) {
	        conditionalHash['typeTwo'].color = color.toHexString();
	        typeTwoColor.style.background = color.toHexString();
	      }
	    });
	  });

	  typeThreeContainer.addEventListener('click', function (e) {

	    cellColorContainer.style.display = 'block';
	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";

	    cellName.value = conditionalHash['typeThree'].name;

	    if (conditionalHash['typeThree']['neighborHash']['typeOne']) neighborTypeOneBox.checked = true;
	    if (conditionalHash['typeThree']['neighborHash']['typeTwo']) neighborTypeTwoBox.checked = true;
	    if (conditionalHash['typeThree']['neighborHash']['typeThree']) neighborTypeThreeBox.checked = true;
	    if (conditionalHash['typeThree']['neighborHash']['false']) neighborTypeFalseBox.checked = true;

	    cellName.addEventListener('blur', function () {
	      conditionalHash['typeThree'].name = cellName.value;
	      neighborTypeOne.innerText = conditionalHash['typeThree'].name;
	      typeThree.innerText = cellName.value;
	    });

	    $(".basic").spectrum({
	      color: conditionalHash['typeThree'].color,
	      flat: true,
	      showInitial: true,
	      showButtons: false,
	      change: function change(color) {
	        conditionalHash['typeThree'].color = color.toHexString();
	        typeThreeColor.style.background = color.toHexString();
	      }
	    });
	  });

	  // Play Buttons
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
	    key: "handleKeystrokeEvent",
	    value: function handleKeystrokeEvent(e) {
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
	      console.log(color);
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
	    key: 'render',
	    value: function render() {
	      this.ctx.clearRect(this.x, this.y, this.cellSize, this.cellSize);

	      if (this.type === 'false') return;

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
	        cells[key].changeState(changingCells[key], conditionalHash[changingCells[key]].color);
	      });
	    }
	  }]);

	  return Automata;
	}();

	exports.default = Automata;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

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
	    key: 'random',
	    value: function random(array) {
	      return array[Math.floor(Math.random() * array.length)];
	    }
	  }, {
	    key: 'getValidNeighbors',
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
	    key: 'wander',
	    value: function wander(array) {
	      var nextCell = this.random(array);
	      this.changingCells[nextCell] = this.type;
	      this.changingCells[this.id] = 'false';
	    }
	  }, {
	    key: 'stay',
	    value: function stay() {
	      this.changingCells[this.id] = this.type;
	    }
	  }, {
	    key: 'reproduce',
	    value: function reproduce(array) {
	      var nextCell = this.random(array);
	      this.changingCells[nextCell] = this.type;
	    }
	  }, {
	    key: 'die',
	    value: function die() {
	      this.changingCells[this.id] = 'false';
	    }
	  }, {
	    key: 'live',
	    value: function live(conditionalHash) {
	      var _this = this;

	      if (this.changingCells[this.id]) return;

	      var type = this.type;
	      var typeHash = { "typeOne": 0, "typeTwo": 0, "typeThree": 0, "false": 0 };

	      var neighborTypes = Object.keys(conditionalHash[type]['neighborHash']);
	      var validNeighborTypes = neighborTypes.filter(function (neighborType) {
	        return conditionalHash[type]['neighborHash'][neighborType] === true;
	      });

	      var validNeighbors = this.getValidNeighbors(validNeighborTypes);

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