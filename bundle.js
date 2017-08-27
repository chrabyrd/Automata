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

	var _Container = __webpack_require__(1);

	var _Container2 = _interopRequireDefault(_Container);

	var _demoHash = __webpack_require__(16);

	var _demoHash2 = _interopRequireDefault(_demoHash);

	var _tutorial = __webpack_require__(7);

	var _GridControlBar = __webpack_require__(12);

	var _GridControlBar2 = _interopRequireDefault(_GridControlBar);

	var _CellControlBar = __webpack_require__(13);

	var _CellControlBar2 = _interopRequireDefault(_CellControlBar);

	var _CellLogicModal = __webpack_require__(10);

	var _CellLogicModal2 = _interopRequireDefault(_CellLogicModal);

	var _InformationModal = __webpack_require__(11);

	var _InformationModal2 = _interopRequireDefault(_InformationModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.addEventListener("DOMContentLoaded", function () {
	  var mainCanvas = document.getElementById("mainCanvas");
	  var mainCtx = mainCanvas.getContext("2d");

	  var container = new _Container2.default(mainCanvas, mainCtx, _demoHash2.default);

	  var informationModal = new _InformationModal2.default(container);
	  var cellControlBar = new _CellControlBar2.default(container, _demoHash2.default);
	  var cellLogicModal = new _CellLogicModal2.default(container);
	  var gridControlBar = new _GridControlBar2.default(container);

	  // cellControlBar.populateTypeContainers();
	  // informationModal.handleInformationModalBehavior();

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
	        // toggleUI();
	        break;
	      case 32:
	        // Spacebar
	        e.preventDefault();
	        // handlePauseEvent();
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
	        // toggleInformationModal();
	        break;
	      case 78:
	        // n
	        // handleNextFrameEvent();
	        break;
	      case 79:
	        // o
	        cellLogicModal.toggleCellLogicModal();
	        break;
	      case 82:
	        // r
	        // handleResetEvent();
	        break;
	    }
	  });
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Grid = __webpack_require__(20);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _Engine = __webpack_require__(21);

	var _Engine2 = _interopRequireDefault(_Engine);

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
	    this.board = new _Grid2.default(this.mainCtx, this.cellSize, this.width, this.height);
	    this.automata = new _Engine2.default(this.board);
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
	      this.board = new _Grid2.default(this.mainCtx, this.cellSize, this.width, this.height);
	      this.automata = new _Engine2.default(this.board);
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
	  }, {
	    key: "handlePauseEvent",
	    value: function handlePauseEvent() {
	      this.playPauseButton.classList.toggle("fa-pause");
	      this.playPauseButton.classList.add("fa-play");
	      this.container.handlePauseEvent();
	    }
	  }, {
	    key: "handleNextFrameEvent",
	    value: function handleNextFrameEvent() {
	      if (this.playPauseButton.classList.contains("fa-pause")) {
	        this.playPauseButton.classList.toggle("fa-pause");
	        this.playPauseButton.classList.add("fa-play");
	      }
	      this.container.handleNextFrameEvent();
	    }
	  }, {
	    key: "handleResetEvent",
	    value: function handleResetEvent() {
	      this.container.handleResetEvent();
	    }
	  }]);

	  return Container;
	}();

	exports.default = Container;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
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
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CellLogicModal = function () {
	  function CellLogicModal(container, conditionalHash) {
	    var _this = this;

	    _classCallCheck(this, CellLogicModal);

	    this.container = container;
	    this.conditionalHash = conditionalHash;

	    this.modalBackdrop = document.getElementById("modalBackdrop");
	    this.cellLogicModal = document.getElementById("cellLogicModal");

	    this.cellName = document.getElementById("cellName");

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
	    key: "changeModalCellName",
	    value: function changeModalCellName(cellType) {
	      this.cellName.innerText = this.conditionalHash[cellType].name + " Cell Behavior";
	    }
	  }, {
	    key: "populateValidNeighborBoxes",
	    value: function populateValidNeighborBoxes(cellType) {
	      var _this2 = this;

	      var resetNeighborBoxes = function resetNeighborBoxes() {
	        for (var i = 0; i < _this2.validNeighborBoxes.length; i++) {
	          var currentBox = _this2.validNeighborBoxes[i];
	          currentBox.checked = false;
	        }
	      };

	      resetNeighborBoxes();

	      var _loop = function _loop(i) {
	        var currentBox = _this2.validNeighborBoxes[i];
	        var currentName = _this2.neighborTypeNames[i];

	        var getType = function getType() {
	          this.conditionalHash[cellType]['neighborHash'][currentBox.value] = currentBox.checked;
	        };

	        currentName.setAttribute("name", _this2.conditionalHash[currentBox.value].name);

	        currentBox.checked = _this2.conditionalHash[cellType]['neighborHash'][currentBox.value];
	        currentBox.onclick = function () {
	          return getType();
	        };
	      };

	      for (var i = 0; i < this.validNeighborBoxes.length; i++) {
	        _loop(i);
	      }
	    }
	  }, {
	    key: "changeCellLogicModalType",
	    value: function changeCellLogicModalType(cellType) {

	      if (!this.container.pauseEvent) this.container.handlePauseEvent();

	      // cellLogicModal.style.display = 'flex';
	      // modalBackdrop.style.display = 'flex';
	      // gridControls.style.display = 'none';
	      //
	      // changeModalCellName(cellType);
	      // populateConditionalDropdowns();
	      // refreshConditionalStatements(cellType);
	      // resetMenuValues();
	      // handleChanceSliders(cellType);
	      // handleSubmitEventListeners(cellType);
	      // populateValidNeighborBoxes(cellType);
	    }
	  }]);

	  return CellLogicModal;
	}();

	exports.default = CellLogicModal;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InformationModal = function () {
	  function InformationModal(container) {
	    _classCallCheck(this, InformationModal);

	    this.container = container;
	    this.informationModalBackdrop = document.getElementById("informationModalBackdrop");
	    this.informationModal = document.getElementById("informationModal");
	    this.demoButton = document.getElementById("demoButton");
	    this.newGridButton = document.getElementById("newGridButton");

	    this.informationModal.style.display = 'none';
	    this.informationModalBackdrop.style.display = 'none';
	  }

	  _createClass(InformationModal, [{
	    key: "toggleInformationModal",
	    value: function toggleInformationModal() {
	      if (!this.container.pauseEvent) this.container.handlePauseEvent();

	      // modalBackdrop.style.display = 'none';
	      this.informationModalBackdrop.style.display = 'flex';
	      this.informationModal.style.display = 'flex';
	      // cellLogicControls.style.zIndex = 0;
	    }
	  }, {
	    key: "handleInformationModalBehavior",
	    value: function handleInformationModalBehavior() {
	      var _this = this;

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
	          _this.informationModalBackdrop.appendChild(box);

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

	      // const changeHash = hash => {
	      //   conditionalHash = hash;
	      //   container = new Container(mainCanvas, mainCtx, conditionalHash);
	      //
	      //   const populateGridDimensions = () => {
	      //     const possibleDimensions = container.gridDimensions.sort((a, b) => a - b);
	      //
	      //     possibleDimensions.reverse().forEach(num => {
	      //       const widthOption = document.createElement('option');
	      //       widthOption.value = num;
	      //       widthOption.text = num;
	      //
	      //       const heightOption = document.createElement('option');
	      //       heightOption.value = num;
	      //       heightOption.text = num;
	      //
	      //       currentWidth.add(widthOption);
	      //       currentHeight.add(heightOption);
	      //     });
	      //
	      //     currentWidth.value = container.width;
	      //     currentHeight.value = container.height;
	      //   };
	      //
	      //   informationModal.style.display = 'none';
	      //   informationModalBackdrop.style.display = 'none';
	      //   gridControls.style.display = 'flex';
	      //
	      //   clearInterval(particleEffect, 40);
	      //
	      //   handleResetEvent();
	      //   cellControlBar.populateTypeContainers();
	      //   populateGridDimensions();
	      //   cellControlBar.showCellTypeContainers();
	      // };

	      setInterval(particleEffect, 40);
	    }
	  }]);

	  return InformationModal;
	}();

	exports.default = InformationModal;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GridControlBar = function () {
	  function GridControlBar(container) {
	    _classCallCheck(this, GridControlBar);

	    this.container = container;
	    this.mainCanvas = document.getElementById("mainCanvas");

	    this.playPauseButton = document.getElementById("playPauseButton");
	    this.nextFrameButton = document.getElementById("nextFrameButton");
	    this.resetButton = document.getElementById("resetButton");

	    this.speedSlider = document.getElementById("speedSlider");
	    this.cellSizeDropdown = document.getElementById("cellSizeDropdown");
	    this.currentWidth = document.getElementById("currentWidth");
	    this.currentHeight = document.getElementById("currentHeight");

	    this.informationButton = document.getElementById("informationButton");
	  }

	  _createClass(GridControlBar, [{
	    key: "handlePauseEvent",
	    value: function handlePauseEvent() {
	      this.playPauseButton.classList.toggle("fa-pause");
	      this.playPauseButton.classList.add("fa-play");
	      this.container.handlePauseEvent();
	    }
	  }, {
	    key: "handleNextFrameEvent",
	    value: function handleNextFrameEvent() {
	      if (this.playPauseButton.classList.contains("fa-pause")) {
	        this.playPauseButton.classList.toggle("fa-pause");
	        this.playPauseButton.classList.add("fa-play");
	      }
	      this.container.handleNextFrameEvent();
	    }
	  }, {
	    key: "handleResetEvent",
	    value: function handleResetEvent() {
	      this.container.handleResetEvent();
	    }
	  }, {
	    key: "toggleInformationModal",
	    value: function toggleInformationModal() {
	      if (!this.container.pauseEvent) this.handlePauseEvent();

	      this.modalBackdrop.style.display = 'none';
	      this.informationModalBackdrop.style.display = 'flex';
	      this.informationModal.style.display = 'flex';
	      // this.cellLogicControls.style.zIndex = 0;
	    }
	  }, {
	    key: "handleSpeedChangeEvent",
	    value: function handleSpeedChangeEvent() {
	      this.container.handleSpeedChangeEvent(300 - this.speedSlider.value);
	    }
	  }, {
	    key: "handleCellResizeEvent",
	    value: function handleCellResizeEvent() {
	      this.container.handleCellResizeEvent(this.cellSizeDropdown.value);
	    }
	  }, {
	    key: "handleResizeWidthEvent",
	    value: function handleResizeWidthEvent() {
	      this.container.handleResizeEvent('width', parseInt(this.currentWidth.value));
	    }
	  }, {
	    key: "handleResizeHeightEvent",
	    value: function handleResizeHeightEvent() {
	      this.container.handleResizeEvent('height', parseInt(this.currentHeight.value));
	    }
	  }, {
	    key: "addListeners",
	    value: function addListeners() {
	      this.playPauseButton.addEventListener('click', this.handlePauseEvent);
	      this.nextFrameButton.addEventListener('click', this.handleNextFrameEvent);
	      this.resetButton.addEventListener('click', this.handleResetEvent);
	      this.speedSlider.addEventListener('change', this.handleSpeedChangeEvent);
	      this.cellSizeDropdown.addEventListener('change', this.handleCellResizeEvent);
	      this.currentWidth.addEventListener('change', this.handleResizeWidthEvent);
	      this.currentHeight.addEventListener('change', this.handleResizeHeightEvent);
	      this.informationButton.addEventListener('click', this.toggleInformationModal);
	    }
	  }]);

	  return GridControlBar;
	}();

	exports.default = GridControlBar;

/***/ }),
/* 13 */
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

	    this.populateTypeContainers = this.populateTypeContainers.bind(this);
	    this.populateColorPickers = this.populateColorPickers.bind(this);
	    this.handleCellNames = this.handleCellNames.bind(this);

	    this.populateTypeContainers();
	  }

	  _createClass(CellControlBar, [{
	    key: "populateTypeContainers",
	    value: function populateTypeContainers() {
	      var _this = this;

	      this.handleCellNames();
	      this.populateColorPickers();
	      // this.hideCellTypeContainers();

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
/* 14 */,
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var demoHash = {
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

	exports.default = demoHash;

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Cell = __webpack_require__(19);

	var _Cell2 = _interopRequireDefault(_Cell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Grid = function () {
	  function Grid(ctx, cellSize, gridWidth, gridHeight) {
	    _classCallCheck(this, Grid);

	    this.ctx = ctx;
	    this.cells = [];
	    this.populateGrid(cellSize, gridWidth, gridHeight);
	  }

	  _createClass(Grid, [{
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
	          this.cells.push(new _Cell2.default(this.ctx, gridWidth, gridHeight, cellSize, id, x, y));
	          x += cellSize;
	          id++;
	        }

	        y += cellSize;
	      }
	    }
	  }]);

	  return Grid;
	}();

	exports.default = Grid;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _cellLogic = __webpack_require__(15);

	var _cellLogic2 = _interopRequireDefault(_cellLogic);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Engine = function () {
	  function Engine(board) {
	    _classCallCheck(this, Engine);

	    this.board = board;
	    this.livingCells = {};
	    this.changingCells = {};
	    this.dyingCells = [];
	  }

	  _createClass(Engine, [{
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

	  return Engine;
	}();

	exports.default = Engine;

/***/ })
/******/ ]);