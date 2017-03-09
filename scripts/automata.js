import CellLogic from './cellLogic';

class Automata {
  constructor (board) {
    this.board = board;
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
    let changingCells = {};
    const cells = this.board.cells;
    const shuffledCells = this.shuffle(cells.map(cell => cell.id));

    shuffledCells.forEach(id => {
      let cellLogic = new CellLogic(cells, changingCells, id);
      cellLogic.live(conditionalHash);
    });

    Object.keys(changingCells).forEach(key => {
      cells[key].changeState(changingCells[key]);
    });
  }
}

export default Automata;
