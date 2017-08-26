export default class CellLogicModal {
  constructor(container) {
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

    this.modalBackdrop.addEventListener('click', e => {
      if (e.target.id !== 'modalBackdrop') return;
      this.toggleCellLogicModal();
    });
  }

  toggleCellLogicModal() {
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

  translateStatement(string) {
    const translationHash = {
      // "&&": `AND`,
      // "||": `OR`,
      "typeHash['typeOne']": `${conditionalHash['typeOne'].name}`,
      "typeHash['typeTwo']": `${conditionalHash['typeTwo'].name}`,
      "typeHash['typeThree']": `${conditionalHash['typeThree'].name}`,
      "typeHash['typeFour']": `${conditionalHash['typeFour'].name}`,
      "validNeighborsWithFalse.length": `Valid (+ false)`,
      "validNeighborsWithoutFalse.length": `Valid (- false)`,
      "totalNeighbors.length": `Total`,
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

  populateConditionalDropdowns() {

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

  parseConditionalHashStatements(condition) {

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

    const andOperator = parseConditionalValues(condition, '&&');

    const bothOperators = andOperator.map(function(value) {
      return parseConditionalValues(value, '||');
    });

    return flatten(bothOperators);
  };

  changeModalCellName(cellType) {
    cellName.innerText = `${conditionalHash[cellType].name} Cell Behavior`;
  };

  refreshConditionalStatements(cellType) {
    for (let i = 0; i < conditionalStatements.length; i++) {
      conditionalStatements[i].innerHTML = "";
    }
    populateConditionalStatements(cellType);
  };

  populateConditionalStatements(cellType) {
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

  addStatementToConditionalHash(cellType, button) {
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

  resetMenuValues(button = null) {
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

  handleChanceSliders(cellType) {
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

  handleSubmitEventListeners(cellType) {

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

  populateValidNeighborBoxes(cellType) {
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

  changeCellLogicModalType(cellType) {

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
}
