export const defaultHash = {
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

export const demoHash = {
  'typeOne': {
    'name': 'Grass',
    'color': '#507F2C',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0`,
      'dieCon': `Math.random() * 100 < 0`,
      'stayCon': `Math.random() * 100 < 0`,
      'wanderCon': `Math.random() * 100 < 0`,
      'reproduceCon': `Math.random() * 100 < 100`
    },
    'neighborHash': {
      'typeOne': false,
      'typeTwo': false,
      'typeThree': false,
      'typeFour': false,
      'false': true
    }
  },

  'typeTwo': {
    'name': 'Sheep',
    'color': '#2552B2',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0`,
      'dieCon': `Math.random() * 100 < 100 && typeHash['typeOne'] === 0`,
      'stayCon': `Math.random() * 100 < 33`,
      'wanderCon': `Math.random() * 100 < 50`,
      'reproduceCon': `Math.random() * 100 < 25 && typeHash['typeTwo'] > 0 && typeHash['typeOne'] > 2`
    },
    'neighborHash': {
      'typeOne': true,
      'typeTwo': false,
      'typeThree': false,
      'typeFour': false,
      'false': true
    }
  },

  'typeThree': {
    'name': 'Human',
    'color': '#FF851B',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0`,
      'dieCon': `Math.random() * 100 < 100 && validNeighborsWithoutFalse.length === 0`,
      'stayCon': `Math.random() * 100 < 33`,
      'wanderCon': `Math.random() * 100 < 100`,
      'reproduceCon': `Math.random() * 100 < 25 && typeHash['typeThree'] > 0 && validNeighborsWithoutFalse.length > 2`
    },
    'neighborHash': {
      'typeOne': true,
      'typeTwo': true,
      'typeThree': false,
      'typeFour': false,
      'false': true
    }
  },

  'typeFour': {
    'name': 'Fence',
    'color': '#654321',
    'conditions': {
      'skipCon': `Math.random() * 100 < 100 && validNeighborsWithFalse.length === 0`,
      'dieCon': `Math.random() * 100 < 0`,
      'stayCon': `Math.random() * 100 < 100`,
      'wanderCon': `Math.random() * 100 < 0`,
      'reproduceCon': `Math.random() * 100 < 0`
    },
    'neighborHash': {
      'typeOne': true,
      'typeTwo': false,
      'typeThree': false,
      'typeFour': false,
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
