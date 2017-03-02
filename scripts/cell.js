class Cell {
  constructor (ctx, id, x, y) {
    this.id = id;
    this.xmin = x + 1;
    this.xmax = x + 10;
    this.ymin = y + 1;
    this.ymax = y + 10;
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
    const top = this.id - 80;
    const topRight = this.id - 79;
    const right = this.id + 1;
    const bottomRight = this.id + 79;
    const bottom = this.id + 80;
    const bottomLeft = this.id + 78;
    const left = this.id - 1;
    const topLeft = this.id - 81;

    if (this.id % 80 === 1) {
      // Left side
      [top, topRight, right, bottomRight, bottom].forEach(num => {
        if (num > 0 && num < 4800) {this.neighbors.push(num);}
      });
    } else if (this.id % 80 === 0) {
      // Right side
      [top, bottom, bottomLeft + 1, left, topLeft].forEach(num => {
        if (num > 0 && num <= 4800) {this.neighbors.push(num);}
      });
    } else {
      // Center
      [top, topRight, right, bottomRight, bottom,
        bottomLeft, left, topLeft].forEach(num => {
          if (num > 0 && num <= 4800) {this.neighbors.push(num);}
        });
    }

    // Edge case
    if (this.id === 4722) {
      this.neighbors = this.neighbors.filter(function(num){
        return num < 4800;
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
    this.ctx.clearRect(this.x, this.y, 10, 10);

    if (this.alive) {
      this.ctx.fillStyle = this.getRandomColor();
      this.ctx.fillRect(this.x, this.y, 10, 10);
    }
  }
}

export default Cell;
