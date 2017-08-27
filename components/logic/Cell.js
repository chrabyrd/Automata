export default class Cell {
  constructor (ctx, gridWidth, gridHeight, cellSize, id, x, y) {
    this.id = id;
    this.xmin = x + 1;
    this.xmax = x + cellSize;
    this.ymin = y + 1;
    this.ymax = y + cellSize;
    this.neighbors = [];

    this.ctx = ctx;
    this.cellSize = cellSize;
    this.gridWidth = gridWidth;
    this.x = x;
    this.y = y;

    this.type = 'false';
    this.color = 'rgba(255, 255, 255, 0)';

    this.getNeighbors(gridWidth, gridHeight, cellSize);
    this.render();
  }

  changeState (type, color) {
    this.type = type;
    this.color = color;
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

  hexToRgbA(hex){
    let c;

    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c = hex.substring(1).split('');
        if(c.length === 3){
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', .9)';
    }
    throw new Error('Bad Hex');
  }

  render () {
    this.ctx.clearRect(this.x, this.y, this.cellSize, this.cellSize);

    if (this.type === 'false') return;

    // Converting Hex to RGBA in case of future opacity tweaking
    this.ctx.fillStyle = this.hexToRgbA(this.color);

    this.ctx.fillRect(this.x, this.y, this.cellSize, this.cellSize);
  }
}
