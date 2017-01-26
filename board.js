import Cell from "./cell";

class Board {

  constructor (ctx) {
    const cells = [];
    this.ctx = ctx;
    this.cells = cells;

    this.populateGrid();
  }

  toggleCell (e) {
    const clickedCell = this.cells.find((cell) => {
      if (e.offsetX >= cell.state.xmin && e.offsetX <= cell.state.xmax) {
        if (e.offsetY >= cell.state.ymin && e.offsetY <= cell.state.ymax) {
          return cell;
        }
      }
    });
    clickedCell.changeState();
  }

  populateGrid () {
    let y = 0;
    let id = 0;

    for (let i=0; i < 11; i++) {
      let x = 0;

      for (let j=0; j < 11; j++) {
        this.cells.push(new Cell(this.ctx, id, x, y));
        x += 50;
        id++;
      }
      y += 50;
    }
  }
}

export default Board;
