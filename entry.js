import Board from "./board";
import Automata from "./automata";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");

canvas.addEventListener('click', (e) => board.toggleCell(e), false);
playButton.addEventListener('click', () => automata.onPlay(), false);
pauseButton.addEventListener('click', () => automata.onPause(), false);

const board = new Board(ctx);
const automata = new Automata(board);
