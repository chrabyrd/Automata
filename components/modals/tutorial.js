export const startTutorial = () => {

  const tutorialModal = document.getElementById("tutorialModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const informationModalBackdrop = document.getElementById("informationModalBackdrop");
  const informationModal = document.getElementById("informationModal");
  const cellLogicControls = document.getElementById('cellLogicControls');
  const tutorialInformation = document.getElementById("tutorialInformation");
  const nextSlideButton = document.getElementById("nextSlideButton");
  const exitTutorialButton = document.getElementById("exitTutorialButton");

  const handleTutorialShortcuts = keyCode => {
      if (keyCode === 49) {
        cellLogicControls.style.zIndex = 1;
        document.body.removeEventListener('keydown', tutorialKeyOne);
        document.body.addEventListener('keydown', tutorialKeyTwo);

        tutorialInformation.innerText = "";
        tutorialInformation.innerText = `
          This is a cell type.

          From this toolbar you can change a cell's color, name, and behavior.

          Please press 2.
        `;
      } else if (keyCode === 50 || keyCode === 51 || keyCode === 52) {
        document.body.removeEventListener('keydown', tutorialKeyTwo);

        tutorialInformation.innerText = "";
        tutorialInformation.innerText = `
        You just accessed a new cell type!

        You can change cell types with the keys 1 - 4.
        `;

        nextSlideButton.style.display = 'flex';
      }
    };

  const tutorialKeyOne = handleTutorialShortcuts.bind(null, 49);
  const tutorialKeyTwo = handleTutorialShortcuts.bind(null, 50);

  const returnToMainMenu = () => {
    modalBackdrop.style.display = 'none';
    informationModal.style.display = 'flex';
    informationModalBackdrop.style.display = 'flex';
    cellLogicControls.style.zIndex = 0;
  };

  const firstSlide = () => {
    tutorialInformation.innerText = "";
    tutorialInformation.innerText = `
      Hello, and welcome to the tutorial.

      You can exit at any time by pressing the "X" button in the upper-left corner.
    `;

    nextSlideButton.onclick = secondSlide;
  };

  const secondSlide = () => {
    tutorialInformation.innerText = "";
    tutorialInformation.innerText = `
      Automata is a cellular automation engine.

      Cellular automation, put simply, means that every cell in a grid derives its behavior from the conditions of its surrounding cells.

      Automata lets you control exactly what this cell behavior should be, and under what conditions it should change.
    `;

    nextSlideButton.onclick = thirdSlide;
  };

  const thirdSlide = () => {
    tutorialInformation.innerText = "";
    tutorialInformation.innerText = `
      We've loaded a pre-configured scenario: Simple Farm.

      There are four different cell types: Grass, Sheep, Human, and Fence.

      Please press 1.
    `;

    document.body.addEventListener('keydown', tutorialKeyOne);
    nextSlideButton.style.display = 'none';
    nextSlideButton.onclick = fourthSlide;
  };

  const fourthSlide = () => {
    tutorialInformation.innerText = "";
    tutorialInformation.innerText = `
      There are more key bindings and a thorough explanation in the ReadMe.

      You can pause or unpause the engine with Spacebar.
      If you want to render a single frame, press 'N'.

      But for now, why not try adjusting some cell behavior?

      Click the gear icon next to a cell's name.
    `;

    nextSlideButton.style.display = 'none';
  };

  modalBackdrop.style.display = 'flex';
  tutorialModal.style.display = 'flex';
  nextSlideButton.style.display = 'flex';

  exitTutorialButton.addEventListener('click', returnToMainMenu);

  firstSlide();
};
