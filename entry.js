import Board from "./board";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.addEventListener('click', (e) => board.toggleCell(e), false);

const board = new Board(ctx);
