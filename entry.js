import Game from "./scripts/game";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const clickCanvas = document.getElementById("clickCanvas");
  const clickCtx = clickCanvas.getContext("2d");

  const rulesButton = document.getElementById("rulesButton");
  const rulesModal = document.getElementById("rulesModal");
  const openerModal = document.getElementById("openerModal");

  const game = new Game(mainCtx, clickCtx);

  mainCanvas.addEventListener('click', (e) => game.handleClickEvent(e), false);

  // Pause Button
  document.body.addEventListener('keydown', e =>{
    if(e.keyCode === 32){
      e.preventDefault();
      game.handlePauseEvent();
    }
  });

  // Rules Modal
  rulesButton.addEventListener('click', function() {
    rulesModal.style.display = "block";
  });
  window.onclick = function(event) {
    if (event.target === rulesModal || event.target === openerModal) {
        rulesModal.style.display = "none";
        openerModal.style.display = "none";
    }
  };
});
