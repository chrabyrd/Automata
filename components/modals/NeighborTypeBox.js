export default class NeighborTypeBox {
  constructor(cellType, cellName, activeBoolean) {
    this.cellType = cellType;
    this.cellName = cellName;
    this.checked = activeBoolean;
  }

  createElement() {
    const neighborButton = document.createElement('div');

    neighborButton.classList.add('neighborTypeContainers');
    neighborButton.innerHTML =
      `
      <label class="neighborTypeNames" value=${this.cellType}>
        ${this.cellName}
        
        <input
          class="validNeighborBox"
          value=${this.cellType}
          type="checkbox"
          ${this.checked ? 'checked' : ''}
        />
      </label>
      `
    ;

    return neighborButton;
  }
}
