import Container from "./scripts/container";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const cellLogicModal = document.getElementById("cellLogicModal");
  const modalBackdrop = document.getElementById("modal-backdrop");

  const cellTypeContainers = document.getElementsByClassName("cellTypeContainers");
  const cellNames = document.getElementsByClassName("cellNames");
  const colorPickers = document.getElementsByClassName("colorPickers");
  const logicModalButtons = document.getElementsByClassName("logicModalButtons");
  const currentTypeCheckboxes = document.getElementsByClassName("currentTypeCheckboxes");

  const cellName = document.getElementById("cellName");

  const conditionalSwitches = document.getElementsByClassName("conditionalSwitches");
  const conditionOptions = document.getElementsByClassName("conditionOptions");
  const neighborTypes = document.getElementsByClassName("neighborTypes");
  const comparators = document.getElementsByClassName("comparators");
  const comparisonValues = document.getElementsByClassName("comparisonValues");
  const conditionalStatements = document.getElementsByClassName("conditionalStatements");
  const conditionalStatementContainers = document.getElementsByClassName("conditionalStatementContainers");
  const sliderContainers = document.getElementsByClassName("sliderContainers");
  const chanceSliders = document.getElementsByClassName("chanceSliders");
  const chanceOutputs = document.getElementsByClassName("chanceOutputs");
  const conditionalSubmitButtons = document.getElementsByClassName("conditionalSubmitButtons");

  const neighborTypeNames = document.getElementsByClassName("neighborTypeNames");
  const validNeighborBoxes = document.getElementsByClassName("validNeighborBox");

  const playPauseButton = document.getElementById("playPauseButton");
  const nextFrameButton = document.getElementById("nextFrameButton");
  const resetButton = document.getElementById("resetButton");

  const speedSlider = document.getElementById("speedSlider");
  const cellSizeDropdown = document.getElementById("cellSizeDropdown");
  const currentWidth = document.getElementById("currentWidth");
  const currentHeight = document.getElementById("currentHeight");

  const conditionalHash = {
    'typeOne': {
      'name': 'Grass',
      'color': '#507F2C',
      'conditions': {
        'skipCon': `false && Math.random() * 100 < 100`,
        'dieCon': `false && Math.random() * 100 < 100`,
        'stayCon': `true && validNeighbors.length === 0 && Math.random() * 100 < 100`,
        'wanderCon': `false && Math.random() * 100 < 100`,
        'reproduceCon': `true && Math.random() * 100 < 100`
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
        'skipCon': `false && Math.random() * 100 < 100`,
        'dieCon': `true && typeHash['typeOne'] === 0 && Math.random() * 100 < 100`,
        'stayCon': `true && validNeighbors.length === 0 && Math.random() * 100 < 100`,
        'wanderCon': `true && Math.random() * 100 < 100`,
        'reproduceCon': `true && typeHash['typeTwo'] > 0 && Math.random() * 100 < 50`
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
        'skipCon': `false && Math.random() * 100 < 100`,
        'dieCon': `true && typeHash['typeOne'] === 0 && Math.random() * 100 < 100`,
        'stayCon': `true && validNeighbors.length === 0 && Math.random() * 100 < 100`,
        'wanderCon': `true && Math.random() * 100 < 100`,
        'reproduceCon': `true && typeHash['typeThree'] > 0 && Math.random() * 100 < 50`
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
        'skipCon': `false && Math.random() * 100 < 100`,
        'dieCon': `true && typeHash['typeOne'] === 0 && Math.random() * 100 < 100`,
        'stayCon': `true && validNeighbors.length === 0 && Math.random() * 100 < 100`,
        'wanderCon': `true && Math.random() * 100 < 100`,
        'reproduceCon': `true && typeHash['typeFour'] > 0 && Math.random() * 100 < 50`
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
        'skipCon': `true`,
        'dieCon': `false`,
        'stayCon': `false`,
        'wanderCon': `false`,
        'reproduceCon': `false`
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

  const container = new Container(mainCanvas, mainCtx, conditionalHash);

  mainCanvas.addEventListener('click',(e) => (
    container.handleClickEvent(e)
  ), false);

  // Keyboard Shortcuts
  document.body.addEventListener('keydown', e => {

    if (cellLogicModal.style.display) return;

    switch (e.keyCode) {
      case 32: // Spacebar
        e.preventDefault();
        handlePauseEvent();
        break;
      case 49: // 1
        changeCurrentCellType('typeOne');
        break;
      case 50: // 2
        changeCurrentCellType('typeTwo');
        break;
      case 51: // 3
        changeCurrentCellType('typeThree');
        break;
      case 52: // 4
        changeCurrentCellType('typeFour');
        break;
      case 78: // n
        handleNextFrameEvent();
        break;
      case 82: // r
        handleResetEvent();
        break;
    }
  });

  const handlePauseEvent = () => {
    playPauseButton.classList.toggle("fa-pause");
    playPauseButton.classList.add("fa-play");
    container.handlePauseEvent();
  };

  const handleNextFrameEvent = () => {
    container.handleNextFrameEvent();
  };

  const handleResetEvent = () => {
    container.handleResetEvent();
  };

  const changeCurrentCellType = type => {
    for (let i = 0; i < cellNames.length; i++) {
      const currentName = cellNames[i];
      const currentTypeContainer = cellTypeContainers[i];
      const currentTypeCheckbox = currentTypeCheckboxes[i];

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

  const handleCellNames = cellType => {
    for (let i = 0; i < cellNames.length; i++) {
      const currentName = cellNames[i];

      currentName.value = conditionalHash[currentName.id].name;

      currentName.addEventListener('input', () => {
        conditionalHash[currentName.id].name = currentName.value;
      });
    }
  };

  const populateColorPickers = () => {
    for (let i = 0; i < colorPickers.length; i++) {
      const currentColorPicker = colorPickers[i];
      const currentType = Object.keys(conditionalHash)[i];

      currentColorPicker.value = conditionalHash[currentType].color;
      currentColorPicker.addEventListener('change', e => {
        conditionalHash[currentType].color = e.target.value;
      });
    }
  };

  const translateStatement = string => {
    const translationHash = {
      // "&&": `AND`,
      // "||": `OR`,
      "typeHash['typeOne']": `${conditionalHash['typeOne'].name}`,
      "typeHash['typeTwo']": `${conditionalHash['typeTwo'].name}`,
      "typeHash['typeThree']": `${conditionalHash['typeThree'].name}`,
      "typeHash['typeFour']": `${conditionalHash['typeFour'].name}`,
      "validNeighbors.length": `Valid Cells`,
      "totalNeighbors.length": `Total Cells`,
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

    const filteredString = string.split(' ').map(str => {
      if (Object.keys(translationHash).includes(str)) {
        str = translationHash[str];
      }
      return str;
    });

    const valueArray = parseConditionalHashStatements(filteredString.join(' '));

    const filteredArray = valueArray.filter(statement => {
      if (statement.substring(0, 4) !== 'Math') return statement;
    });

    return filteredArray.join(' ');
  };

  const populateConditionalDropdowns = () => {

    const populateDropdown = arr => {
      for (let i = 0; i < arr.length; i++) {
        const currentType = arr[i];

        for (let j = 0; j < currentType.options.length; j++) {
          const currentOption = currentType.options[j];
          currentOption.innerText = translateStatement(currentOption.value);
        }
      }
    };

    populateDropdown(neighborTypes);
    populateDropdown(comparators);
    populateDropdown(comparisonValues);
  };

  const flatten = arr => arr.reduce(
    (acc, val) => acc.concat(
      Array.isArray(val) ? flatten(val) : val
    ),
    []
  );

  const parseConditionalHashStatements = condition => {

    const parseConditionalValues = (value, operator) => {
      const valueArray = value.split(` ${operator} `);
      const returnArray = [];
      for (let j = 0; j < valueArray.length - 1; j++) {
        returnArray.push(valueArray[j].concat(` ${operator}`));
      }
      returnArray.push(valueArray[valueArray.length - 1]);
      return returnArray;
    };

    const andOperator = parseConditionalValues(condition, '&&');

    const bothOperators = andOperator.map(function(value) {
      return parseConditionalValues(value, '||');
    });

    return flatten(bothOperators);
  };

  const changeModalCellName = cellType => {
    cellName.innerText = `${conditionalHash[cellType].name} Cell Behavior`;
  };

  const refreshConditionalStatements = cellType => {
    for (let i = 0; i < conditionalStatements.length; i++) {
      conditionalStatements[i].innerHTML = "";
    }
    populateConditionalStatements(cellType);
  };

  const populateConditionalStatements = cellType => {
    for (let i = 0; i < conditionalStatements.length; i++) {
      const currentStatement = conditionalStatements[i];
      const currentOutput = chanceOutputs[i];
      const currentSliderContainer = sliderContainers[i];
      const conditionalStatement = conditionalHash[cellType]['conditions'][currentStatement.id];
      const conditionalStatementArray = parseConditionalHashStatements(conditionalStatement);

      for (let j = 0; j < conditionalStatementArray.length; j++) {
        const statement = conditionalStatementArray[j];

        if (statement === "") continue;

        const li = document.createElement("li");
        const andButton = document.createElement("button");
        const orButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        const mapButtonBehavior = (button, symbol) => {
          const statementArray = statement.split(' ');
          let conditionalArray = conditionalHash[cellType]['conditions'][currentStatement.id].split(' ');

          const removeStatementFromConditionalHash = conditionalHashStatement => {
            conditionalArray = conditionalStatement.replace(`${conditionalHashStatement}`, "").split(' ');

            conditionalArray = conditionalArray.filter(str => {
              return str !== "";
            });

            if (conditionalArray[0] === 'Math.random()') {
              conditionalArray[conditionalArray.length - 1] = "100";
              conditionalArray.unshift('false &&');
              currentOutput.value = 100;
              currentSliderContainer.style.display = "none";
            }

            for (let k = 0; k < conditionalArray.length; k++ ) {
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
            button.innerText = `${symbol}`;
          }

          button.addEventListener('click', () => {
            for (let k = 0; k < conditionalArray.length; k++) {
              const conditionalSlice = conditionalArray.slice(k, k + statementArray.length);
              const conditionalSliceStatement = conditionalSlice.join(' ');
              const operatorIndex = k + conditionalSlice.length - 1;

              if (conditionalSlice.join(' ') === statement) {

                if (symbol === 'Delete') {
                  removeStatementFromConditionalHash(conditionalSliceStatement);
                } else {
                  conditionalArray[operatorIndex] = `${symbol}`;
                  conditionalHash[cellType]['conditions'][currentStatement.id] = conditionalArray.join(' ');
                }

                refreshConditionalStatements(cellType);
              }
            }
          });
        };

        const simplifyStatement = string => {
          const filteredString = string.split(' ').filter(str => {
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

          const lastChar = statement.charAt(statement.length - 1);
          lastChar === '&' ? li.appendChild(orButton) : li.appendChild(andButton);
        }

        if (li.innerText === 'false') continue;

        li.appendChild(deleteButton);
        if (j !== conditionalStatementArray.length - 1) currentStatement.appendChild(li);

      }
    }
  };

  const addStatementToConditionalHash = (cellType, button) => {
    const currentCondition = conditionalHash[cellType]['conditions'][button.name];
    let returnString = "";

    const addValueToReturnString = (nodeArr, buttonType) => {
      for (let j = 0; j < nodeArr.length; j++) {
        const currentItem = nodeArr[j];

        if (currentItem.name === buttonType) {
          returnString += ` ${currentItem.value}`;
        }
      }
    };

    const addReturnStringToConditionalHash = () => {
      addValueToReturnString(neighborTypes, button.name);
      addValueToReturnString(comparators, button.name);
      addValueToReturnString(comparisonValues, button.name);

      returnString = returnString.trim();

      if (!returnString) return;

      if (currentCondition.substring(0, 5) === 'false') {
        conditionalHash[cellType]['conditions'][button.name] = currentCondition.substring(9, currentCondition.length);
      }

      conditionalHash[cellType]['conditions'][button.name] += ` && ${returnString}`;

    };

    addReturnStringToConditionalHash();
    handleChanceSliders(cellType);
  };

  const resetMenuValues = (button = null) => {
    let resetMenuValue;

    if (!button) {
      resetMenuValue = menuName => {
        for (let j = 0; j < menuName.length; j++) {
          menuName[j].value = "";
        }
      };
    } else {
      resetMenuValue = menuName => {
        for (let j = 0; j < menuName.length; j++) {
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

  const removeChanceEventListeners = () => {
    for (let i = 0; i < chanceSliders.length; i++) {
      const currentSlider = chanceSliders[i];
      const clone = currentSlider.cloneNode();

      while (currentSlider.firstChild) {
        clone.appendChild(currentSlider.lastChild);
      }
      currentSlider.parentNode.replaceChild(clone, currentSlider);
    }
  };

  const handleChanceSliders = cellType => {

    removeChanceEventListeners();

    for (let i = 0; i < chanceSliders.length; i++) {
      const currentSlider = chanceSliders[i];
      const currentSliderContainer = sliderContainers[i];
      const currentOutput = chanceOutputs[i];
      const currentHashCondition = conditionalHash[cellType]['conditions'][currentSlider.name];
      const currentHashConditionArray = parseConditionalHashStatements(currentHashCondition);
      const conditionalArray = parseConditionalHashStatements(currentHashCondition);

      const updateOutput = () => {
        const filteredArray = conditionalArray.filter(statement => {
          if (statement.substring(0, 4) !== 'Math') return statement;
        });
        const lastElementArray = filteredArray[filteredArray.length - 1].split(' ');
        const lastValue = lastElementArray[lastElementArray.length - 1];

        if (lastValue !== '&&') filteredArray.push(`&&`);
        filteredArray.push(`Math.random() * 100 < ${currentSlider.value}`);
        conditionalHash[cellType]['conditions'][currentOutput.name] = filteredArray.join(' ');
        currentOutput.value = currentSlider.value;
      };

      const setSliderValues = () => {
        currentSlider.value = 100;
        currentOutput.value = 100;

        currentHashConditionArray.forEach(statement => {
          if (statement.substring(0, 4) === 'Math') {
            const percentage = statement.match(/\d+/g)[1];
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
    }
  };

  const handleSubmitEventListeners = cellType => {

    const clearSubmitEventListeners = () => {
      for (let i = 0; i < conditionalSubmitButtons.length; i++) {
        const currentButton = conditionalSubmitButtons[i];
        const clone = currentButton.cloneNode();

        while (currentButton.firstChild) {
          clone.appendChild(currentButton.lastChild);
        }
        currentButton.parentNode.replaceChild(clone, currentButton);
      }
    };

    const populateSubmitEventListeners = () => {
      for (let i = 0; i < conditionalSubmitButtons.length; i++) {
        const currentButton = conditionalSubmitButtons[i];
        const currentSliderContainer = sliderContainers[i];

        const toggleSliderDisplay = () => {
          const currentHashCondition = conditionalHash[cellType]['conditions'][currentButton.name];
          const currentHashConditionArray = parseConditionalHashStatements(currentHashCondition);

          if (currentHashConditionArray[0] !== 'false &&') {
            currentSliderContainer.style.display = "flex";
          }
        };

        currentButton.addEventListener('click', () => {
          addStatementToConditionalHash(cellType, currentButton);
          refreshConditionalStatements(cellType);
          resetMenuValues(currentButton);
          toggleSliderDisplay();
        });
      }
    };

    clearSubmitEventListeners();
    populateSubmitEventListeners();
  };

  const resetNeighborBoxes = () => {
    for (let i = 0; i < validNeighborBoxes.length; i++) {
      const currentBox = validNeighborBoxes[i];
      currentBox.checked = false;
    }
  };

  const populateValidNeighborBoxes = cellType => {

    resetNeighborBoxes();

    for (let i = 0; i < validNeighborBoxes.length; i++) {
      const currentBox = validNeighborBoxes[i];
      const currentName = neighborTypeNames[i];

      const getType = function (type) {
        conditionalHash[type]['neighborHash'][currentBox.value] = currentBox.checked;
      };

      if (currentName) currentName.innerText = conditionalHash[currentBox.value].name;
      currentBox.checked = conditionalHash[cellType]['neighborHash'][currentBox.value];
      currentBox.onclick = () => getType(cellType);
    }
  };

  const handleConditionalSwitches = cellType => {
    for (let i = 0; i < conditionalSwitches.length; i++) {
      const currentSwitch = conditionalSwitches[i];
      const currentOption = conditionOptions[i];
      const currentContainer = conditionalStatementContainers[i];
      const currentCondition = conditionalHash[cellType]['conditions'][currentSwitch.name];


      currentSwitch.checked = false;
      currentOption.style.display = "none";
      currentContainer.style.display = "none";

      if (!currentCondition.startsWith('false')) {
        currentSwitch.checked = true;
        currentOption.style.display = "flex";
        currentContainer.style.display = "flex";
      }

      currentSwitch.onclick = () => {

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

    }
  };

  const changeCellLogicModalType = cellType => {
    if (!container.pauseEvent) handlePauseEvent();

    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    modalBackdrop.addEventListener('click', e => {
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

  const populateTypeContainers = () => {
    handleCellNames();
    populateColorPickers();

    cellTypeContainers[0].style.opacity = '1';

    for (let i = 0; i < cellTypeContainers.length; i++) {
      const currentTypeContainer = cellTypeContainers[i];
      const currentLogicModalButton = logicModalButtons[i];
      const currentTypeCheckbox = currentTypeCheckboxes[i];
      const currentType = Object.keys(conditionalHash)[i];

      currentLogicModalButton.addEventListener('click', () => {
        changeCellLogicModalType(currentType);
      });

      currentTypeContainer.addEventListener('click', () => {
        changeCurrentCellType(currentType);
      });

      currentTypeContainer.addEventListener('mouseover', () => {
        currentTypeContainer.style.opacity = '1';
      });

      currentTypeContainer.addEventListener('mouseleave', () => {
        if (currentTypeCheckbox.classList.contains('fa-square-o')) {
          currentTypeContainer.style.opacity = '0';
        }
      });
    }
  };

  const handleGridControlButtons = () => {

    const handleSpeedChangeEvent = () => {
      container.handleSpeedChangeEvent(300 - speedSlider.value);
    };

    const handleCellResizeEvent = () => {
      container.handleCellResizeEvent(cellSizeDropdown.value);
    };

    const handleResizeWidthEvent = () => {
      container.handleResizeEvent('width', parseInt(currentWidth.value));
    };

    const handleResizeHeightEvent = () => {
      container.handleResizeEvent('height', parseInt(currentHeight.value));
    };

    const populateGridDimensions = () => {
      const possibleDimensions = container.gridDimensions.sort((a, b) => a - b);

      possibleDimensions.reverse().forEach(num => {
        const widthOption = document.createElement('option');
        widthOption.value = num;
        widthOption.text = num;

        const heightOption = document.createElement('option');
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
