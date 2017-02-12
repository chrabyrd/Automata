class Cell {
  constructor (ctx, id, x, y) {
    this.id = id;
    this.xmin = x + 1;
    this.xmax = x + 50;
    this.ymin = y + 1;
    this.ymax = y + 50;
    this.alive = false;
    this.neighbors = [];

    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.getNeighbors();
    this.render();
  }

  changeState () {
    this.alive = this.alive ? false : true;
    this.render();
  }

  getNeighbors () {
    const top = this.id - 11;
    const topRight = this.id - 10;
    const right = this.id + 1;
    const bottomRight = this.id + 12;
    const bottom = this.id + 11;
    const bottomLeft = this.id + 10;
    const left = this.id - 1;
    const topLeft = this.id - 12;

    if (this.id % 11 === 0) {
      // Left side
      if (this.id === 0) {
        this.neighbors.push(right, bottomRight, bottom);
      } else if (this.id === 110) {
        this.neighbors.push(top, topRight, right);
      } else {
        this.neighbors.push(top, topRight, right, bottomRight, bottom);
      }

    } else if (this.id % 11 === 10) {
      // Right side
      if (this.id === 10) {
        this.neighbors.push(left, bottomLeft, bottom);
      } else if (this.id === 120) {
        this.neighbors.push(top, topLeft, left);
      } else {
        this.neighbors.push(top, topLeft, left, bottomLeft, bottom);
      }

    } else {
      // Center
      this.neighbors.push(top, topRight, right, bottomRight, bottom,
        bottomLeft, left, topLeft);

      this.neighbors = this.neighbors.filter(cellId => {
        return cellId >= 0 && cellId <= 120;
      });
    }
  }

  getRandomColor() {
    let length = 6;
    const chars = '0123456789ABCDEF';
    let hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }

  render () {
    if (this.alive) {
      this.ctx.clearRect(this.x, this.y, 50, 50);
      this.ctx.fillStyle = this.getRandomColor();
      this.ctx.fillRect(this.x, this.y, 50, 50);
    } else {
      this.ctx.clearRect(this.x, this.y, 50, 50);
    }
  }
}

export default Cell;
