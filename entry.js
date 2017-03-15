import Container from "./scripts/container";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const modalBackdrop = document.getElementById("modal-backdrop");

  const typeOne = document.getElementById("typeOne");
  const typeTwo = document.getElementById("typeTwo");
  const typeThree = document.getElementById("typeThree");
  const falseCell = document.getElementById("falseCell");
  const typeOneColor = document.getElementById("typeOneColor");
  const typeTwoColor = document.getElementById("typeTwoColor");
  const typeThreeColor = document.getElementById("typeThreeColor");
  const falseCellColor = document.getElementById("falseCellColor");
  const typeOneContainer = document.getElementById("typeOneContainer");
  const typeTwoContainer = document.getElementById("typeTwoContainer");
  const typeThreeContainer = document.getElementById("typeThreeContainer");
  const falseCellContainer = document.getElementById("falseCellContainer");

  const cellLogicModal = document.getElementById("cellLogicModal");
  const cellName = document.getElementById("cellName");
  const cellColorContainer = document.getElementById("cellColorContainer");
  const submitButton = document.getElementById("submitButton");

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
        'skipCon': `validNeighbors.length === 0`,
        'dieCon': `false`,
        'stayCon': `false`,
        'wanderCon': `false`,
        // 'reproduceCon': `true`
        'reproduceCon': `!typeHash['typeTwo'] && !typeHash['typeThree']`
      },
      'neighborArray': [false]
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
      'neighborArray': [false, 'typeOne']
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
      'neighborArray': [false, 'typeOne']
    },

    'false': {
      'name': 'False Cell',
      'color': '',
      'conditions': {
        'skipCon': `true`,
        'dieCon': `false`,
        'stayCon': `false`,
        'wanderCon': `false`,
        'reproduceCon': `false`
      },
      'neighborArray': [false]
    }
  };


  const container = new Container(mainCanvas, mainCtx, conditionalHash);

  mainCanvas.addEventListener('click',(e) => (
    container.handleClickEvent(e)
  ), false);

  // Color shift
  document.body.addEventListener('keydown', e => {
      container.toggleColor(e);
  });

  // Modal Backdrop
  modalBackdrop.addEventListener('click', e => {
    if (e.target.id !== 'modal-backdrop') return;
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
  typeOne.innerText = conditionalHash['typeOne'].name;
  typeTwo.innerText = conditionalHash['typeTwo'].name;
  typeThree.innerText = conditionalHash['typeThree'].name;
  falseCell.innerText = conditionalHash['false'].name;
  typeOneColor.style.background = conditionalHash['typeOne'].color;
  typeTwoColor.style.background = conditionalHash['typeTwo'].color;
  typeThreeColor.style.background = conditionalHash['typeThree'].color;

  let currentType;

  typeOneContainer.addEventListener('click', e => {
    currentType = 'typeOne';
    const currentColor = conditionalHash['typeOne'].color;

    cellName.value = typeOne.innerText;
    cellColorContainer.style.display = 'block';
    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    $(".basic").spectrum({
      color: currentColor,
      change: function(color) {
        conditionalHash[currentType].color = color.toHexString();
        typeOneColor.style.background = color.toHexString();
      }
    });

  });

  typeTwoContainer.addEventListener('click', e => {
    currentType = 'typeTwo';
    const currentColor = conditionalHash['typeTwo'].color;

    cellName.value = typeTwo.innerText;
    cellColorContainer.style.display = 'block';
    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    $(".basic").spectrum({
      color: currentColor,
      change: function(color) {
        conditionalHash[currentType].color = color.toHexString();
        typeTwoColor.style.background = color.toHexString();
      }
    });

  });

  typeThreeContainer.addEventListener('click', e => {
    currentType = 'typeThree';
    const currentColor = conditionalHash['typeThree'].color;

    cellName.value = typeThree.innerText;
    cellColorContainer.style.display = 'block';
    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    $(".basic").spectrum({
      color: currentColor,
      change: function(color) {
        conditionalHash[currentType].color = color.toHexString();
        typeThreeColor.style.background = color.toHexString();
      }
    });

  });

  falseCellContainer.addEventListener('click', e => {
    currentType = 'false';
    cellName.value = falseCell.innerText;
    cellLogicModal.style.display = 'flex';
    modalBackdrop.style.display = "flex";

    cellColorContainer.style.display = 'none';
  });

  // Cell Logic Modal
  submitButton.addEventListener('click', e => {
    conditionalHash[currentType].name = cellName.value;
    typeOne.innerText = conditionalHash['typeOne'].name;
    typeTwo.innerText = conditionalHash['typeTwo'].name;
    typeThree.innerText = conditionalHash['typeThree'].name;
    falseCell.innerText = conditionalHash['false'].name;
  });

  // Play Buttons
  document.body.addEventListener('keydown', e => {
    if (e.keyCode === 32) {
      e.preventDefault();
      playPauseButton.classList.toggle("fa-pause");
      container.handlePauseEvent(e);
    } else if (e.keyCode === 78) {
      if (!container.pauseEvent) playPauseButton.classList.toggle("fa-pause");
      container.handleNextFrameEvent(e);
    } else if (e.keyCode === 82)  {
      container.handleResetEvent();
    }
  });

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

  // Rules Modal
  // rulesButton.addEventListener('click', function() {
  //   rulesModal.style.display = "flex";
  // });
  // window.onclick = function(event) {
  //   if (event.target === rulesModal || event.target === openerModal) {
  //       rulesModal.style.display = "none";
  //       openerModal.style.display = "none";
  //   }
  // };
});
