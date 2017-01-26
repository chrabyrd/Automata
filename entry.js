require("./assets/style.css");
require('font-awesome/css/font-awesome.css');

import Game from "./game";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gitHubButton = document.getElementById("gitHub");
const linkedInButton = document.getElementById("linkedIn");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

gitHubButton.innerHTML = '<i class="fa fa-github fa-5x"></i>';
linkedInButton.innerHTML = '<i class="fa fa-linkedin-square fa-5x"></i>';
playButton.innerHTML = '<i class="fa fa-play fa-3x"></i>';
pauseButton.innerHTML = '<i class="fa fa-pause fa-3x"></i>';
resetButton.innerHTML = '<i class="fa fa-refresh fa-3x"></i>';


const game = new Game(ctx);

canvas.addEventListener('click', (e) => game.handleClickEvent(e), false);
playButton.addEventListener('click', () => game.play(), false);
pauseButton.addEventListener('click', () => game.handlePauseEvent(), false);
resetButton.addEventListener('click', () => game.handleResetEvent(), false);
