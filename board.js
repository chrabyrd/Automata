import Cell from "./cell.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const cells = [];

canvas.addEventListener('click', (e) => {


// find clicked cell
  let clickedCell = cells.find((cell) => {
    if (e.offsetX >= cell.xmin && e.offsetX <= cell.xmax) {
      if (e.offsetY >= cell.ymin && e.offsetY <= cell.ymax) {
        return cell;
      }
    }
  });


// toggle 'alive' state and color
  if (clickedCell.alive) {
    clickedCell.alive = false;
    ctx.fillStyle = "white";
  } else {
    clickedCell.alive = true;
    ctx.fillStyle = "green";
  }

  ctx.fillRect(clickedCell.xmin, clickedCell.ymin, 50, 50);
  ctx.stroke();

  // testing
  console.log(clickedCell.id);

}, false);

// populate grid
let y = 0;
let id = 0;
for (let i=0; i < 12; i++) {
  let x = 0;

  for (let j=0; j < 12; j++) {
    let cell = new Cell(ctx, x, y);
    cells.push({
      id: id,
      xmin: x + 1,
      xmax: x + 50,
      ymin: y + 1,
      ymax: y + 50,
      alive: false
    });
    x += 50;
    id++;
  }

  y += 50;
}

console.log(cells);
