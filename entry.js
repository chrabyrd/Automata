import Container from "./scripts/container";

document.addEventListener("DOMContentLoaded", () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const mainCtx = mainCanvas.getContext("2d");

  const playPauseButton = document.getElementById("playPauseButton");
  const faster = document.getElementById("faster");
  const currentSpeed = document.getElementById("currentSpeed");
  const speedDropdown = document.getElementById("speedDropdown");
  const slower = document.getElementById("slower");
  const rulesButton = document.getElementById("rulesButton");
  const rulesModal = document.getElementById("rulesModal");
  const openerModal = document.getElementById("openerModal");

  const container = new Container(mainCanvas, mainCtx);

  mainCanvas.addEventListener('click',
  (e) => container.handleClickEvent(e),
  false);

  // Pause
  document.body.addEventListener('keydown', e => {
    if(e.keyCode === 32) {
      e.preventDefault();
      playPauseButton.classList.toggle("fa-pause");
      container.handlePauseEvent(e);
    }
  });

  playPauseButton.addEventListener('click', e => {
    playPauseButton.classList.toggle("fa-pause");
    container.handlePauseEvent(e);
  });

  // Speed
    faster.addEventListener('click', e => {
      container.speedup(e);
      currentSpeed.innerHTML = (1000 / container.drawspeed).toFixed(2);
    });

    currentSpeed.addEventListener('click', e => {
      if (!speedDropdown.style.display) {
        for (let i = 0; i < container.speedArray.length; i++) {
          speedDropdown.innerHTML += `<li>${container.speedArray[i]}</li>`;
        }
        speedDropdown.style.display = "flex";
      } else {
        speedDropdown.innerHTML = "";
        speedDropdown.style.display = null;
      }
    });

    window.onclick = function(e) {
      if (e.target.parentElement.id === "speedDropdown") {
        container.handleSpeedEvent(e.target.innerHTML);
        currentSpeed.innerHTML = e.target.innerHTML;
        speedDropdown.innerHTML = "";
        speedDropdown.style.display = null;
      }
    };

    slower.addEventListener('click', e => {
      container.slowdown(e);
      currentSpeed.innerHTML = (1000 / container.drawspeed).toFixed(2);
    });

  // color shift
  document.body.addEventListener('keydown', e => {
    if (e.keyCode === 78) {
      if (!container.pauseEvent) playPauseButton.classList.toggle("fa-pause");
      container.handleNextFrameEvent(e);
    } else {
      container.toggleColor(e);
    }
  });

  // Rules Modal
  // rulesButton.addEventListener('click', function() {
  //   rulesModal.style.display = "flex";
  // });
  // window.onclick = function(event) {
  //   if (event.target === rulesModal || event.target === openerModal) {
  //       rulesModal.style.display = "none";
  //       openerModal.style.display = "none";
  //   }
  // };
});
