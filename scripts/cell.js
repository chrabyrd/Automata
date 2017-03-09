class Cell {
  constructor (ctx, gridWidth, gridHeight, cellSize, id, x, y) {
    this.id = id;
    this.xmin = x + 1;
    this.xmax = x + cellSize;
    this.ymin = y + 1;
    this.ymax = y + cellSize;
    this.type = false;
    this.neighbors = [];

    this.ctx = ctx;
    this.cellSize = cellSize;
    this.gridWidth = gridWidth;
    this.x = x;
    this.y = y;

    this.getNeighbors(gridWidth, gridHeight, cellSize);
    this.render();
  }

  changeState (type) {
    this.type = type;
    this.render();
  }

  getNeighbors (gridWidth, gridHeight, cellSize) {
    const offsetValue = gridWidth / cellSize;
    const maxWidthCount = gridWidth / (Math.pow(cellSize, 2));
    const maxHeightCount = gridHeight / (Math.pow(cellSize, 2));
    const maxCellId = Math.pow(cellSize, 2) * maxWidthCount * maxHeightCount;
    const top = this.id - offsetValue;
    const bottom = this.id + offsetValue;
    const left = this.id - 1;
    const right = this.id + 1;
    const topLeft = this.id - (offsetValue + 1);
    const bottomLeft = this.id + (offsetValue - 1);
    const topRight = this.id - (offsetValue - 1);
    const bottomRight = this.id + (offsetValue + 1);

    const neighborArray = [top, topRight, right, bottomRight, bottom,
                           bottomLeft, left, topLeft];

    neighborArray.forEach(num => {
      if (num >= 0 && num <= maxCellId - 1) {this.neighbors.push(num);}
    });
  }

  // getRandomColor() {
  //   let length = 6;
  //   const chars = '0123456789ABCDEF';
  //   let hex = '#';
  //   while(length--) hex += chars[(Math.random() * 16) | 0];
  //   return hex;
  // }

  render () {
    this.ctx.clearRect(this.x, this.y, this.cellSize, this.cellSize);

    if (!this.type) return;

    if (this.type === 'typeOne') {
      this.ctx.fillStyle = 'green';
    } else if (this.type === 'typeTwo') {
      this.ctx.fillStyle = 'blue';
    } else if (this.type === 'typeThree') {
      this.ctx.fillStyle = 'purple';
    }

    this.ctx.fillRect(this.x, this.y, this.cellSize, this.cellSize);
    // this.ctx.strokeRect(this.x, this.y, this.cellSize, this.cellSize);
  }
}

export default Cell;
