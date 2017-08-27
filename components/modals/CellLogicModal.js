import NeighborTypeBox from './NeighborTypeBox';

export default class CellLogicModal {
  constructor(cellType, container, conditionalHash) {
    this.cellType = cellType;
    this.container = container;
    this.conditionalHash = conditionalHash;

    this.modalBackdrop = document.querySelector("#modalBackdrop");
    this.cellLogicModal = document.querySelector("#cellLogicModal");
    this.validNeighborsContainer =
      document.querySelector("#validNeighborsContainer");

    this.changeCellName = this.changeCellName.bind(this);
    this.populateValidNeighborBoxes = this.populateValidNeighborBoxes.bind(this);
  }

  show() {
    this.changeCellName();
    this.populateValidNeighborBoxes();

    this.modalBackdrop.addEventListener('click', () => this.hide());

    this.modalBackdrop.style.display = 'flex';
    this.cellLogicModal.style.display = 'flex';
  }

  hide() {
    while (this.validNeighborsContainer.firstChild) {
      this.validNeighborsContainer.removeChild(this.validNeighborsContainer.firstChild);
    }

    this.modalBackdrop.style.display = 'none';
    this.cellLogicModal.style.display = 'none';
  }

  changeCellName() {
    const cellName = document.querySelector("#cellName");
    cellName.innerText =
      `${this.conditionalHash[this.cellType].name} Cell Behavior`;
  }

  populateValidNeighborBoxes() {
    const neighborHash = this.conditionalHash[this.cellType]['neighborHash'];

    this.validNeighborsContainer.addEventListener('click', e => {
      const cellType = e.target.value;
      neighborHash[cellType] = e.target.checked;
    });

    Object.keys(neighborHash).forEach(cellType => {
      const cellName = this.conditionalHash[cellType]['name'];
      const neighborTypeBox =
        new NeighborTypeBox(cellType, cellName, neighborHash[cellType]);

      this.validNeighborsContainer.appendChild(neighborTypeBox.createElement());
    });
  }
}
