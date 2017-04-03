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

	  var cellLogicModal = document.getElementById("cellLogicModal");
	  var modalBackdrop = document.getElementById("modal-backdrop");

	  var cellLogicTypes = document.getElementsByClassName("cellLogicTypes");
	  var cellLogicColors = document.getElementsByClassName("cellLogicColors");
	  var cellTypeContainers = document.getElementsByClassName("cellTypeContainers");

	  var cellName = document.getElementById("cellName");
	  var cellColorContainer = document.getElementById("cellColorContainer");

	  var neighborTypes = document.getElementsByClassName("neighborTypes");
	  var comparators = document.getElementsByClassName("comparators");
	  var comparisonValues = document.getElementsByClassName("comparisonValues");
	  var conditionalStatements = document.getElementsByClassName("conditionalStatements");
	  var sliderContainers = document.getElementsByClassName("sliderContainers");
	  var chanceSliders = document.getElementsByClassName("chanceSliders");
	  var chanceOutputs = document.getElementsByClassName("chanceOutputs");
	  var conditionalSubmitButtons = document.getElementsByClassName("conditionalSubmitButtons");

	  var neighborTypeNames = document.getElementsByClassName("neighborTypeNames");
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

	  var conditionalHash = {
	    'typeOne': {
	      'name': 'Grass',
	      'color': 'green',
	      'conditions': {
	        'skipCon': "false && Math.random() * 100 < 100 && Math.random() * 100 < 100",
	        'dieCon': "false && Math.random() * 100 < 100 && Math.random() * 100 < 100",
	        'stayCon': "validNeighbors.length === 0 && Math.random() * 100 < 100 && Math.random() * 100 < 100",
	        'wanderCon': "false && Math.random() * 100 < 100 && Math.random() * 100 < 100",
	        'reproduceCon': "true && Math.random() * 100 < 100 && Math.random() * 100 < 100"
	      },
	      'neighborHash': {
	        'typeOne': false,
	        'typeTwo': false,
	        'typeThree': false,
	        'false': true
	      }
	    },

	    'typeTwo': {
	      'name': 'Cow',
	      'color': 'blue',
	      'conditions': {
	        'skipCon': "false && Math.random() * 100 < 100",
	        'dieCon': "typeHash['typeOne'] === 0 && Math.random() * 100 < 100",
	        'stayCon': "validNeighbors.length === 0 && Math.random() * 100 < 100",
	        'wanderCon': "true && Math.random() * 100 < 100",
	        'reproduceCon': "typeHash['typeTwo'] > 0 && Math.random() * 100 < 50"
	      },
	      'neighborHash': {
	        'typeOne': true,
	        'typeTwo': false,
	        'typeThree': false,
	        'false': true
	      }
	    },

	    'typeThree': {
	      'name': 'Sheep',
	      'color': 'purple',
	      'conditions': {
	        'skipCon': "false && Math.random() * 100 < 100",
	        'dieCon': "typeHash['typeOne'] === 0 && Math.random() * 100 < 100",
	        'stayCon': "validNeighbors.length === 0 && Math.random() * 100 < 100",
	        'wanderCon': "true && Math.random() * 100 < 100",
	        'reproduceCon': "typeHash['typeThree'] > 0 && Math.random() * 100 < 50"
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
	  var updateCellLogicColors = function updateCellLogicColors() {
	    for (var i = 0; i < cellLogicColors.length; i++) {
	      var currentColor = cellLogicColors[i];
	      var currentType = cellLogicTypes[i];

	      currentColor.style.background = conditionalHash[currentType.id].color;
	    }
	  };

	  var updateCellLogicNames = function updateCellLogicNames(cellType) {
	    for (var i = 0; i < cellLogicTypes.length; i++) {
	      var currentType = cellLogicTypes[i];

	      currentType.innerText = conditionalHash[currentType.id].name;
	    }
	  };

	  var changeCellColor = function changeCellColor(cellType) {
	    $(".basic").spectrum({
	      color: conditionalHash[cellType].color,
	      flat: true,
	      showInitial: true,
	      showButtons: false,
	      change: function change(color) {
	        conditionalHash[cellType].color = color.toHexString();
	        updateCellLogicColors();
	      }
	    });
	  };

	  var removeNameEventListeners = function removeNameEventListeners() {
	    var clone = cellName.cloneNode();

	    while (cellName.firstChild) {
	      clone.appendChild(cellName.lastChild);
	    }

	    cellName.parentNode.replaceChild(clone, cellName);
	    cellName = clone;
	  };

	  var handleNameChange = function handleNameChange(cellType) {

	    removeNameEventListeners();

	    cellName.value = conditionalHash[cellType].name;

	    var updateName = function updateName() {
	      conditionalHash[cellType].name = cellName.value;
	      updateCellLogicNames(cellType);
	      refreshConditionalStatements(cellType);
	      populateConditionalDropdowns();
	      populateValidNeighborBoxes(cellType);
	    };

	    cellName.addEventListener('input', updateName);
	  };

	  var translateStatement = function translateStatement(string) {
	    var translationHash = {
	      // "&&": `AND`,
	      // "||": `OR`,
	      "typeHash['typeOne']": "" + conditionalHash['typeOne'].name,
	      "typeHash['typeTwo']": "" + conditionalHash['typeTwo'].name,
	      "typeHash['typeThree']": "" + conditionalHash['typeThree'].name,
	      "validNeighbors.length": "Valid Cells",
	      "totalNeighbors.length": "Total Cells"
	    };

	    var filteredString = string.split(' ').map(function (str) {
	      if (Object.keys(translationHash).includes(str)) {
	        str = translationHash[str];
	      }
	      return str;
	    });

	    var valueArray = parseConditionalHashStatements(filteredString.join(' '));

	    var filteredArray = valueArray.filter(function (statement) {
	      if (statement.substring(0, 4) !== 'Math') return statement;
	    });

	    return filteredArray.join(' ');
	  };

	  var populateConditionalDropdowns = function populateConditionalDropdowns() {

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
	  };

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

	  var parseConditionalHashStatements = function parseConditionalHashStatements(condition) {
	    var andOperator = parseConditionalValues(condition, '&&');
	    var bothOperators = andOperator.map(function (value) {
	      return parseConditionalValues(value, '||');
	    });

	    return flatten(bothOperators);
	  };

	  var refreshConditionalStatements = function refreshConditionalStatements(cellType) {
	    for (var i = 0; i < conditionalStatements.length; i++) {
	      conditionalStatements[i].innerHTML = "";
	    }
	    populateConditionalStatements(cellType);
	  };

	  var populateConditionalStatements = function populateConditionalStatements(cellType) {
	    var _loop = function _loop(i) {
	      var currentStatement = conditionalStatements[i];
	      var currentOutput = chanceOutputs[i];
	      var currentSliderContainer = sliderContainers[i];
	      var conditionalStatement = conditionalHash[cellType]['conditions'][currentStatement.id];
	      var conditionalStatementArray = parseConditionalHashStatements(conditionalStatement);

	      var _loop2 = function _loop2(j) {
	        var statement = conditionalStatementArray[j];

	        if (statement === "") return "continue";

	        var li = document.createElement("li");
	        var andButton = document.createElement("button");
	        var orButton = document.createElement("button");
	        var deleteButton = document.createElement("button");

	        var mapButtonBehavior = function mapButtonBehavior(button, symbol) {
	          var statementArray = statement.split(' ');
	          var conditionalArray = conditionalHash[cellType]['conditions'][currentStatement.id].split(' ');

	          var removeStatementFromConditionalHash = function removeStatementFromConditionalHash(conditionalHashStatement) {
	            conditionalArray = conditionalStatement.replace("" + conditionalHashStatement, "").split(' ');

	            conditionalArray = conditionalArray.filter(function (str) {
	              return str !== "";
	            });

	            if (conditionalArray[0] === '&&' || conditionalArray[0] === '||') {
	              conditionalArray.shift();
	            }

	            if (conditionalArray[0] === 'Math.random()') {
	              conditionalArray[conditionalArray.length - 1] = "100";
	              conditionalArray.unshift('false &&');
	              currentOutput.value = 100;
	              currentSliderContainer.style.display = "none";
	            }

	            conditionalHash[cellType]['conditions'][currentStatement.id] = conditionalArray.join(' ');
	          };

	          button.innerText = "" + symbol;

	          button.addEventListener('click', function () {
	            for (var k = 0; k < conditionalArray.length; k++) {
	              var conditionalSlice = conditionalArray.slice(k, k + statementArray.length);
	              var conditionalSliceStatement = conditionalSlice.join(' ');
	              var operatorIndex = k + conditionalSlice.length - 1;

	              if (conditionalSlice.join(' ') === statement) {

	                if (symbol === 'Delete') {
	                  removeStatementFromConditionalHash(conditionalSliceStatement);
	                } else {
	                  conditionalArray[operatorIndex] = "" + symbol;
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

	        mapButtonBehavior(andButton, '&&');
	        mapButtonBehavior(orButton, '||');
	        mapButtonBehavior(deleteButton, 'Delete');

	        if (j === conditionalStatementArray.length - 2) {
	          li.appendChild(document.createTextNode(simplifyStatement(translateStatement(statement))));
	          if (li.innerText !== 'false') li.appendChild(deleteButton);
	        } else {
	          li.appendChild(document.createTextNode(translateStatement(statement)));

	          var lastChar = statement.charAt(statement.length - 1);
	          lastChar === '&' ? li.appendChild(orButton) : li.appendChild(andButton);
	          li.appendChild(deleteButton);
	        }

	        if (j !== conditionalStatementArray.length - 1) currentStatement.appendChild(li);
	      };

	      for (var j = 0; j < conditionalStatementArray.length; j++) {
	        var _ret2 = _loop2(j);

	        if (_ret2 === "continue") continue;
	      }
	    };

	    for (var i = 0; i < conditionalStatements.length; i++) {
	      _loop(i);
	    }
	  };

	  var addStatementToConditionalHash = function addStatementToConditionalHash(cellType, button) {
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

	      if (currentCondition.substring(0, 5) === 'false') {
	        conditionalHash[cellType]['conditions'][button.name] = currentCondition.substring(9, currentCondition.length);
	      }

	      conditionalHash[cellType]['conditions'][button.name] += " && " + returnString;
	    };

	    addReturnStringToConditionalHash();
	    handleChanceSliders(cellType);
	  };

	  var resetMenuValues = function resetMenuValues() {
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
	  };

	  var removeChanceEventListeners = function removeChanceEventListeners() {
	    for (var i = 0; i < chanceSliders.length; i++) {
	      var currentSlider = chanceSliders[i];
	      var clone = currentSlider.cloneNode();

	      while (currentSlider.firstChild) {
	        clone.appendChild(currentSlider.lastChild);
	      }
	      currentSlider.parentNode.replaceChild(clone, currentSlider);
	    }
	  };

	  var handleChanceSliders = function handleChanceSliders(cellType) {

	    removeChanceEventListeners();

	    var _loop3 = function _loop3(i) {
	      var currentSlider = chanceSliders[i];
	      var currentSliderContainer = sliderContainers[i];
	      var currentOutput = chanceOutputs[i];
	      var currentHashCondition = conditionalHash[cellType]['conditions'][currentSlider.name];
	      var currentHashConditionArray = parseConditionalHashStatements(currentHashCondition);
	      var conditionalArray = parseConditionalHashStatements(currentHashCondition);

	      var updateOutput = function updateOutput() {
	        var filteredArray = conditionalArray.filter(function (statement) {
	          if (statement.substring(0, 4) !== 'Math') return statement;
	        });
	        var lastElementArray = filteredArray[filteredArray.length - 1].split(' ');
	        var lastValue = lastElementArray[lastElementArray.length - 1];

	        if (lastValue !== '&&') filteredArray.push("&&");
	        filteredArray.push("Math.random() * 100 < " + currentSlider.value);
	        conditionalHash[cellType]['conditions'][currentOutput.name] = filteredArray.join(' ');
	        currentOutput.value = currentSlider.value;
	      };

	      var setSliderValues = function setSliderValues() {
	        currentSlider.value = 100;
	        currentOutput.value = 100;

	        currentHashConditionArray.forEach(function (statement) {
	          if (statement.substring(0, 4) === 'Math') {
	            var percentage = statement.match(/\d+/g)[1];
	            currentSlider.value = percentage;
	            updateOutput(percentage);
	          }
	        });
	      };

	      if (currentHashConditionArray[0] === 'false &&') {
	        currentSliderContainer.style.display = "none";
	      }

	      setSliderValues();
	      currentSlider.addEventListener('input', updateOutput);
	    };

	    for (var i = 0; i < chanceSliders.length; i++) {
	      _loop3(i);
	    }
	  };

	  var handleSubmitEventListeners = function handleSubmitEventListeners(cellType) {

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
	        var currentSliderContainer = sliderContainers[i];

	        var toggleSliderDisplay = function toggleSliderDisplay() {
	          var currentHashCondition = conditionalHash[cellType]['conditions'][currentButton.name];
	          var currentHashConditionArray = parseConditionalHashStatements(currentHashCondition);

	          if (currentHashConditionArray[0] !== 'false &&') {
	            currentSliderContainer.style.display = "flex";
	          }
	        };

	        currentButton.addEventListener('click', function () {
	          addStatementToConditionalHash(cellType, currentButton);
	          refreshConditionalStatements(cellType);
	          resetMenuValues(currentButton);
	          toggleSliderDisplay();
	        });
	      };

	      for (var i = 0; i < conditionalSubmitButtons.length; i++) {
	        _loop4(i);
	      }
	    };

	    clearSubmitEventListeners();
	    populateSubmitEventListeners();
	  };

	  var resetNeighborBoxes = function resetNeighborBoxes() {
	    for (var i = 0; i < validNeighborBoxes.length; i++) {
	      var currentBox = validNeighborBoxes[i];
	      currentBox.checked = false;
	    }
	  };

	  var populateValidNeighborBoxes = function populateValidNeighborBoxes(cellType) {

	    resetNeighborBoxes();

	    var _loop5 = function _loop5(i) {
	      var currentBox = validNeighborBoxes[i];
	      var currentName = neighborTypeNames[i];

	      var getType = function getType(type) {
	        conditionalHash[type]['neighborHash'][currentBox.value] = currentBox.checked;
	      };

	      if (currentName) currentName.innerText = conditionalHash[currentBox.value].name;
	      currentBox.checked = conditionalHash[cellType]['neighborHash'][currentBox.value];
	      currentBox.onclick = function () {
	        return getType(cellType);
	      };
	    };

	    for (var i = 0; i < validNeighborBoxes.length; i++) {
	      _loop5(i);
	    }
	  };

	  var changeCellLogicModalType = function changeCellLogicModalType(cellType) {
	    if (!container.pauseEvent) container.handlePauseEvent();

	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";

	    handleNameChange(cellType);
	    changeCellColor(cellType);
	    populateConditionalDropdowns();
	    refreshConditionalStatements(cellType);
	    resetMenuValues();
	    handleChanceSliders(cellType);
	    handleSubmitEventListeners(cellType);
	    populateValidNeighborBoxes(cellType);
	  };

	  var populateTypeContainers = function populateTypeContainers() {
	    updateCellLogicNames();
	    updateCellLogicColors();

	    var _loop6 = function _loop6(i) {
	      var currentContainer = cellTypeContainers[i];
	      var currentType = Object.keys(conditionalHash)[i];

	      currentContainer.addEventListener('click', function () {
	        changeCellLogicModalType(currentType);
	      });
	    };

	    for (var i = 0; i < cellTypeContainers.length; i++) {
	      _loop6(i);
	    }
	  };

	  populateTypeContainers();

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
	      var typeHash = {};

	      var neighborTypes = Object.keys(conditionalHash[type]['neighborHash']);
	      var validNeighborTypes = neighborTypes.filter(function (neighborType) {
	        return conditionalHash[type]['neighborHash'][neighborType] === true;
	      });

	      var validNeighbors = this.getValidNeighbors(validNeighborTypes);

	      var totalNeighbors = this.cellNeighbors.filter(function (neighbor) {
	        return _this.cells[neighbor].type !== 'false';
	      });

	      neighborTypes.forEach(function (neighborType) {
	        typeHash[neighborType] = 0;
	      });

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