const defaultHash = {
  'typeOne': {
    'name': 'A',
    'color': '#FF0000',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0`,
      'dieCon': `Math.random() * 100 < 0`,
      'stayCon': `Math.random() * 100 < 0`,
      'wanderCon': `Math.random() * 100 < 0`,
      'reproduceCon': `Math.random() * 100 < 0`
    },
    'neighborHash': {
      'typeOne': true,
      'typeTwo': true,
      'typeThree': true,
      'typeFour': true,
      'false': true
    }
  },

  'typeTwo': {
    'name': 'B',
    'color': '#FFA500',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0`,
      'dieCon': `Math.random() * 100 < 0`,
      'stayCon': `Math.random() * 100 < 0`,
      'wanderCon': `Math.random() * 100 < 0`,
      'reproduceCon': `Math.random() * 100 < 0`
    },
    'neighborHash': {
      'typeOne': true,
      'typeTwo': true,
      'typeThree': true,
      'typeFour': true,
      'false': true
    }
  },

  'typeThree': {
    'name': 'C',
    'color': '#FFFF00',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0`,
      'dieCon': `Math.random() * 100 < 0`,
      'stayCon': `Math.random() * 100 < 0`,
      'wanderCon': `Math.random() * 100 < 0`,
      'reproduceCon': `Math.random() * 100 < 0`
    },
    'neighborHash': {
      'typeOne': true,
      'typeTwo': true,
      'typeThree': true,
      'typeFour': true,
      'false': true
    }
  },

  'typeFour': {
    'name': 'D',
    'color': '#0000FF',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0`,
      'dieCon': `Math.random() * 100 < 0`,
      'stayCon': `Math.random() * 100 < 0`,
      'wanderCon': `Math.random() * 100 < 0`,
      'reproduceCon': `Math.random() * 100 < 0`
    },
    'neighborHash': {
      'typeOne': true,
      'typeTwo': true,
      'typeThree': true,
      'typeFour': true,
      'false': true
    }
  },

  'false': {
    'name': 'false',
    'color': 'rgba(255, 255, 255, 0)',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100`,
      'dieCon': `Math.random() * 100 < 0`,
      'stayCon': `Math.random() * 100 < 0`,
      'wanderCon': `Math.random() * 100 < 0`,
      'reproduceCon': `Math.random() * 100 < 0`
    },
    'neighborHash': {
      'typeOne': false,
      'typeTwo': false,
      'typeThree': false,
      'typeFour': false,
      'false': true
    }
  }
};

export default defaultHash;
