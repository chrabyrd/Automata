import Cell from "./cell";

class Board {

  constructor (ctx, cellSize, gridWidth, gridHeight) {
    this.ctx = ctx;
    this.cells = [];
    this.populateGrid(cellSize, gridWidth, gridHeight);
  }

  toggleCell (e, type, color) {
    const clickedCell = this.cells.find((cell) => {
      if (e.offsetX >= cell.xmin && e.offsetX <= cell.xmax) {
        if (e.offsetY >= cell.ymin && e.offsetY <= cell.ymax) {
          return cell;
        }
      }
    });

    clickedCell.changeState(type, color);
  }

  populateGrid (cellSize, gridWidth, gridHeight) {
    const maxWidthCellCount = gridWidth / (Math.pow(cellSize, 2));
    const maxHeightCellCount = gridHeight / (Math.pow(cellSize, 2));
    let y = 0;
    let id = 0;

    for (let i=0; i < (cellSize * maxHeightCellCount); i++) {
      let x = 0;

      for (let j=0; j < (cellSize * maxWidthCellCount); j++) {
        this.cells.push(
          new Cell(this.ctx, gridWidth, gridHeight, cellSize, id, x, y)
        );
        x += cellSize;
        id++;
      }

      y += cellSize;
    }
  }
}

export default Board;
