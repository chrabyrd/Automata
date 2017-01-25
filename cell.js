class Cell {
  constructor (ctx, id, x, y) {
    this.state = {
      id: id,
      xmin: x + 1,
      xmax: x + 50,
      ymin: y + 1,
      ymax: y + 50,
      alive: false
    };

    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.render();
  }

  render () {
    if (this.state.alive) {
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(this.x, this.y, 50, 50);
    } else {
      this.ctx.clearRect(this.x, this.y, 50, 50);
      this.ctx.rect(this.x, this.y, 50, 50);
    }
    this.ctx.stroke();
  }

}

export default Cell;
