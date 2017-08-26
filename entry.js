import Container from "./scripts/Container";
import { defaultHash, demoHash } from "./scripts/hashes";
import { startTutorial } from "./scripts/tutorial";
import { handleGridControlButtons } from "./scripts/gridControls";
import CellControlBar from "./scripts/CellControlBar";
import CellLogicModal from "./scripts/CellLogicModal";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const informationModalBackdrop = document.getElementById("informationModalBackdrop");

  const informationModal = document.getElementById("informationModal");
  const tutorialModal = document.getElementById("tutorialModal");

  const gridControls = document.getElementById("gridControls");
  const playPauseButton = document.getElementById("playPauseButton");

  const currentWidth = document.getElementById("currentWidth");
  const currentHeight = document.getElementById("currentHeight");

  const demoButton = document.getElementById("demoButton");
  const newGridButton = document.getElementById("newGridButton");

  let conditionalHash = defaultHash;
  let container;

  const cellControlBar = new CellControlBar(container, defaultHash);
  const cellLogicModal = new CellLogicModal(container);

  let mouseStateToggle = false;

  mainCanvas.addEventListener('mousedown',(e) => (
    mouseStateToggle = true
  ), false);

  mainCanvas.addEventListener('mouseup',(e) => (
    mouseStateToggle = false
  ), false);

  mainCanvas.addEventListener('click', (e) => (
    container.handleClickEvent(e)
  ), false);

  mainCanvas.addEventListener('mousemove', (e) => {
    if (mouseStateToggle === true) {
      container.handleClickEvent(e);
    }
  }, false);

  // Keyboard Shortcuts
  document.body.addEventListener('keydown', e => {
    if (e.target.classList.contains('cellNames')) return;
    if (e.metaKey !== false) return;

    switch (e.keyCode) {
      case 27: // Esc
        toggleUI();
        break;
      case 32: // Spacebar
        e.preventDefault();
        handlePauseEvent();
        break;
      case 49: // 1
        cellControlBar.changeCurrentCellType('typeOne');
        break;
      case 50: // 2
        cellControlBar.changeCurrentCellType('typeTwo');
        break;
      case 51: // 3
        cellControlBar.changeCurrentCellType('typeThree');
        break;
      case 52: // 4
        cellControlBar.changeCurrentCellType('typeFour');
        break;
      case 73: // i
        toggleInformationModal();
        break;
      case 78: // n
        handleNextFrameEvent();
        break;
      case 79: // o
        cellLogicModal.toggleCellLogicModal();
        break;
      case 82: // r
        handleResetEvent();
        break;
    }
  });

  const toggleInformationModal = () => {
    if (!container.pauseEvent) handlePauseEvent();

    // modalBackdrop.style.display = 'none';
    informationModalBackdrop.style.display = 'flex';
    informationModal.style.display = 'flex';
    // cellLogicControls.style.zIndex = 0;
  };

  const toggleUI = () => {
    cellLogicModal.style.display = 'none';
    informationModal.style.display = 'none';
    // modalBackdrop.style.display = 'none';
    gridControls.style.display = 'flex';

    // cellControlBar.showCellTypeContainers();
    //
    // if (gridControls.style.opacity === '0') {
    //   gridControls.style.opacity = '1';
    //
    //   for (let i = 0; i < cellControlBar.cellTypeContainers.length; i++) {
    //     const currentType = Object.keys(conditionalHash)[i];
    //
    //     if (currentType === container.cellType) {
    //       cellControlBar.cellTypeContainers[i].style.opacity = '1';
    //     }
    //   }
    // } else {
    //   gridControls.style.opacity = '0';
    //
    //   for (let i = 0; i < cellControlBar.cellTypeContainers.length; i++) {
    //     cellControlBar.cellTypeContainers[i].style.opacity = '0';
    //   }
    // }
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

  const handleInformationModalBehavior = () => {

    const particleEffect = () => {
      const colors = {
        aqua: "#00ffff",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        blue: "#0000ff",
        brown: "#a52a2a",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkviolet: "#9400d3",
        fuchsia: "#ff00ff",
        gold: "#ffd700",
        green: "#008000",
        indigo: "#4b0082",
        khaki: "#f0e68c",
        lightblue: "#add8e6",
        lightcyan: "#e0ffff",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        magenta: "#ff00ff",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#ffa500",
        pink: "#ffc0cb",
        purple: "#800080",
        violet: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        yellow: "#ffff00"
      };

      const generateParticle = () => {
        const getRandomInt = (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        };

        const size = getRandomInt(10, 40);
        const randomColor = Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)];

        const box = document.createElement('div');

        box.style.width = `${size}px`;
        box.style.height = `${size}px`;
        box.style.left = `${getRandomInt(0, window.innerWidth)}px`;
        box.style.bottom = `${getRandomInt(0, window.innerWidth)}px`;
        box.classList.add("particle");
        box.style.backgroundColor = randomColor;
        informationModalBackdrop.appendChild(box);

        setTimeout(() => {
          box.style.webkitAnimationName = 'boxFadeOut';
          box.style.webkitAnimationDuration= '1s';
        }, 1600);

        setTimeout(() => {
          box.parentNode.removeChild(box);
        }, 2000);
      };

      generateParticle();
    };

    const changeHash = hash => {
      conditionalHash = hash;
      container = new Container(mainCanvas, mainCtx, conditionalHash);

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

      informationModal.style.display = 'none';
      informationModalBackdrop.style.display = 'none';
      gridControls.style.display = 'flex';

      clearInterval(particleEffect, 40);

      handleResetEvent();
      cellControlBar.populateTypeContainers();
      populateGridDimensions();
      cellControlBar.showCellTypeContainers();
    };

    setInterval(particleEffect, 40);

    newGridButton.addEventListener('click', () => {
      changeHash(defaultHash);
      handleGridControlButtons(container);
    });

    demoButton.addEventListener('click', () => {
      changeHash(demoHash);
      handleGridControlButtons(container);
      startTutorial();
    });

    // Use this pattern for later presets
    // demoButton.addEventListener('click', () => {
    //   changeHash(demoHash);
    // });
  };

  cellControlBar.populateTypeContainers();
  handleInformationModalBehavior();
});
