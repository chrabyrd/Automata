import Container from "./components/Container";
import demoHash from "./components/hashes/demoHash";
import { startTutorial } from "./components/modals/tutorial";
import GridControlBar from "./components/toolbars/GridControlBar";
import CellControlBar from "./components/toolbars/CellControlBar";
import CellLogicModal from "./components/modals/CellLogicModal";
import InformationModal from "./components/modals/InformationModal";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const container = new Container(mainCanvas, mainCtx, demoHash);

  const informationModal = new InformationModal(container);
  const cellControlBar = new CellControlBar(container, demoHash);
  const cellLogicModal = new CellLogicModal(container);
  const gridControlBar = new GridControlBar(container);

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
        // toggleUI();
        break;
      case 32: // Spacebar
        e.preventDefault();
        // handlePauseEvent();
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
        // toggleInformationModal();
        break;
      case 78: // n
        // handleNextFrameEvent();
        break;
      case 79: // o
        cellLogicModal.toggleCellLogicModal();
        break;
      case 82: // r
        // handleResetEvent();
        break;
    }
  });
});
