import Container from "./scripts/container";
import {defaultHash, demoHash} from "./scripts/hashes";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const informationModal = document.getElementById("informationModal");
  const cellLogicModal = document.getElementById("cellLogicModal");
  const modalBackdrop = document.getElementById("modal-backdrop");

  const cellTypeContainers = document.getElementsByClassName("cellTypeContainers");
  const cellNames = document.getElementsByClassName("cellNames");
  const colorPickers = document.getElementsByClassName("colorPickers");
  const logicModalButtons = document.getElementsByClassName("logicModalButtons");

  const cellName = document.getElementById("cellName");

  const chanceSliders = document.getElementsByClassName("chanceSliders");
  const chanceOutputs = document.getElementsByClassName("chanceOutputs");
  const conditionOptions = document.getElementsByClassName("conditionOptions");
  const neighborTypes = document.getElementsByClassName("neighborTypes");
  const comparators = document.getElementsByClassName("comparators");
  const comparisonValues = document.getElementsByClassName("comparisonValues");
  const conditionalStatements = document.getElementsByClassName("conditionalStatements");
  const conditionalStatementContainers = document.getElementsByClassName("conditionalStatementContainers");
  const conditionalSubmitButtons = document.getElementsByClassName("conditionalSubmitButtons");

  const neighborTypeNames = document.getElementsByClassName("neighborTypeNames");
  const validNeighborBoxes = document.getElementsByClassName("validNeighborBox");

  const gridControls = document.getElementById("gridControls");
  const playPauseButton = document.getElementById("playPauseButton");
  const nextFrameButton = document.getElementById("nextFrameButton");
  const resetButton = document.getElementById("resetButton");

  const speedSlider = document.getElementById("speedSlider");
  const cellSizeDropdown = document.getElementById("cellSizeDropdown");
  const currentWidth = document.getElementById("currentWidth");
  const currentHeight = document.getElementById("currentHeight");

  const informationButton = document.getElementById("informationButton");
  const demoButton = document.getElementById("demoButton");
  const newGridButton = document.getElementById("newGridButton");

  let conditionalHash = defaultHash;
  let container;

  mainCanvas.addEventListener('click',(e) => (
    container.handleClickEvent(e)
  ), false);

  // Keyboard Shortcuts
  document.body.addEventListener('keydown', e => {
    if (e.target.classList.contains('cellNames')) return;

    switch (e.keyCode) {
      case 27: // Esc
        toggleUI();
        break;
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
      case 73: // i
        toggleInformationModal();
        break;
      case 78: // n
        handleNextFrameEvent();
        break;
      case 79: // o
        toggleCellLogicModal();
        break;
      case 82: // r
        handleResetEvent();
        break;
    }
  });

  const toggleCellLogicModal = () => {

    const updateModal = () => {
      const cellTypes = Object.keys(conditionalHash);

      for (let i = 0; i < cellTypes.length; i++) {
        const currentType = cellTypes[i];
        if (currentType === container.cellType) {
          changeCellLogicModalType(currentType);
        }
      }
    };

    if (modalBackdrop.style.display === 'none') {
      modalBackdrop.style.display = 'flex';
      gridControls.style.display = 'none';
      informationModal.style.display = 'none';
      updateModal();
      hideCellTypeContainers();
    } else {
      modalBackdrop.style.display = 'none';
      gridControls.style.display = 'flex';
      cellLogicModal.style.display = 'none';
      showCellTypeContainers();
    }
  };

  const toggleInformationModal = () => {
    if (!container.pauseEvent) handlePauseEvent();

    if (modalBackdrop.style.display === 'none') {
      modalBackdrop.style.display = 'flex';
      gridControls.style.display = 'none';
      cellLogicModal.style.display = 'none';
      informationModal.style.display = 'flex';
      hideCellTypeContainers();
    } else {
      modalBackdrop.style.display = 'none';
      gridControls.style.display = 'flex';
      informationModal.style.display = 'none';
      showCellTypeContainers();
    }
  };

  const showCellTypeContainers = () => {
    for (let i = 0; i < cellTypeContainers.length; i++) {
      const currentType = Object.keys(conditionalHash)[i];

      cellTypeContainers[i].style.display = 'flex';
      cellTypeContainers[i].style.opacity = '0';

      if (currentType === container.cellType) {
        cellTypeContainers[i].style.opacity = '1';
      }
    }
  };

  const hideCellTypeContainers = () => {
    for (let i = 0; i < cellTypeContainers.length; i++) {
      cellTypeContainers[i].style.display = 'none';
    }
  };

  const toggleUI = () => {
    cellLogicModal.style.display = 'none';
    informationModal.style.display = 'none';
    modalBackdrop.style.display = 'none';
    gridControls.style.display = 'flex';

    showCellTypeContainers();

    if (gridControls.style.opacity === '0') {
      gridControls.style.opacity = '1';

      for (let i = 0; i < cellTypeContainers.length; i++) {
        const currentType = Object.keys(conditionalHash)[i];

        if (currentType === container.cellType) {
          cellTypeContainers[i].style.opacity = '1';
        }
      }
    } else {
      gridControls.style.opacity = '0';

      for (let i = 0; i < cellTypeContainers.length; i++) {
        cellTypeContainers[i].style.opacity = '0';
      }
    }
  };

  const handlePauseEvent = () => {
    playPauseButton.classList.toggle("fa-pause");
    playPauseButton.classList.add("fa-play");
    container.handlePauseEvent();
  };

  const handleNextFrameEvent = () => {
    if (playPauseButton.classList.contains("fa-pause")) {
      playPauseButton.classList.toggle("fa-pause");
      playPauseButton.classList.add("fa-play");
    }
    container.handleNextFrameEvent();
  };

  const handleResetEvent = () => {
    container.handleResetEvent();
  };

  const changeCurrentCellType = type => {
    for (let i = 0; i < cellNames.length; i++) {
      const currentName = cellNames[i];
      const currentTypeContainer = cellTypeContainers[i];

      currentTypeContainer.style.opacity = 0;

      if (currentName.id === type) {
        currentTypeContainer.style.opacity = 1;
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
      "typeHash['typeOne']": `${conditionalHash['typeOne'].name} Cells`,
      "typeHash['typeTwo']": `${conditionalHash['typeTwo'].name} Cells`,
      "typeHash['typeThree']": `${conditionalHash['typeThree'].name} Cells`,
      "typeHash['typeFour']": `${conditionalHash['typeFour'].name} Cells`,
      "validNeighborsWithFalse.length": `Valid Cells (+ false)`,
      "validNeighborsWithoutFalse.length": `Valid Cells (- false)`,
      "totalNeighbors.length": `Total Surrounding Cells`,
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
      if (!statement.startsWith('Math') && !statement.startsWith('true')){
        return statement;
      }
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
      const conditionalStatement = conditionalHash[cellType]['conditions'][currentStatement.id];
      const conditionalStatementArray = parseConditionalHashStatements(conditionalStatement);

      for (let j = 0; j < conditionalStatementArray.length; j++) {
        const li = document.createElement("li");
        const andButton = document.createElement("button");
        const orButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const statement = conditionalStatementArray[j];

        const mapButtonBehavior = (button, symbol) => {
          const statementArray = statement.split(' ');
          const conditionalArray = conditionalHash[cellType]['conditions'][currentStatement.id].split(' ');

          const removeStatementFromConditionalHash = conditionalHashStatement => {
            const currentCondition = conditionalHash[cellType]['conditions'][currentStatement.id];
            let returnCondition = currentCondition.replace(`${conditionalHashStatement}`, '');

            returnCondition = returnCondition.trim();

            if (returnCondition.endsWith('&&') || returnCondition.endsWith('||')) {
              returnCondition = returnCondition.slice(0, returnCondition.length - 3);
            }

            conditionalHash[cellType]['conditions'][currentStatement.id] = returnCondition;
          };

          const mapButtonSymbol = () => {
            if (symbol === 'Delete') {
              button.classList.add('deleteButtons');
              button.classList.add('fa');
              button.classList.add('fa-times');
            } else {
              button.innerText = `${symbol}`;
            }
          };

          mapButtonSymbol();

          button.addEventListener('click', () => {
            for (let k = 0; k < conditionalArray.length; k++) {
              const conditionalSlice = conditionalArray.slice(k, k + statementArray.length);
              const conditionalSliceStatement = conditionalSlice.join(' ');
              const operatorIndex = k + conditionalSlice.length - 1;

              if (conditionalSlice.join(' ') === statement) {

                if (symbol === 'Delete') {
                  removeStatementFromConditionalHash(conditionalSliceStatement);
                } else {

                  if (symbol === '&&') {
                    conditionalArray[operatorIndex] = `||`;
                  } else if (symbol === '||') {
                    conditionalArray[operatorIndex] = `&&`;
                  }
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

        const translatedStatement = translateStatement(statement);
        const simplifiedStatement = simplifyStatement(translatedStatement);

        mapButtonBehavior(andButton, '&&');
        mapButtonBehavior(orButton, '||');
        mapButtonBehavior(deleteButton, 'Delete');

        if (!simplifiedStatement) continue;

        li.appendChild(document.createTextNode(simplifiedStatement));

        if (translatedStatement.endsWith('&&')) {
          li.appendChild(andButton);
        } else if (translatedStatement.endsWith('||')) {
          li.appendChild(orButton);
        }

        li.appendChild(deleteButton);

        currentStatement.appendChild(li);
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

      conditionalHash[cellType]['conditions'][button.name] += ` && ${returnString}`;
    };

    addReturnStringToConditionalHash();
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

  const handleChanceSliders = cellType => {
    for (let i = 0; i < chanceSliders.length; i++) {
      const currentSlider = chanceSliders[i];
      const currentOutput = chanceOutputs[i];
      const currentConditionOption = conditionOptions[i];
      const currentStatementContainer = conditionalStatementContainers[i];
      const currentHashCondition = conditionalHash[cellType]['conditions'][currentSlider.name];
      const conditionalArray = parseConditionalHashStatements(currentHashCondition);

      const toggleConditionalStatements = () => {
        if (currentSlider.value === '0') {
          currentConditionOption.style.display = 'none';
          currentStatementContainer.style.display = 'none';
        } else {
          currentConditionOption.style.display = 'flex';
          currentStatementContainer.style.display = 'flex';
        }
      };

      const updateOutput = () => {
        const originalValue = currentOutput.value;
        const updatedCondition = conditionalHash[cellType]['conditions'][currentOutput.name]
          .replace(`Math.random() * 100 < ${originalValue}`, `Math.random() * 100 < ${currentSlider.value}`);

        toggleConditionalStatements();
        conditionalHash[cellType]['conditions'][currentOutput.name] = updatedCondition;
        currentOutput.value = currentSlider.value;
      };

      const setSliderValues = () => {
        conditionalArray.forEach(statement => {
          if (statement.substring(0, 4) === 'Math') {
            const percentage = statement.match(/\d+/g)[1];
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


        currentButton.addEventListener('click', () => {
          addStatementToConditionalHash(cellType, currentButton);
          refreshConditionalStatements(cellType);
          resetMenuValues(currentButton);
        });
      }
    };

    clearSubmitEventListeners();
    populateSubmitEventListeners();
  };

  const populateValidNeighborBoxes = cellType => {
    const resetNeighborBoxes = () => {
      for (let i = 0; i < validNeighborBoxes.length; i++) {
        const currentBox = validNeighborBoxes[i];
        currentBox.checked = false;
      }
    };

    resetNeighborBoxes();

    for (let i = 0; i < validNeighborBoxes.length; i++) {
      const currentBox = validNeighborBoxes[i];
      const currentName = neighborTypeNames[i];

      const getType = function () {
        conditionalHash[cellType]['neighborHash'][currentBox.value] = currentBox.checked;
      };

      currentName.setAttribute("name", conditionalHash[currentBox.value].name);

      currentBox.checked = conditionalHash[cellType]['neighborHash'][currentBox.value];
      currentBox.onclick = () => getType();
    }
  };

  const changeCellLogicModalType = cellType => {

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
  };

  const populateTypeContainers = () => {
    handleCellNames();
    populateColorPickers();
    hideCellTypeContainers();

    cellTypeContainers[0].style.opacity = '1';

    for (let i = 0; i < cellTypeContainers.length; i++) {
      const currentTypeContainer = cellTypeContainers[i];
      const currentLogicModalButton = logicModalButtons[i];
      const currentType = Object.keys(conditionalHash)[i];

      currentLogicModalButton.addEventListener('click', () => {
        hideCellTypeContainers();
        changeCellLogicModalType(currentType);
      });

      currentTypeContainer.addEventListener('click', () => {
        changeCurrentCellType(currentType);
      });

      currentTypeContainer.addEventListener('mouseover', () => {
        currentTypeContainer.style.opacity = '1';
      });

      currentTypeContainer.addEventListener('mouseleave', () => {
        if (currentType !== container.cellType) {
          currentTypeContainer.style.opacity = '0';
        }
      });
    }
  };

  const handleModalBehavior = () => {
    const changeHash = hash => {
      conditionalHash = hash;
      container = new Container(mainCanvas, mainCtx, conditionalHash);

      informationModal.style.display = 'none';
      modalBackdrop.style.display = 'none';
      gridControls.style.display = 'flex';

      handleResetEvent();
      populateTypeContainers();
      showCellTypeContainers();
    };

    modalBackdrop.addEventListener('click', e => {
      if (e.target.id !== 'modal-backdrop') return;
      if (container.pauseEvent) handlePauseEvent();

      cellLogicModal.style.display = 'none';
      informationModal.style.display = 'none';
      modalBackdrop.style.display = 'none';
      gridControls.style.display = 'flex';

      showCellTypeContainers();
    });

    newGridButton.addEventListener('click', () => {
      changeHash(defaultHash);
    });

    demoButton.addEventListener('click', () => {
      changeHash(demoHash);
    });
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
    informationButton.addEventListener('click', toggleInformationModal);
  };

  populateTypeContainers();
  handleModalBehavior();
  handleGridControlButtons();
});
