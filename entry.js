import Container from "./scripts/container";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const modalBackdrop = document.getElementById("modal-backdrop");

  const cellLogicTypes = document.getElementsByClassName("cellLogicTypes");
  const cellLogicColors = document.getElementsByClassName("cellLogicColors");
  // const cellTypeContainers = document.getElementsByClassName("cellTypeContainers");
  const typeOneContainer = document.getElementById("typeOneContainer");
  const typeTwoContainer = document.getElementById("typeTwoContainer");
  const typeThreeContainer = document.getElementById("typeThreeContainer");

  const cellLogicModal = document.getElementById("cellLogicModal");
  const cellName = document.getElementById("cellName");
  const cellColorContainer = document.getElementById("cellColorContainer");

  const neighborTypes = document.getElementsByClassName("neighborTypes");
  const comparators = document.getElementsByClassName("comparators");
  const comparisonValues = document.getElementsByClassName("comparisonValues");
  const conditionalStatements = document.getElementsByClassName("conditionalStatements");
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

  const rulesButton = document.getElementById("rulesButton");
  const rulesModal = document.getElementById("rulesModal");
  const openerModal = document.getElementById("openerModal");

  const conditionalHash = {
    'typeOne': {
      'name': 'Type One',
      'color': 'green',
      'conditions': {
        'skipCon': `false`,
        'dieCon': `false`,
        'stayCon': `validNeighbors.length === 0`,
        'wanderCon': `false`,
        'reproduceCon': `true`
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
        'skipCon': `false`,
        'dieCon': `!typeHash['typeOne'] || !typeHash['typeTwo']`,
        'stayCon': `validNeighbors.length === 0`,
        'wanderCon': `true`,
        'reproduceCon': `typeHash[type] && typeHash[typeThree] === false && Math.floor(Math.random() * 2) === 0`
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
        'skipCon': `false`,
        'dieCon': `!typeHash['typeOne']`,
        'stayCon': `validNeighbors.length === 0`,
        'wanderCon': `true`,
        'reproduceCon': `typeHash[type] && Math.floor(Math.random() * 2) === 0`
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
  const updateCellLogicColors = () => {
    for (let i = 0; i < cellLogicColors.length; i++) {
      const currentColor = cellLogicColors[i];
      const currentType = cellLogicTypes[i];

      currentColor.style.background = conditionalHash[currentType.id].color;
    }
  };

  const changeName = cellType => {
    conditionalHash[cellType].name = cellName.value;

    for (let i = 0; i < cellLogicTypes.length; i++) {
      const currentType = cellLogicTypes[i];

      currentType.innerText = conditionalHash[currentType.id].name;
    }

    populateNeighborTypes();
    populateValidNeighborBoxes(cellType);
  };

  const changeCellColor = cellType => {
    $(".basic").spectrum({
      color: conditionalHash[cellType].color,
      flat: true,
      showInitial: true,
      showButtons: false,
      change: function(color) {
        conditionalHash[cellType].color = color.toHexString();
        updateCellLogicColors();
      }
    });
  };

  const populateNeighborTypes = () => {
    for (let i = 0; i < neighborTypes.length; i++) {
      const currentNeighborType = neighborTypes[i];
      const currentValue = comparisonValues[i];

      for (let j = 3; j < 6; j++) {
        const currentNeighborOption = currentNeighborType.options[j];
        const currentValueOption = currentValue.options[j];

        currentNeighborOption.innerText = conditionalHash[currentNeighborOption.value].name;
        currentValueOption.innerText = conditionalHash[currentValueOption.value].name;
      }
    }
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

  const parseConditionalHashStatements = (cellType, statement) => {
    const conditionalHashValue = conditionalHash[cellType]['conditions'][statement.id];
    const andOperator = parseConditionalValues(conditionalHashValue, '&&');
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
      const conditionalStatement = conditionalHash[cellType]['conditions'][currentStatement.id];
      const conditionalStatementArray = parseConditionalHashStatements(cellType, currentStatement);

      conditionalStatementArray.forEach(statement => {
        if (statement === "") return;

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

            conditionalHash[cellType]['conditions'][currentStatement.id] = conditionalArray.join(' ');
          };

          button.innerText = `${symbol}`;

          button.addEventListener('click', () => {
            for (let j = 0; j < conditionalArray.length; j++) {
              const conditionalSlice = conditionalArray.slice(j, j + statementArray.length);
              const conditionalSliceStatement = conditionalSlice.join(' ');
              const operatorIndex = j + conditionalSlice.length - 1;

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

        mapButtonBehavior(andButton, '&&');
        mapButtonBehavior(orButton, '||');
        mapButtonBehavior(deleteButton, 'Delete');

        li.appendChild(document.createTextNode(statement));
        li.appendChild(andButton);
        li.appendChild(orButton);
        li.appendChild(deleteButton);
        currentStatement.appendChild(li);
      });
    }
  };

  const addStatementToConditionalHash = (cellType, button) => {
    let returnString = "";

    const parseNeighbors = value => {
      let parsedValue = `${value}`;
      if (value === 'typeOne' || value === 'typeTwo' || value === 'typeThree') {
        parsedValue = `typeHash['${value}']`;
      }
      return parsedValue;
    };

    const addValueToReturnString = (nodeArr, buttonType) => {
      for (let j = 0; j < nodeArr.length; j++) {
        const currentItem = nodeArr[j];

        if (currentItem.name === buttonType) {
          returnString += ` ${parseNeighbors(currentItem.value)}`;
        }
      }
    };

    const addReturnStringToConditionalHash = () => {
      addValueToReturnString(neighborTypes, button.name);
      addValueToReturnString(comparators, button.name);
      addValueToReturnString(comparisonValues, button.name);
      returnString = returnString.trim();

      if (conditionalHash[cellType]['conditions'][button.name]) {
        conditionalHash[cellType]['conditions'][button.name] += ` && ${returnString}`;
      } else {
        conditionalHash[cellType]['conditions'][button.name] += returnString;
      }
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

    for (let i = 0; i < validNeighborBoxes.length; i++) {
      const currentBox = validNeighborBoxes[i];
      currentBox.checked = false;
    }

    for (let i = 0; i < validNeighborBoxes.length; i++) {
      const currentBox = validNeighborBoxes[i];
      currentBox.checked = false;
    }

    cellName.removeEventListener('input', changeTypeOneName);
    cellName.removeEventListener('input', changeTypeTwoName);
    cellName.removeEventListener('input', changeTypeThreeName);

    cellName.value = conditionalHash[cellType].name;

    changeCellColor(cellType);
    refreshConditionalStatements(cellType);
    resetMenuValues();
    handleSubmitEventListeners(cellType);
    populateValidNeighborBoxes(cellType);

    if (cellType === 'typeOne') {
      cellName.addEventListener('input', changeTypeOneName);
    } else if (cellType === 'typeTwo') {
      cellName.addEventListener('input', changeTypeTwoName);
    } else if (cellType === 'typeThree') {
      cellName.addEventListener('input', changeTypeThreeName);
    }
  };

  updateCellLogicColors();
  populateNeighborTypes();

  const changeTypeOneName = changeName.bind(null, 'typeOne');
  const changeTypeTwoName = changeName.bind(null, 'typeTwo');
  const changeTypeThreeName = changeName.bind(null, 'typeThree');

  typeOneContainer.addEventListener('click', e => {
    changeCellLogicModalType('typeOne');
  });

  typeTwoContainer.addEventListener('click', e => {
    changeCellLogicModalType('typeTwo');
  });

  typeThreeContainer.addEventListener('click', e => {
    changeCellLogicModalType('typeThree');
  });

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
