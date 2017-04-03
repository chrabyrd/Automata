import Container from "./scripts/container";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const cellLogicModal = document.getElementById("cellLogicModal");
  const modalBackdrop = document.getElementById("modal-backdrop");

  const cellLogicTypes = document.getElementsByClassName("cellLogicTypes");
  const cellLogicColors = document.getElementsByClassName("cellLogicColors");
  const cellTypeContainers = document.getElementsByClassName("cellTypeContainers");
  const cellColorContainer = document.getElementById("cellColorContainer");

  const cellName = document.getElementById("cellName");
  const colorPicker = document.getElementById("colorPicker");

  const neighborTypes = document.getElementsByClassName("neighborTypes");
  const comparators = document.getElementsByClassName("comparators");
  const comparisonValues = document.getElementsByClassName("comparisonValues");
  const conditionalStatements = document.getElementsByClassName("conditionalStatements");
  const sliderContainers = document.getElementsByClassName("sliderContainers");
  const chanceSliders = document.getElementsByClassName("chanceSliders");
  const chanceOutputs = document.getElementsByClassName("chanceOutputs");
  const conditionalSubmitButtons = document.getElementsByClassName("conditionalSubmitButtons");

  const neighborTypeNames = document.getElementsByClassName("neighborTypeNames");
  const validNeighborBoxes = document.getElementsByClassName("validNeighborBox");

  const playPauseButton = document.getElementById("playPauseButton");
  const nextFrameButton = document.getElementById("nextFrameButton");
  const resetButton = document.getElementById("resetButton");

  const faster = document.getElementById("faster");
  const currentSpeed = document.getElementById("currentSpeed");
  const speedDropdown = document.getElementById("speedDropdown");
  const speedDropdownContainer = document.getElementById("speedDropdownContainer");
  const slower = document.getElementById("slower");

  const gridDropdownContainer = document.getElementById("gridDropdownContainer");
  const widthDropdownContainer = document.getElementById("widthDropdownContainer");
  const heightDropdownContainer = document.getElementById("heightDropdownContainer");
  const widthDropdown = document.getElementById("widthDropdown");
  const heightDropdown = document.getElementById("heightDropdown");
  const gridSizeContainer = document.getElementById("gridSizeContainer");
  const currentWidth = document.getElementById("currentWidth");
  const currentHeight = document.getElementById("currentHeight");

  const cellSize = document.getElementById("cellSize");
  const cellSizeDropdown = document.getElementById("cellSizeDropdown");
  const cellSizeDropdownContainer = document.getElementById("cellSizeDropdownContainer");

  const conditionalHash = {
    'typeOne': {
      'name': 'Grass',
      'color': '#165b13',
      'conditions': {
        'skipCon': `false && Math.random() * 100 < 100`,
        'dieCon': `false && Math.random() * 100 < 100`,
        'stayCon': `validNeighbors.length === 0 && Math.random() * 100 < 100`,
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
      'color': '#0000ff',
      'conditions': {
        'skipCon': `false && Math.random() * 100 < 100`,
        'dieCon': `typeHash['typeOne'] === 0 && Math.random() * 100 < 100`,
        'stayCon': `validNeighbors.length === 0 && Math.random() * 100 < 100`,
        'wanderCon': `true && Math.random() * 100 < 100`,
        'reproduceCon': `typeHash['typeTwo'] > 0 && Math.random() * 100 < 50`
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
      'color': '#800080',
      'conditions': {
        'skipCon': `false && Math.random() * 100 < 100`,
        'dieCon': `typeHash['typeOne'] === 0 && Math.random() * 100 < 100`,
        'stayCon': `validNeighbors.length === 0 && Math.random() * 100 < 100`,
        'wanderCon': `true && Math.random() * 100 < 100`,
        'reproduceCon': `typeHash['typeThree'] > 0 && Math.random() * 100 < 50`
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
        'dieCon': `typeHash['typeOne'] === 0 && Math.random() * 100 < 100`,
        'stayCon': `validNeighbors.length === 0 && Math.random() * 100 < 100`,
        'wanderCon': `true && Math.random() * 100 < 100`,
        'reproduceCon': `typeHash['typeFour'] > 0 && Math.random() * 100 < 50`
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

  // Color shift
  document.body.addEventListener('keydown', e => {

    if (cellLogicModal.style.display) return;

    if (e.keyCode === 32) {
      e.preventDefault();
      playPauseButton.classList.toggle("fa-pause");
      container.handlePauseEvent();
    } else if (e.keyCode === 78) {
      if (!container.pauseEvent) playPauseButton.classList.toggle("fa-pause");
      container.handleNextFrameEvent();
    } else if (e.keyCode === 82)  {
      container.handleResetEvent();
    } else {
      container.handleKeystrokeEvent(e);
    }
  });

  // Modals
  modalBackdrop.addEventListener('click', e => {
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
  const refreshCellLogicColors = () => {
    for (let i = 0; i < cellLogicColors.length; i++) {
      const currentColor = cellLogicColors[i];
      const currentType = cellLogicTypes[i];

      currentColor.style.background = conditionalHash[currentType.id].color;
    }
  };

  const updateCellLogicNames = cellType => {
    for (let i = 0; i < cellLogicTypes.length; i++) {
      const currentType = cellLogicTypes[i];

      currentType.innerText = conditionalHash[currentType.id].name;
    }
  };

  const handleCellColorChange = cellType => {
    const updateCellColor = () => {
      conditionalHash[cellType].color = `#${colorPicker.value}`;
      refreshCellLogicColors(cellType);
    };

    colorPicker.value = conditionalHash[cellType].color;
    colorPicker.style.background = colorPicker.value;
    colorPicker.onchange = updateCellColor;
  };

  const handleNameChange = cellType => {
    cellName.value = conditionalHash[cellType].name;

    const updateName = () => {
      conditionalHash[cellType].name = cellName.value;
      updateCellLogicNames(cellType);
      refreshConditionalStatements(cellType);
      populateConditionalDropdowns();
      populateValidNeighborBoxes(cellType);
    };

    cellName.oninput = updateName;
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

  const parseConditionalValues = (value, operator) => {
    const valueArray = value.split(` ${operator} `);
    const returnArray = [];
    for (let j = 0; j < valueArray.length - 1; j++) {
      returnArray.push(valueArray[j].concat(` ${operator}`));
    }
    returnArray.push(valueArray[valueArray.length - 1]);
    return returnArray;
  };

  const parseConditionalHashStatements = condition => {
    const andOperator = parseConditionalValues(condition, '&&');
    const bothOperators = andOperator.map(function(value) {
      return parseConditionalValues(value, '||');
    });

    return flatten(bothOperators);
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

          button.innerText = `${symbol}`;

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

  const changeCellLogicModalType = cellType => {
    if (!container.pauseEvent) container.handlePauseEvent();

    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    handleNameChange(cellType);
    handleCellColorChange(cellType);
    populateConditionalDropdowns();
    refreshConditionalStatements(cellType);
    resetMenuValues();
    handleChanceSliders(cellType);
    handleSubmitEventListeners(cellType);
    populateValidNeighborBoxes(cellType);
  };

  const populateTypeContainers = () => {
    updateCellLogicNames();
    refreshCellLogicColors();

    for (let i = 0; i < cellTypeContainers.length; i++) {
      const currentContainer = cellTypeContainers[i];
      const currentType = Object.keys(conditionalHash)[i];

      currentContainer.addEventListener('click', () => {
        changeCellLogicModalType(currentType);
      });
    }
  };

  populateTypeContainers();

  // Play Buttons
  playPauseButton.addEventListener('click', e => {
    playPauseButton.classList.toggle("fa-pause");
    container.handlePauseEvent(e);
  });

  nextFrameButton.addEventListener('click', e => {
    container.handleNextFrameEvent(e);
  });

  resetButton.addEventListener('click', e => {
    container.handleResetEvent(e);
  });

  // Speed
  faster.addEventListener('click', e => {
    container.handleSpeedChangeEvent(container.drawspeed - 1);
    currentSpeed.innerHTML = (1000 / container.drawspeed).toFixed(2);
  });

  slower.addEventListener('click', e => {
    container.handleSpeedChangeEvent(container.drawspeed + 1);
    currentSpeed.innerHTML = (1000 / container.drawspeed).toFixed(2);
  });

  currentSpeed.addEventListener('click', e => {
    container.validDrawspeeds.forEach(function(num) {
      speedDropdown.innerHTML += `<li>${num}</li>`;
    });

    speedDropdownContainer.style.display = "flex";
    gridDropdownContainer.style.display = "flex";
    modalBackdrop.style.display = "flex";
  });

  speedDropdown.addEventListener('click', e => {
    container.handleSpeedChangeEvent(1000 / e.target.innerHTML);
    currentSpeed.innerHTML = e.target.innerHTML;
    speedDropdown.innerHTML = "";
    speedDropdown.style.display = null;
    modalBackdrop.style.display = null;
  });

  // Grid Size
  currentWidth.innerHTML = container.width;
  currentHeight.innerHTML = container.height;

  gridSizeContainer.addEventListener('click', e => {
    const gridDimensions = container.gridDimensions.sort((a, b) => a - b);

    gridDimensions.forEach(function(num) {
      widthDropdown.innerHTML += `<li>${num}</li>`;
      heightDropdown.innerHTML += `<li>${num}</li>`;
    });

    widthDropdownContainer.style.display = "flex";
    heightDropdownContainer.style.display = "flex";
    gridDropdownContainer.style.display = "flex";
    modalBackdrop.style.display = "flex";
  });

  widthDropdown.addEventListener('click', e => {
    container.handleResizeEvent('width', e.target.innerHTML);
    currentWidth.innerHTML = e.target.innerHTML;
    widthDropdown.innerHTML = "";
    widthDropdown.style.display = null;
    modalBackdrop.style.display = null;
  });

  heightDropdown.addEventListener('click', e => {
    container.handleResizeEvent('height', e.target.innerHTML);
    currentHeight.innerHTML = e.target.innerHTML;
    heightDropdown.innerHTML = "";
    heightDropdown.style.display = null;
    modalBackdrop.style.display = null;
  });

  // Cell Size
  cellSize.addEventListener('click', e => {
    container.cellSizes.forEach(function(num) {
      cellSizeDropdown.innerHTML += `<li>${num}</li>`;
    });

    cellSizeDropdownContainer.style.display = "flex";
    gridDropdownContainer.style.display = "flex";
    modalBackdrop.style.display = "flex";
  });

  cellSizeDropdown.addEventListener('click', e => {
    container.handleCellResizeEvent(parseInt(e.target.innerHTML));
    cellSize.innerHTML = e.target.innerHTML;
    cellSizeDropdown.innerHTML = "";
    cellSizeDropdown.style.display = null;
    modalBackdrop.style.display = null;
  });

});
