import Container from "./scripts/container";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const faster = document.getElementById("faster");
  const currentSpeed = document.getElementById("currentSpeed");
  const speedDropdown = document.getElementById("speedDropdown");
  const slower = document.getElementById("slower");

  const widthDropdown = document.getElementById("widthDropdown");
  const heightDropdown = document.getElementById("heightDropdown");
  const gridDropdownContainer = document.getElementById("gridDropdownContainer");
  const currentWidth = document.getElementById("currentWidth");
  const currentHeight = document.getElementById("currentHeight");
  const gridSizeContainer = document.getElementById("gridSizeContainer");

  const modalBackdrop = document.getElementById("modal-backdrop");


  const playPauseButton = document.getElementById("playPauseButton");
  const rulesButton = document.getElementById("rulesButton");
  const rulesModal = document.getElementById("rulesModal");
  const openerModal = document.getElementById("openerModal");

  const container = new Container(mainCanvas, mainCtx);

  mainCanvas.addEventListener('click',(e) => (
    container.handleClickEvent(e)
  ), false);

  // Pause
  document.body.addEventListener('keydown', e => {
    if(e.keyCode === 32) {
      e.preventDefault();
      playPauseButton.classList.toggle("fa-pause");
      container.handlePauseEvent(e);
    }
  });

  playPauseButton.addEventListener('click', e => {
    playPauseButton.classList.toggle("fa-pause");
    container.handlePauseEvent(e);
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
      container.speedArray.forEach(function(num) {
        speedDropdown.innerHTML += `<li>${num}</li>`;
      });

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
      const gridDimensions = container.getGridSize().sort((a, b) => a - b);

      gridDimensions.forEach(function(num) {
        widthDropdown.innerHTML += `<li>${num}</li>`;
        heightDropdown.innerHTML += `<li>${num}</li>`;
      });

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

    modalBackdrop.addEventListener('click', e => {
      widthDropdown.innerHTML = "";
      heightDropdown.innerHTML = "";
      speedDropdown.innerHTML = "";
      speedDropdown.style.display = null;
      widthDropdown.style.display = null;
      heightDropdown.style.display = null;
      modalBackdrop.style.display = null;
    });

    // window.onclick = function(e) {
    //   // console.log(e);
    //     if (e.target.parentElement.id === "gridDropdown") {
    //       container.handleWidthSizeEvent(e.target.innerHTML);
    //       currentWidth.innerHTML = e.target.innerHTML;
    //       // gridDropdown.innerHTML = "";
    //       // gridDropdown.style.display = null;
    //       modalBackdrop.style.display = "none";
    //     } else if (e.target.parentElement.id === "gridDropdown") {
    //       container.handleHeightSizeEvent(e.target.innerHTML);
    //       // currentHeight.innerHTML = e.target.innerHTML;
    //       // gridDropdown.innerHTML = "";
    //       // gridDropdown.style.display = null;
    //       modalBackdrop.style.display = "none";
    //     } else if (e.target === modalBackdrop) {
    //       // gridDropdown.style.display = null;
    //       // gridDropdown.style.display = null;
    //       modalBackdrop.style.display = null;
    //     }
    // };


  // color shift
  document.body.addEventListener('keydown', e => {
    if (e.keyCode === 78) {
      if (!container.pauseEvent) playPauseButton.classList.toggle("fa-pause");
      container.handleNextFrameEvent(e);
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
