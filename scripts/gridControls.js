export const handleGridControlButtons = container => {
  const mainCanvas = document.getElementById("mainCanvas");

  const cellLogicControls = document.getElementById("cellLogicControls");

  const modalBackdrop = document.getElementById("modalBackdrop");
  const informationModalBackdrop = document.getElementById("informationModalBackdrop");
  const informationModal = document.getElementById("informationModal");

  const playPauseButton = document.getElementById("playPauseButton");
  const nextFrameButton = document.getElementById("nextFrameButton");
  const resetButton = document.getElementById("resetButton");

  const speedSlider = document.getElementById("speedSlider");
  const cellSizeDropdown = document.getElementById("cellSizeDropdown");
  const currentWidth = document.getElementById("currentWidth");
  const currentHeight = document.getElementById("currentHeight");

  const informationButton = document.getElementById("informationButton");

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

  const toggleInformationModal = () => {
    if (!container.pauseEvent) handlePauseEvent();

    modalBackdrop.style.display = 'none';
    informationModalBackdrop.style.display = 'flex';
    informationModal.style.display = 'flex';
    cellLogicControls.style.zIndex = 0;
  };

  const handleSpeedChangeEvent = () => {
    container.handleSpeedChangeEvent(300 - speedSlider.value);
  };

  const handleCellResizeEvent = () => {
    container.handleCellResizeEvent(cellSizeDropdown.value);
  };

  const handleResizeWidthEvent = () => {
    container.handleResizeEvent('width', parseInt(currentWidth.value));
  };

  const handleResizeHeightEvent = () => {
    container.handleResizeEvent('height', parseInt(currentHeight.value));
  };

  playPauseButton.addEventListener('click', handlePauseEvent);
  nextFrameButton.addEventListener('click', handleNextFrameEvent);
  resetButton.addEventListener('click', handleResetEvent);
  speedSlider.addEventListener('change', handleSpeedChangeEvent);
  cellSizeDropdown.addEventListener('change', handleCellResizeEvent);
  currentWidth.addEventListener('change', handleResizeWidthEvent);
  currentHeight.addEventListener('change', handleResizeHeightEvent);
  informationButton.addEventListener('click', toggleInformationModal);
};
