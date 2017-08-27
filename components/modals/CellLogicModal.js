import NeighborTypeBox from './NeighborTypeBox';

export default class CellLogicModal {
  constructor(cellType, container, conditionalHash) {
    this.cellType = cellType;
    this.container = container;
    this.conditionalHash = conditionalHash;

    this.modalBackdrop = document.getElementById("modalBackdrop");
    this.cellLogicModal = document.getElementById("cellLogicModal");

    this.neighborTypeNames = document.getElementsByClassName("neighborTypeNames");

    this.changeCellName = this.changeCellName.bind(this);
    this.populateValidNeighborBoxes = this.populateValidNeighborBoxes.bind(this);
  }

  show() {
    this.changeCellName();
    this.populateValidNeighborBoxes();
    this.modalBackdrop.style.display = 'flex';
    this.cellLogicModal.style.display = 'flex';
  }

  hide() {
    this.modalBackdrop.style.display = 'none';
    this.cellLogicModal.style.display = 'none';
  }

  changeCellName() {
    const cellName = document.querySelector("#cellName");
    cellName.innerText =
      `${this.conditionalHash[this.cellType].name} Cell Behavior`;
  }

  populateValidNeighborBoxes() {
    const validNeighborsContainer =
      document.querySelector("#validNeighborsContainer");

    const neighborHash = this.conditionalHash[this.cellType]['neighborHash'];

    validNeighborsContainer.addEventListener('click', e => {
      const cellType = e.target.value;
      neighborHash[cellType] = e.target.checked;
    });

    Object.keys(neighborHash).forEach(cellType => {
      const cellName = this.conditionalHash[cellType]['name'];
      const neighborTypeBox =
        new NeighborTypeBox(cellType, cellName, neighborHash[cellType]);

      validNeighborsContainer.appendChild(neighborTypeBox.createElement());
    });

    // const resetNeighborBoxes = () => {
    //   for (let i = 0; i < this.validNeighborBoxes.length; i++) {
    //     const currentBox = this.validNeighborBoxes[i];
    //     currentBox.checked = false;
    //   }
    // };
    //
    // resetNeighborBoxes();
    //
    // for (let i = 0; i < this.validNeighborBoxes.length; i++) {
    //   const currentBox = this.validNeighborBoxes[i];
    //   const currentName = this.neighborTypeNames[i];
    //
    //   const getType = function () {
    //     this.conditionalHash[cellType]['neighborHash'][currentBox.value] = currentBox.checked;
    //   };
    //
    //   currentName.setAttribute("name", this.conditionalHash[currentBox.value].name);
    //
    //   currentBox.checked = this.conditionalHash[cellType]['neighborHash'][currentBox.value];
    //   currentBox.onclick = () => getType();
    // }
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
