require("./assets/style.css");
require('font-awesome/css/font-awesome.css');

import Game from "./game";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const timer = document.getElementById("timer");
const timerctx = timer.getContext("2d");
const playButton = document.getElementById("playButton");
const resetButton = document.getElementById("resetButton");
const rulesButton = document.getElementById("rulesButton");

const game = new Game(ctx, timerctx);

canvas.addEventListener('click', (e) => game.handleClickEvent(e), false);
playButton.addEventListener('click', () => game.handlePlayEvent(), false);
resetButton.addEventListener('click', () => game.handleResetEvent(), false);
rulesButton.addEventListener('click', () => game.handleRulesEvent(), false);
