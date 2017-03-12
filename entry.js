import Container from "./scripts/container";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const modalBackdrop = document.getElementById("modal-backdrop");

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

  const container = new Container(mainCanvas, mainCtx);

  mainCanvas.addEventListener('click',(e) => (
    container.handleClickEvent(e)
  ), false);

  // Grid Controls Modal

  modalBackdrop.addEventListener('click', e => {
    speedDropdown.innerHTML = "";
    cellSizeDropdown.innerHTML = "";
    widthDropdown.innerHTML = "";
    heightDropdown.innerHTML = "";
    speedDropdownContainer.style.display = null;
    cellSizeDropdownContainer.style.display = null;
    widthDropdownContainer.style.display = null;
    heightDropdownContainer.style.display = null;
    modalBackdrop.style.display = null;
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
      container.incrementSpeed('+');
      currentSpeed.innerHTML = (1000 / container.drawspeed).toFixed(2);
    });

    slower.addEventListener('click', e => {
      container.incrementSpeed();
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
      container.handleSpeedChangeEvent(e.target.innerHTML);
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

  // color shift
  document.body.addEventListener('keydown', e => {
    if (e.keyCode === 78) {
      if (!container.pauseEvent) playPauseButton.classList.toggle("fa-pause");
      container.handleNextFrameEvent(e);
    } else if (e.keyCode === 82)  {
      container.handleResetEvent();
    } else {
      container.toggleColor(e);
    }
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
