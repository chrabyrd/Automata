import Game from "./scripts/game";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const rulesButton = document.getElementById("rulesButton");
  const rulesModal = document.getElementById("rulesModal");
  const openerModal = document.getElementById("openerModal");

  const game = new Game(mainCtx);

  mainCanvas.addEventListener('click', (e) => game.handleClickEvent(e), false);

  // Pause Button && color shift
  document.body.addEventListener('keydown', e =>{
    if(e.keyCode === 32){
      game.handlePauseEvent(e);
    } else {
      game.toggleColor(e);
    }
  });

  // Rules Modal
  rulesButton.addEventListener('click', function() {
    rulesModal.style.display = "flex";
  });
  window.onclick = function(event) {
    if (event.target === rulesModal || event.target === openerModal) {
        rulesModal.style.display = "none";
        openerModal.style.display = "none";
    }
  };
});
