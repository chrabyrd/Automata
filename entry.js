import Container from "./scripts/container";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const modalBackdrop = document.getElementById("modal-backdrop");

  const typeOne = document.getElementById("typeOne");
  const typeTwo = document.getElementById("typeTwo");
  const typeThree = document.getElementById("typeThree");
  const typeOneColor = document.getElementById("typeOneColor");
  const typeTwoColor = document.getElementById("typeTwoColor");
  const typeThreeColor = document.getElementById("typeThreeColor");
  const falseCellColor = document.getElementById("falseCellColor");
  const typeOneContainer = document.getElementById("typeOneContainer");
  const typeTwoContainer = document.getElementById("typeTwoContainer");
  const typeThreeContainer = document.getElementById("typeThreeContainer");

  const cellLogicModal = document.getElementById("cellLogicModal");
  const cellName = document.getElementById("cellName");
  const cellColorContainer = document.getElementById("cellColorContainer");
  const submitButton = document.getElementById("submitButton");

  const skipCondition = document.getElementById("skipCondition");
  const dieCondition = document.getElementById("dieCondition");
  const stayCondition = document.getElementById("stayCondition");
  const wanderCondition = document.getElementById("wanderCondition");
  const reproduceCondition = document.getElementById("reproduceCondition");

  const neighborTypeOne = document.getElementById("neighborTypeOne");
  const neighborTypeTwo = document.getElementById("neighborTypeTwo");
  const neighborTypeThree = document.getElementById("neighborTypeThree");

  const neighborTypeOneBox = document.getElementById("neighborTypeOneBox");
  const neighborTypeTwoBox = document.getElementById("neighborTypeTwoBox");
  const neighborTypeThreeBox = document.getElementById("neighborTypeThreeBox");
  const neighborTypeFalseBox = document.getElementById("neighborTypeFalseBox");

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

  neighborTypeOne.innerText = conditionalHash['typeOne'].name;
  neighborTypeTwo.innerText = conditionalHash['typeTwo'].name;
  neighborTypeThree.innerText = conditionalHash['typeThree'].name;

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
    neighborTypeOneBox.checked = false;
    neighborTypeTwoBox.checked = false;
    neighborTypeThreeBox.checked = false;
    neighborTypeFalseBox.checked = false;
    modalBackdrop.style.display = null;
  });

  // Cell Logic Bar
  typeOne.innerText = conditionalHash['typeOne'].name;
  typeTwo.innerText = conditionalHash['typeTwo'].name;
  typeThree.innerText = conditionalHash['typeThree'].name;
  typeOneColor.style.background = conditionalHash['typeOne'].color;
  typeTwoColor.style.background = conditionalHash['typeTwo'].color;
  typeThreeColor.style.background = conditionalHash['typeThree'].color;

  typeOneContainer.addEventListener('click', e => {
    if (!container.pauseEvent) container.handlePauseEvent(e);

    cellColorContainer.style.display = 'block';
    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    cellName.value = conditionalHash['typeOne'].name;
    skipCondition.value = conditionalHash['typeOne']['conditions']['skipCon'];
    dieCondition.value = conditionalHash['typeOne']['conditions']['dieCon'];
    stayCondition.value = conditionalHash['typeOne']['conditions']['stayCon'];
    wanderCondition.value = conditionalHash['typeOne']['conditions']['wanderCon'];
    reproduceCondition.value = conditionalHash['typeOne']['conditions']['reproduceCon'];

    if (conditionalHash['typeOne']['neighborHash']['typeOne']) neighborTypeOneBox.checked = true;
    if (conditionalHash['typeOne']['neighborHash']['typeTwo']) neighborTypeTwoBox.checked = true;
    if (conditionalHash['typeOne']['neighborHash']['typeThree']) neighborTypeThreeBox.checked = true;
    if (conditionalHash['typeOne']['neighborHash']['false']) neighborTypeFalseBox.checked = true;

    cellName.addEventListener('blur', () => {
      conditionalHash['typeOne'].name = cellName.value;
      neighborTypeOne.innerText = conditionalHash['typeOne'].name;
      typeOne.innerText = cellName.value;
    });

    skipCondition.addEventListener('blur', () => {
      conditionalHash['typeOne']['conditions']['skipCon'] = cellName.value;
      container.conditionalHash = conditionalHash;
    });

    dieCondition.addEventListener('blur', () => {
      conditionalHash['typeOne']['conditions']['dieCon'] = dieCondition.value;
      container.conditionalHash = conditionalHash;
    });

    stayCondition.addEventListener('blur', () => {
      conditionalHash['typeOne']['conditions']['stayCon'] = stayCondition.value;
      container.conditionalHash = conditionalHash;
    });

    wanderCondition.addEventListener('blur', () => {
      conditionalHash['typeOne']['conditions']['wanderCon'] = wanderCondition.value;
      container.conditionalHash = conditionalHash;
    });

    reproduceCondition.addEventListener('blur', () => {
      conditionalHash['typeOne']['conditions']['reproduceCon'] = reproduceCondition.value;
      container.conditionalHash = conditionalHash;
    });

    neighborTypeOneBox.addEventListener('click', event => {
      conditionalHash['typeOne']['neighborHash']['typeOne'] = neighborTypeOneBox.checked;
    });

    neighborTypeTwoBox.addEventListener('click', event => {
      conditionalHash['typeOne']['neighborHash']['typeTwo'] = neighborTypeTwoBox.checked;
    });

    neighborTypeThreeBox.addEventListener('click', event => {
      conditionalHash['typeOne']['neighborHash']['typeThree'] = neighborTypeThreeBox.checked;
    });

    neighborTypeFalseBox.addEventListener('click', event => {
      conditionalHash['typeOne']['neighborHash']['false'] = neighborTypeFalseBox.checked;
    });

    $(".basic").spectrum({
      color: conditionalHash['typeOne'].color,
      flat: true,
      showInitial: true,
      showButtons: false,
      change: function(color) {
        conditionalHash['typeOne'].color = color.toHexString();
        typeOneColor.style.background = color.toHexString();
      }
    });

  });

  typeTwoContainer.addEventListener('click', e => {

    cellColorContainer.style.display = 'block';
    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    cellName.value = conditionalHash['typeTwo'].name;

    if (conditionalHash['typeTwo']['neighborHash']['typeOne']) neighborTypeOneBox.checked = true;
    if (conditionalHash['typeTwo']['neighborHash']['typeTwo']) neighborTypeTwoBox.checked = true;
    if (conditionalHash['typeTwo']['neighborHash']['typeThree']) neighborTypeThreeBox.checked = true;
    if (conditionalHash['typeTwo']['neighborHash']['false']) neighborTypeFalseBox.checked = true;

    cellName.addEventListener('blur', () => {
      conditionalHash['typeTwo'].name = cellName.value;
      neighborTypeOne.innerText = conditionalHash['typeTwo'].name;
      typeTwo.innerText = cellName.value;
    });

    $(".basic").spectrum({
      color: conditionalHash['typeTwo'].color,
      flat: true,
      showInitial: true,
      showButtons: false,
      change: function(color) {
        conditionalHash['typeTwo'].color = color.toHexString();
        typeTwoColor.style.background = color.toHexString();
      }
    });

  });

  typeThreeContainer.addEventListener('click', e => {

    cellColorContainer.style.display = 'block';
    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    cellName.value = conditionalHash['typeThree'].name;

    if (conditionalHash['typeThree']['neighborHash']['typeOne']) neighborTypeOneBox.checked = true;
    if (conditionalHash['typeThree']['neighborHash']['typeTwo']) neighborTypeTwoBox.checked = true;
    if (conditionalHash['typeThree']['neighborHash']['typeThree']) neighborTypeThreeBox.checked = true;
    if (conditionalHash['typeThree']['neighborHash']['false']) neighborTypeFalseBox.checked = true;

    cellName.addEventListener('blur', () => {
      conditionalHash['typeThree'].name = cellName.value;
      neighborTypeOne.innerText = conditionalHash['typeThree'].name;
      typeThree.innerText = cellName.value;
    });

    $(".basic").spectrum({
      color: conditionalHash['typeThree'].color,
      flat: true,
      showInitial: true,
      showButtons: false,
      change: function(color) {
        conditionalHash['typeThree'].color = color.toHexString();
        typeThreeColor.style.background = color.toHexString();
      }
    });

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
