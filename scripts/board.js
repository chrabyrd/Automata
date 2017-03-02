import Cell from "./cell";

class Board {

  constructor (ctx) {
    const cells = [];
    this.ctx = ctx;
    this.cells = cells;

    this.populateGrid();
  }

  toggleCell (e, color) {
    const clickedCell = this.cells.find((cell) => {
      if (e.offsetX >= cell.xmin && e.offsetX <= cell.xmax) {
        if (e.offsetY >= cell.ymin && e.offsetY <= cell.ymax) {
          console.log(cell.id);
          return cell;
        }
      }
    });

    clickedCell.changeState(color);
  }

  populateGrid () {
    let y = 0;
    let id = 1;

    for (let i=0; i < 60; i++) {
      let x = 0;

      for (let j=0; j < 80; j++) {
        this.cells.push(new Cell(this.ctx, id, x, y));
        x += 10;
        id++;
      }

      y += 10;
    }
  }
}

export default Board;
