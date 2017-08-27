export default class GridControlBar {
  constructor(container) {
    this.container = container;
    this.mainCanvas = document.getElementById("mainCanvas");

    this.playPauseButton = document.getElementById("playPauseButton");
    this.nextFrameButton = document.getElementById("nextFrameButton");
    this.resetButton = document.getElementById("resetButton");

    this.speedSlider = document.getElementById("speedSlider");
    this.cellSizeDropdown = document.getElementById("cellSizeDropdown");
    this.currentWidth = document.getElementById("currentWidth");
    this.currentHeight = document.getElementById("currentHeight");

    this.informationButton = document.getElementById("informationButton");

    this.gridControls = document.querySelector("#gridControls");
    this.gridControls.style.display = 'flex';
  }

  handlePauseEvent() {
    this.playPauseButton.classList.toggle("fa-pause");
    this.playPauseButton.classList.add("fa-play");
    this.container.handlePauseEvent();
  }

  handleNextFrameEvent() {
    if (this.playPauseButton.classList.contains("fa-pause")) {
      this.playPauseButton.classList.toggle("fa-pause");
      this.playPauseButton.classList.add("fa-play");
    }
    this.container.handleNextFrameEvent();
  }

  handleResetEvent() {
    this.container.handleResetEvent();
  }

  toggleInformationModal() {
    if (!this.container.pauseEvent) this.handlePauseEvent();

    this.modalBackdrop.style.display = 'none';
    this.informationModalBackdrop.style.display = 'flex';
    this.informationModal.style.display = 'flex';
    // this.cellLogicControls.style.zIndex = 0;
  }

  handleSpeedChangeEvent() {
    this.container.handleSpeedChangeEvent(300 - this.speedSlider.value);
  }

  handleCellResizeEvent() {
    this.container.handleCellResizeEvent(this.cellSizeDropdown.value);
  }

  handleResizeWidthEvent() {
    this.container.handleResizeEvent('width', parseInt(this.currentWidth.value));
  }

  handleResizeHeightEvent() {
    this.container.handleResizeEvent('height', parseInt(this.currentHeight.value));
  }

  addListeners() {
    this.playPauseButton.addEventListener('click', this.handlePauseEvent);
    this.nextFrameButton.addEventListener('click', this.handleNextFrameEvent);
    this.resetButton.addEventListener('click', this.handleResetEvent);
    this.speedSlider.addEventListener('change', this.handleSpeedChangeEvent);
    this.cellSizeDropdown.addEventListener('change', this.handleCellResizeEvent);
    this.currentWidth.addEventListener('change', this.handleResizeWidthEvent);
    this.currentHeight.addEventListener('change', this.handleResizeHeightEvent);
    this.informationButton.addEventListener('click', this.toggleInformationModal);
  }

}
