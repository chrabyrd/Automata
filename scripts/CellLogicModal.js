export default class CellLogicModal {
  constructor(container, conditionalHash) {
    this.container = container;
    this.conditionalHash = conditionalHash;

    this.modalBackdrop = document.getElementById("modalBackdrop");
    this.cellLogicModal = document.getElementById("cellLogicModal");

    this.cellName = document.getElementById("cellName");

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

  changeModalCellName(cellType) {
    this.cellName.innerText = `${this.conditionalHash[cellType].name} Cell Behavior`;
  }


  populateValidNeighborBoxes(cellType) {
    const resetNeighborBoxes = () => {
      for (let i = 0; i < this.validNeighborBoxes.length; i++) {
        const currentBox = this.validNeighborBoxes[i];
        currentBox.checked = false;
      }
    };

    resetNeighborBoxes();

    for (let i = 0; i < this.validNeighborBoxes.length; i++) {
      const currentBox = this.validNeighborBoxes[i];
      const currentName = this.neighborTypeNames[i];

      const getType = function () {
        this.conditionalHash[cellType]['neighborHash'][currentBox.value] = currentBox.checked;
      };

      currentName.setAttribute("name", this.conditionalHash[currentBox.value].name);

      currentBox.checked = this.conditionalHash[cellType]['neighborHash'][currentBox.value];
      currentBox.onclick = () => getType();
    }
  }

  changeCellLogicModalType(cellType) {

    if (!this.container.pauseEvent) this.container.handlePauseEvent();

    // cellLogicModal.style.display = 'flex';
    // modalBackdrop.style.display = 'flex';
    // gridControls.style.display = 'none';
    //
    // changeModalCellName(cellType);
    // populateConditionalDropdowns();
    // refreshConditionalStatements(cellType);
    // resetMenuValues();
    // handleChanceSliders(cellType);
    // handleSubmitEventListeners(cellType);
    // populateValidNeighborBoxes(cellType);
  }
}
