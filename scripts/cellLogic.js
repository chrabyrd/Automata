export default class CellLogic {
  constructor (changingCells, cellList, cell) {
    this.cell = cell;
    this.cellList = cellList;
    this.changingCells = changingCells;
  }

  random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getValidNeighbors (cellTypeArray) {
    let validNeighbors = this.cell.neighbors;
    let changingCells = this.changingCells;

    validNeighbors = validNeighbors.filter(neighbor => {
      let isValid = false;
      cellTypeArray.forEach(type => {
        if (this.cellList[neighbor].type === type && !changingCells[neighbor]) {
          isValid = true;
        }
      });
      return isValid;
    });

    return validNeighbors;
  }

  wander (array) {
    const nextCell = this.random(array);
    this.changingCells[nextCell] = this.cell.type;
    this.changingCells[this.cell.id] = 'false';
  }

  stay () {
    this.changingCells[this.cell.id] = this.cell.type;
  }

  reproduce (array) {
    // console.log(array);
    const nextCell = this.random(array);
    this.changingCells[nextCell] = this.cell.type;
  }

  die () {
    this.changingCells[this.cell.id] = 'false';
  }

  live (conditionalHash) {
    if (this.changingCells[this.cell.id]) return;

    const type = this.cell.type;
    const typeHash = {};

    const neighborTypes = Object.keys(conditionalHash[type]['neighborHash']);

    const validTypesWithFalse = neighborTypes.filter(function(neighborType) {
      return conditionalHash[type]['neighborHash'][neighborType] === true;
    });

    const validTypesWithoutFalse = neighborTypes.filter(function(neighborType) {
      const currentType = conditionalHash[type]['neighborHash'][neighborType];

      if (currentType === true && neighborType !== 'false') return true;
    });

    const validNeighborsWithFalse = this.getValidNeighbors(validTypesWithFalse);
    const validNeighborsWithoutFalse = this.getValidNeighbors(validTypesWithoutFalse);

    const totalNeighbors = this.cell.neighbors.filter(id => {
      return this.cellList[id].type !== 'false';
    });

    neighborTypes.forEach(function(neighborType) {
      typeHash[neighborType] = 0;
    });

    this.cell.neighbors.forEach(num => {typeHash[this.cellList[num].type]++;});

    if (eval(conditionalHash[type]['conditions']['skipCon'])) {
      return;
    } else if (eval(conditionalHash[type]['conditions']['dieCon'])) {
      this.die();
    } else if (eval(conditionalHash[type]['conditions']['reproduceCon'])) {
      this.reproduce(validNeighborsWithFalse);
    } else if (eval(conditionalHash[type]['conditions']['wanderCon'])) {
      this.wander(validNeighborsWithFalse);
    } else {
      this.stay();
    }

  }

}
