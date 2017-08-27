import CellLogicModal from "../modals/CellLogicModal";

export default class CellControlBar {
  constructor(container, conditionalHash) {
    this.container = container;
    this.conditionalHash = conditionalHash;

    this.cellLogicControls = document.getElementById("cellLogicControls");
    this.cellNames = document.getElementsByClassName("cellNames");
    this.colorPickers = document.getElementsByClassName("colorPickers");

    this.cellTypeContainers =
      document.getElementsByClassName("cellTypeContainers");

    this.logicModalButtons =
      document.getElementsByClassName("logicModalButtons");


    this.populateTypeContainers = this.populateTypeContainers.bind(this);
    this.populateColorPickers = this.populateColorPickers.bind(this);
    this.handleCellNames = this.handleCellNames.bind(this);
    this.hideCellTypeContainers = this.hideCellTypeContainers.bind(this);
    this.changeCurrentCellType = this.changeCurrentCellType.bind(this);

    this.populateTypeContainers();
  }

  populateTypeContainers() {
    this.handleCellNames();
    this.populateColorPickers();

    this.cellTypeContainers[0].style.opacity = '1';

    for (let i = 0; i < this.cellTypeContainers.length; i++) {
      const currentTypeContainer = this.cellTypeContainers[i];
      const currentLogicModalButton = this.logicModalButtons[i];
      const currentType = Object.keys(this.conditionalHash)[i];

      currentLogicModalButton.addEventListener('click', () => {
        // tutorialModal.style.display = 'none';
        this.hideCellTypeContainers();
        const cellLogicModal = new CellLogicModal(currentType, this.container, this.conditionalHash);
        cellLogicModal.show();
      });

      currentTypeContainer.addEventListener('click', () => {
        this.changeCurrentCellType(currentType);
      });

      currentTypeContainer.addEventListener('mouseover', () => {
        currentTypeContainer.style.opacity = '1';
      });

      currentTypeContainer.addEventListener('mouseleave', () => {
        if (currentType !== this.container.cellType) {
          currentTypeContainer.style.opacity = '0';
        }
      });
    }
  }

  showCellTypeContainers() {
    for (let i = 0; i < this.cellTypeContainers.length; i++) {
      const currentType = Object.keys(this.conditionalHash)[i];

      this.cellTypeContainers[i].style.display = 'flex';
      this.cellTypeContainers[i].style.opacity = '0';

      if (currentType === this.cellType) {
        this.cellTypeContainers[i].style.opacity = '1';
      }
    }
  }

  hideCellTypeContainers() {
    for (let i = 0; i < this.cellTypeContainers.length; i++) {
      this.cellTypeContainers[i].style.display = 'none';
    }
  }

  changeCurrentCellType(type) {
    for (let i = 0; i < this.cellNames.length; i++) {
      const currentName = this.cellNames[i];
      const currentTypeContainer = this.cellTypeContainers[i];

      currentTypeContainer.style.opacity = 0;

      if (currentName.id === type) {
        currentTypeContainer.style.opacity = 1;
      }
    }

    this.container.cellType = type;
  }

  handleCellNames(cellType) {
    for (let i = 0; i < this.cellNames.length; i++) {
      const currentName = this.cellNames[i];

      currentName.value = this.conditionalHash[currentName.id].name;

      currentName.addEventListener('input', () => {
        this.conditionalHash[currentName.id].name = currentName.value;
      });
    }
  }

  populateColorPickers() {
    for (let i = 0; i < this.colorPickers.length; i++) {
      const currentColorPicker = this.colorPickers[i];
      const currentType = Object.keys(this.conditionalHash)[i];

      currentColorPicker.value = this.conditionalHash[currentType].color;
      currentColorPicker.addEventListener('change', e => {
        this.conditionalHash[currentType].color = e.target.value;
      });
    }
  }
}
