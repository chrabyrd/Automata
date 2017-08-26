export default class CellConditionsBox {
  constructor(conditionalHash) {
    this.conditionalHash = conditionalHash;

    this.chanceSliders = document.getElementsByClassName("chanceSliders");
    this.chanceOutputs = document.getElementsByClassName("chanceOutputs");
    this.conditionOptions = document.getElementsByClassName("conditionOptions");
    this.neighborTypes = document.getElementsByClassName("neighborTypes");
    this.comparators = document.getElementsByClassName("comparators");
    this.comparisonValues = document.getElementsByClassName("comparisonValues");

    this.conditionalStatements = document.getElementsByClassName("conditionalStatements");
    this.conditionalStatementContainers = document.getElementsByClassName("conditionalStatementContainers");
    this.conditionalSubmitButtons = document.getElementsByClassName("conditionalSubmitButtons");
  }

  translateStatement(string) {
    const translationHash = {
      // "&&": `AND`,
      // "||": `OR`,
      "typeHash['typeOne']": `${this.conditionalHash['typeOne'].name}`,
      "typeHash['typeTwo']": `${this.conditionalHash['typeTwo'].name}`,
      "typeHash['typeThree']": `${this.conditionalHash['typeThree'].name}`,
      "typeHash['typeFour']": `${this.conditionalHash['typeFour'].name}`,
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

    const valueArray = this.parseConditionalHashStatements(filteredString.join(' '));

    const filteredArray = valueArray.filter(statement => {
      if (!statement.startsWith('Math') && !statement.startsWith('true')){
        return statement;
      }
    });

    return filteredArray.join(' ');
  }

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
  }

  populateConditionalDropdowns() {

    const populateDropdown = arr => {
      for (let i = 0; i < arr.length; i++) {
        const currentType = arr[i];

        for (let j = 0; j < currentType.options.length; j++) {
          const currentOption = currentType.options[j];
          currentOption.innerText = this.translateStatement(currentOption.value);
        }
      }
    };

    populateDropdown(this.neighborTypes);
    populateDropdown(this.comparators);
    populateDropdown(this.comparisonValues);
  }

  populateConditionalStatements(cellType) {
    for (let i = 0; i < this.conditionalStatements.length; i++) {
      const currentStatement = this.conditionalStatements[i];
      const conditionalStatement = this.conditionalHash[cellType]['conditions'][currentStatement.id];
      const conditionalStatementArray = this.parseConditionalHashStatements(conditionalStatement);

      for (let j = 0; j < conditionalStatementArray.length; j++) {
        const li = document.createElement("li");
        const andButton = document.createElement("button");
        const orButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const statement = conditionalStatementArray[j];

        const mapButtonBehavior = (button, symbol) => {
          const statementArray = statement.split(' ');
          const conditionalArray = this.conditionalHash[cellType]['conditions'][currentStatement.id].split(' ');

          const removeStatementFromConditionalHash = conditionalHashStatement => {
            const currentCondition = this.conditionalHash[cellType]['conditions'][currentStatement.id];
            let returnCondition = currentCondition.replace(`${conditionalHashStatement}`, '');

            returnCondition = returnCondition.trim();

            if (returnCondition.endsWith('&&') || returnCondition.endsWith('||')) {
              returnCondition = returnCondition.slice(0, returnCondition.length - 3);
            }

            this.conditionalHash[cellType]['conditions'][currentStatement.id] = returnCondition;
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
                  this.conditionalHash[cellType]['conditions'][currentStatement.id] = conditionalArray.join(' ');
                }

                // refreshConditionalStatements(cellType);
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

        const translatedStatement = this.translateStatement(statement);
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
  }

  addStatementToConditionalHash(cellType, button) {
    const currentCondition = this.conditionalHash[cellType]['conditions'][button.name];
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
      addValueToReturnString(this.neighborTypes, button.name);
      addValueToReturnString(this.comparators, button.name);
      addValueToReturnString(this.comparisonValues, button.name);

      returnString = returnString.trim();

      if (!returnString) return;

      this.conditionalHash[cellType]['conditions'][button.name] += ` && ${returnString}`;
    };

    addReturnStringToConditionalHash();
  }

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

    resetMenuValue(this.neighborTypes);
    resetMenuValue(this.comparators);
    resetMenuValue(this.comparisonValues);
  }

  handleChanceSliders(cellType) {
    for (let i = 0; i < this.chanceSliders.length; i++) {
      const currentSlider = this.chancthis.eSliders[i];
      const currentOutput = this.chanceOutputs[i];
      const currentConditionOption = this.conditionOptions[i];
      const currentStatementContainer = this.conditionalStatementContainers[i];
      const currentHashCondition = this.conditionalHash[cellType]['conditions'][currentSlider.name];
      const conditionalArray = this.parseConditionalHashStatements(currentHashCondition);

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
        const updatedCondition = this.conditionalHash[cellType]['conditions'][currentOutput.name]
          .replace(`Math.random() * 100 < ${originalValue}`, `Math.random() * 100 < ${currentSlider.value}`);

        toggleConditionalStatements();
        this.conditionalHash[cellType]['conditions'][currentOutput.name] = updatedCondition;
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
  }

  handleSubmitEventListeners(cellType) {

    const clearSubmitEventListeners = () => {
      for (let i = 0; i < this.conditionalSubmitButtons.length; i++) {
        const currentButton = this.conditionalSubmitButtons[i];
        const clone = currentButton.cloneNode();

        while (currentButton.firstChild) {
          clone.appendChild(currentButton.lastChild);
        }
        currentButton.parentNode.replaceChild(clone, currentButton);
      }
    };

    const populateSubmitEventListeners = () => {
      for (let i = 0; i < this.conditionalSubmitButtons.length; i++) {
        const currentButton = this.conditionalSubmitButtons[i];


        currentButton.addEventListener('click', () => {
          this.addStatementToConditionalHash(cellType, currentButton);
          this.refreshConditionalStatements(cellType);
          this.resetMenuValues(currentButton);
        });
      }
    };

    clearSubmitEventListeners();
    populateSubmitEventListeners();
  }
}
