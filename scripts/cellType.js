class CellType {
  constructor (cellList, changingCells, id) {
    this.id = id;
    this.changingCells = changingCells;
    this.cells = cellList;
    this.cellNeighbors = this.cells[id].neighbors;
    this.type = this.cells[id].type;
    this.typeHash = { "typeOne": 0, "typeTwo": 0, "typeThree": 0 };
    this.cellNeighbors.forEach(num => {this.typeHash[this.cells[num].type]++;});
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getValidNeighbors (cellTypeArray) {
    let validNeighbors = this.cellNeighbors;
    let changingCells = this.changingCells;
    let cells = this.cells;

    validNeighbors = this.cellNeighbors.filter(function(cell) {
      return !changingCells[cell];
    });

    if (!cellTypeArray) return validNeighbors;

    validNeighbors = validNeighbors.filter(function(cell) {
      let isValid = false;
      cellTypeArray.forEach(neighborType => {
        if (cells[cell].type === neighborType) isValid = true;
      });
      return isValid;
    });

    return validNeighbors;
  }

  wander (array) {
    const nextCell = this.random(array);
    this.changingCells[nextCell] = this.type;
    this.changingCells[this.id] = false;
  }

  stay () {
    this.changingCells[this.id] = this.type;
  }

  reproduce (array) {
    const nextCell = this.random(array);
    this.changingCells[nextCell] = this.type;
  }

  die () {
    this.changingCells[this.id] = false;
  }

  live (conditionalHash) {
    const type = this.type;
    const typeHash = this.typeHash;

    const validNeighbors = this.getValidNeighbors(conditionalHash[type]['neighborArray']);

    if (eval(conditionalHash[type]['conditions']['skipCon'])) {
      return;
    } else if (eval(conditionalHash[type]['conditions']['dieCon'])) {
      this.die();
    } else if (eval(conditionalHash[type]['conditions']['stayCon'])) {
      this.stay();
    } else if (eval(conditionalHash[type]['conditions']['reproduceCon'])) {
      if (eval(conditionalHash[type]['conditions']['wanderCon'])) this.wander(validNeighbors);
      this.reproduce(validNeighbors);
    } else if (eval(conditionalHash[type]['conditions']['wanderCon'])) {
      this.wander(validNeighbors);
    }

  }

}

export default CellType;
