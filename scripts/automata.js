import CellLogic from './cellLogic';

class Automata {
  constructor (board) {
    this.board = board;
    this.livingCells = {};
    this.changingCells = {};
    this.dyingCells = [];
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  cellLogic (conditionalHash) {

    this.shuffle(this.dyingCells).forEach(cell => {
      let cellLogic = new CellLogic(this.changingCells, this.board.cells, cell);
      cellLogic.live(conditionalHash);

      cell.neighbors.forEach(id => {
        if (this.livingCells[id]) return;
        this.livingCells[id] = this.board.cells[id];
      });
    });

    this.dyingCells = [];

    this.shuffle(Object.values(this.livingCells)).forEach(cell => {
      if (this.changingCells[cell.id]) return;
      let cellLogic = new CellLogic(this.changingCells, this.board.cells, cell);
      cellLogic.live(conditionalHash);
    });

    this.livingCells = {};

    Object.keys(this.changingCells).forEach(key => {
      this.board.cells[key].changeState(this.changingCells[key],
        conditionalHash[this.changingCells[key]].color);

      this.dyingCells.push(this.board.cells[key]);
    });

    this.changingCells = {};
  }
}

export default Automata;
