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

	  var cellTypeContainers = document.getElementsByClassName("cellTypeContainers");
	  var cellNames = document.getElementsByClassName("cellNames");
	  var colorPickers = document.getElementsByClassName("colorPickers");
	  var logicModalButtons = document.getElementsByClassName("logicModalButtons");
	  var currentTypeCheckboxes = document.getElementsByClassName("currentTypeCheckboxes");

	  var cellName = document.getElementById("cellName");

	  var conditionalSwitches = document.getElementsByClassName("conditionalSwitches");
	  var conditionOptions = document.getElementsByClassName("conditionOptions");
	  var neighborTypes = document.getElementsByClassName("neighborTypes");
	  var comparators = document.getElementsByClassName("comparators");
	  var comparisonValues = document.getElementsByClassName("comparisonValues");
	  var conditionalStatements = document.getElementsByClassName("conditionalStatements");
	  var conditionalStatementContainers = document.getElementsByClassName("conditionalStatementContainers");
	  var sliderContainers = document.getElementsByClassName("sliderContainers");
	  var chanceSliders = document.getElementsByClassName("chanceSliders");
	  var chanceOutputs = document.getElementsByClassName("chanceOutputs");
	  var conditionalSubmitButtons = document.getElementsByClassName("conditionalSubmitButtons");

	  var neighborTypeNames = document.getElementsByClassName("neighborTypeNames");
	  var validNeighborBoxes = document.getElementsByClassName("validNeighborBox");

	  var playPauseButton = document.getElementById("playPauseButton");
	  var nextFrameButton = document.getElementById("nextFrameButton");
	  var resetButton = document.getElementById("resetButton");

	  var speedSlider = document.getElementById("speedSlider");
	  var cellSizeDropdown = document.getElementById("cellSizeDropdown");
	  var currentWidth = document.getElementById("currentWidth");
	  var currentHeight = document.getElementById("currentHeight");

	  var conditionalHash = {
	    'typeOne': {
	      'name': 'Grass',
	      'color': '#507F2C',
	      'conditions': {
	        'skipCon': "false && Math.random() * 100 < 100",
	        'dieCon': "false && Math.random() * 100 < 100",
	        'stayCon': "true && validNeighbors.length === 0 && Math.random() * 100 < 100",
	        'wanderCon': "false && Math.random() * 100 < 100",
	        'reproduceCon': "true && Math.random() * 100 < 100"
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
	      'name': 'Cow',
	      'color': '#2552B2',
	      'conditions': {
	        'skipCon': "false && Math.random() * 100 < 100",
	        'dieCon': "true && typeHash['typeOne'] === 0 && Math.random() * 100 < 100",
	        'stayCon': "true && validNeighbors.length === 0 && Math.random() * 100 < 100",
	        'wanderCon': "true && Math.random() * 100 < 100",
	        'reproduceCon': "true && typeHash['typeTwo'] > 0 && Math.random() * 100 < 50"
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
	      'name': 'Sheep',
	      'color': '#FF851B',
	      'conditions': {
	        'skipCon': "false && Math.random() * 100 < 100",
	        'dieCon': "true && typeHash['typeOne'] === 0 && Math.random() * 100 < 100",
	        'stayCon': "true && validNeighbors.length === 0 && Math.random() * 100 < 100",
	        'wanderCon': "true && Math.random() * 100 < 100",
	        'reproduceCon': "true && typeHash['typeThree'] > 0 && Math.random() * 100 < 50"
	      },
	      'neighborHash': {
	        'typeOne': true,
	        'typeTwo': false,
	        'typeThree': false,
	        'typeFour': false,
	        'false': true
	      }
	    },

	    'typeFour': {
	      'name': 'Goat',
	      'color': '#8b0000',
	      'conditions': {
	        'skipCon': "false && Math.random() * 100 < 100",
	        'dieCon': "true && typeHash['typeOne'] === 0 && Math.random() * 100 < 100",
	        'stayCon': "true && validNeighbors.length === 0 && Math.random() * 100 < 100",
	        'wanderCon': "true && Math.random() * 100 < 100",
	        'reproduceCon': "true && typeHash['typeFour'] > 0 && Math.random() * 100 < 50"
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
	        'typeFour': false,
	        'false': true
	      }
	    }
	  };

	  var container = new _container2.default(mainCanvas, mainCtx, conditionalHash);

	  mainCanvas.addEventListener('click', function (e) {
	    return container.handleClickEvent(e);
	  }, false);

	  // Keyboard Shortcuts
	  document.body.addEventListener('keydown', function (e) {

	    if (cellLogicModal.style.display) return;

	    switch (e.keyCode) {
	      case 32:
	        // Spacebar
	        e.preventDefault();
	        handlePauseEvent();
	        break;
	      case 49:
	        // 1
	        changeCurrentCellType('typeOne');
	        break;
	      case 50:
	        // 2
	        changeCurrentCellType('typeTwo');
	        break;
	      case 51:
	        // 3
	        changeCurrentCellType('typeThree');
	        break;
	      case 52:
	        // 4
	        changeCurrentCellType('typeFour');
	        break;
	      case 78:
	        // n
	        handleNextFrameEvent();
	        break;
	      case 82:
	        // r
	        handleResetEvent();
	        break;
	    }
	  });

	  var handlePauseEvent = function handlePauseEvent() {
	    playPauseButton.classList.toggle("fa-pause");
	    playPauseButton.classList.add("fa-play");
	    container.handlePauseEvent();
	  };

	  var handleNextFrameEvent = function handleNextFrameEvent() {
	    container.handleNextFrameEvent();
	  };

	  var handleResetEvent = function handleResetEvent() {
	    container.handleResetEvent();
	  };

	  var changeCurrentCellType = function changeCurrentCellType(type) {
	    for (var i = 0; i < cellNames.length; i++) {
	      var currentName = cellNames[i];
	      var currentTypeContainer = cellTypeContainers[i];
	      var currentTypeCheckbox = currentTypeCheckboxes[i];

	      currentTypeContainer.style.opacity = 0;
	      currentTypeCheckbox.classList.add('fa-square-o');
	      currentTypeCheckbox.classList.remove('fa-check-square-o');

	      if (currentName.id === type) {
	        currentTypeContainer.style.opacity = 1;
	        currentTypeCheckbox.classList.remove('fa-square-o');
	        currentTypeCheckbox.classList.add('fa-check-square-o');
	      }
	    }

	    container.cellType = type;
	  };

	  var handleCellNames = function handleCellNames(cellType) {
	    var _loop = function _loop(i) {
	      var currentName = cellNames[i];

	      currentName.value = conditionalHash[currentName.id].name;

	      currentName.addEventListener('input', function () {
	        conditionalHash[currentName.id].name = currentName.value;
	      });
	    };

	    for (var i = 0; i < cellNames.length; i++) {
	      _loop(i);
	    }
	  };

	  var populateColorPickers = function populateColorPickers() {
	    var _loop2 = function _loop2(i) {
	      var currentColorPicker = colorPickers[i];
	      var currentType = Object.keys(conditionalHash)[i];

	      currentColorPicker.value = conditionalHash[currentType].color;
	      currentColorPicker.addEventListener('change', function (e) {
	        conditionalHash[currentType].color = e.target.value;
	      });
	    };

	    for (var i = 0; i < colorPickers.length; i++) {
	      _loop2(i);
	    }
	  };

	  var translateStatement = function translateStatement(string) {
	    var translationHash = {
	      // "&&": `AND`,
	      // "||": `OR`,
	      "typeHash['typeOne']": "" + conditionalHash['typeOne'].name,
	      "typeHash['typeTwo']": "" + conditionalHash['typeTwo'].name,
	      "typeHash['typeThree']": "" + conditionalHash['typeThree'].name,
	      "typeHash['typeFour']": "" + conditionalHash['typeFour'].name,
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
	        var _currentType = arr[i];

	        for (var j = 0; j < _currentType.options.length; j++) {
	          var currentOption = _currentType.options[j];
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

	  var parseConditionalHashStatements = function parseConditionalHashStatements(condition) {

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
	  };

	  var changeModalCellName = function changeModalCellName(cellType) {
	    cellName.innerText = conditionalHash[cellType].name + " Cell Behavior";
	  };

	  var refreshConditionalStatements = function refreshConditionalStatements(cellType) {
	    for (var i = 0; i < conditionalStatements.length; i++) {
	      conditionalStatements[i].innerHTML = "";
	    }
	    populateConditionalStatements(cellType);
	  };

	  var populateConditionalStatements = function populateConditionalStatements(cellType) {
	    var _loop3 = function _loop3(i) {
	      var currentStatement = conditionalStatements[i];
	      var currentOutput = chanceOutputs[i];
	      var currentSliderContainer = sliderContainers[i];
	      var conditionalStatement = conditionalHash[cellType]['conditions'][currentStatement.id];
	      var conditionalStatementArray = parseConditionalHashStatements(conditionalStatement);

	      var _loop4 = function _loop4(j) {
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

	            if (conditionalArray[0] === 'Math.random()') {
	              conditionalArray[conditionalArray.length - 1] = "100";
	              conditionalArray.unshift('false &&');
	              currentOutput.value = 100;
	              currentSliderContainer.style.display = "none";
	            }

	            for (var k = 0; k < conditionalArray.length; k++) {
	              if (conditionalArray[k] === 'Math.random()') {
	                if (conditionalArray[k - 1] !== 'false &&') {
	                  conditionalArray[k - 1] = '&&';
	                }
	              }
	            }
	            conditionalHash[cellType]['conditions'][currentStatement.id] = conditionalArray.join(' ');
	          };

	          if (symbol === 'Delete') {
	            button.classList.add('deleteButtons');
	            button.classList.add('fa');
	            button.classList.add('fa-times');
	          } else {
	            button.innerText = "" + symbol;
	          }

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
	        } else {
	          li.appendChild(document.createTextNode(translateStatement(statement)));

	          var lastChar = statement.charAt(statement.length - 1);
	          lastChar === '&' ? li.appendChild(orButton) : li.appendChild(andButton);
	        }

	        if (li.innerText === 'false') return "continue";

	        li.appendChild(deleteButton);
	        if (j !== conditionalStatementArray.length - 1) currentStatement.appendChild(li);
	      };

	      for (var j = 0; j < conditionalStatementArray.length; j++) {
	        var _ret4 = _loop4(j);

	        if (_ret4 === "continue") continue;
	      }
	    };

	    for (var i = 0; i < conditionalStatements.length; i++) {
	      _loop3(i);
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

	      if (!returnString) return;

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

	    var _loop5 = function _loop5(i) {
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

	      currentSliderContainer.style.display = "flex";

	      if (currentHashConditionArray[0] === 'false &&') {
	        currentSliderContainer.style.display = "none";
	      }

	      setSliderValues();
	      currentSlider.addEventListener('input', updateOutput);
	    };

	    for (var i = 0; i < chanceSliders.length; i++) {
	      _loop5(i);
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
	      var _loop6 = function _loop6(i) {
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
	        _loop6(i);
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

	    var _loop7 = function _loop7(i) {
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
	      _loop7(i);
	    }
	  };

	  var handleConditionalSwitches = function handleConditionalSwitches(cellType) {
	    var _loop8 = function _loop8(i) {
	      var currentSwitch = conditionalSwitches[i];
	      var currentOption = conditionOptions[i];
	      var currentContainer = conditionalStatementContainers[i];
	      var currentCondition = conditionalHash[cellType]['conditions'][currentSwitch.name];

	      currentSwitch.checked = false;
	      currentOption.style.display = "none";
	      currentContainer.style.display = "none";

	      if (!currentCondition.startsWith('false')) {
	        currentSwitch.checked = true;
	        currentOption.style.display = "flex";
	        currentContainer.style.display = "flex";
	      }

	      currentSwitch.onclick = function () {

	        if (currentSwitch.checked) {
	          conditionalHash[cellType]['conditions'][currentSwitch.name] = currentCondition.replace(/false/i, "true");
	          currentOption.style.display = "flex";
	          currentContainer.style.display = "flex";
	        } else {
	          conditionalHash[cellType]['conditions'][currentSwitch.name] = 'false && Math.random() * 100 < 100';
	          currentOption.style.display = "none";
	          currentContainer.style.display = "none";
	        }

	        handleChanceSliders(cellType);
	        console.log(conditionalHash[cellType]['conditions'][currentSwitch.name]);
	      };
	    };

	    for (var i = 0; i < conditionalSwitches.length; i++) {
	      _loop8(i);
	    }
	  };

	  var changeCellLogicModalType = function changeCellLogicModalType(cellType) {
	    if (!container.pauseEvent) handlePauseEvent();

	    cellLogicModal.style.display = 'flex';
	    modalBackdrop.style.display = "flex";

	    modalBackdrop.addEventListener('click', function (e) {
	      if (e.target.id !== 'modal-backdrop') return;
	      if (container.pauseEvent) handlePauseEvent(e);

	      cellLogicModal.style.display = null;
	      modalBackdrop.style.display = null;
	    });

	    changeModalCellName(cellType);
	    handleConditionalSwitches(cellType);
	    populateConditionalDropdowns();
	    refreshConditionalStatements(cellType);
	    resetMenuValues();
	    handleChanceSliders(cellType);
	    handleSubmitEventListeners(cellType);
	    populateValidNeighborBoxes(cellType);
	  };

	  var populateTypeContainers = function populateTypeContainers() {
	    handleCellNames();
	    populateColorPickers();

	    cellTypeContainers[0].style.opacity = '1';

	    var _loop9 = function _loop9(i) {
	      var currentTypeContainer = cellTypeContainers[i];
	      var currentLogicModalButton = logicModalButtons[i];
	      var currentTypeCheckbox = currentTypeCheckboxes[i];
	      var currentType = Object.keys(conditionalHash)[i];

	      currentLogicModalButton.addEventListener('click', function () {
	        changeCellLogicModalType(currentType);
	      });

	      currentTypeContainer.addEventListener('click', function () {
	        changeCurrentCellType(currentType);
	      });

	      currentTypeContainer.addEventListener('mouseover', function () {
	        currentTypeContainer.style.opacity = '1';
	      });

	      currentTypeContainer.addEventListener('mouseleave', function () {
	        if (currentTypeCheckbox.classList.contains('fa-square-o')) {
	          currentTypeContainer.style.opacity = '0';
	        }
	      });
	    };

	    for (var i = 0; i < cellTypeContainers.length; i++) {
	      _loop9(i);
	    }
	  };

	  var handleGridControlButtons = function handleGridControlButtons() {

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

	    populateGridDimensions();

	    playPauseButton.addEventListener('click', handlePauseEvent);
	    nextFrameButton.addEventListener('click', handleNextFrameEvent);
	    resetButton.addEventListener('click', handleResetEvent);
	    speedSlider.addEventListener('change', handleSpeedChangeEvent);
	    cellSizeDropdown.addEventListener('change', handleCellResizeEvent);
	    currentWidth.addEventListener('change', handleResizeWidthEvent);
	    currentHeight.addEventListener('change', handleResizeHeightEvent);
	  };

	  populateTypeContainers();
	  handleGridControlButtons();
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