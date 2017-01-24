const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 0;

for (let i=0; i < 20; i++) {
  let y = 0;

  for (let j=0; j < 12; j++) {
    ctx.rect(x, y, 50, 50);
    y += 50;
  }

  x += 50;
}

ctx.stroke();
