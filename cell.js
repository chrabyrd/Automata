class Cell {
  constructor (ctx, id, x, y) {
    this.state = {
      id: id,
      xmin: x + 1,
      xmax: x + 50,
      ymin: y + 1,
      ymax: y + 50,
      alive: false,
      neighbors: []
    };

    this.ctx = ctx;
    this.id = id;
    this.x = x;
    this.y = y;

    this.getNeighbors();
    this.render();
  }

  changeState () {
    this.state.alive = this.state.alive ? false : true;
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
        this.state.neighbors.push(right, bottomRight, bottom);
      } else if (this.id === 110) {
        this.state.neighbors.push(top, topRight, right);
      } else {
        this.state.neighbors.push(top, topRight, right, bottomRight, bottom);
      }

    } else if (this.id % 11 === 10) {
      // Right side
      if (this.id === 10) {
        this.state.neighbors.push(left, bottomLeft, bottom);
      } else if (this.id === 120) {
        this.state.neighbors.push(top, topLeft, left);
      } else {
        this.state.neighbors.push(top, topLeft, left, bottomLeft, bottom);
      }

    } else {
      // Center
      this.state.neighbors.push(top, topRight, right, bottomRight, bottom,
        bottomLeft, left, topLeft);

      this.state.neighbors = this.state.neighbors.filter(cellId => {
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
    if (this.state.alive) {
      this.ctx.clearRect(this.x, this.y, 50, 50);
      this.ctx.fillStyle = this.getRandomColor();
      this.ctx.fillRect(this.x, this.y, 50, 50);
    } else {
      this.ctx.clearRect(this.x, this.y, 50, 50);
      this.ctx.rect(this.x, this.y, 50, 50);
    }
    this.ctx.stroke();
  }

}

export default Cell;
