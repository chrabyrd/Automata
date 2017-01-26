
require("!style!css!./assets/style.css");

import Game from "./game";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

const game = new Game(ctx);

canvas.addEventListener('click', (e) => game.handleClickEvent(e), false);
playButton.addEventListener('click', () => game.play(), false);
pauseButton.addEventListener('click', () => game.handlePauseEvent(), false);
resetButton.addEventListener('click', () => game.handleResetEvent(), false);
