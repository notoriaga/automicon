const crypto = require('crypto');

let ALIVE;
const DEAD = {
  red: 239,
  green: 239,
  blue: 239
};

const RULES = [
    [3], // Born
    [0, 1, 2, 3, 4, 5, 6, 7, 8] // Survive
];

const neighbors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

let THRESHOLD = 5;

const runAutonoma = (states, iterationsLeft, rules) => {

  if (iterationsLeft <= 0) {
    return states;
  }

  let nextStates = evolve(states, rules);

  return runAutonoma(nextStates, iterationsLeft - 1, rules)

};

const evolve = (states, rules) => {

  return states.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      return evolveCell(states, rules, cell, rowIndex, colIndex);
    });
  });

};

const evolveCell = (states, rules, cell, rowIndex, colIndex) => {

  let numAliveNeighbors = getAliveNeighbors(states, rowIndex, colIndex);

  if (cell === DEAD && rules[0].indexOf(numAliveNeighbors) > -1) {
    // born
    return ALIVE;
  }

  if (cell === ALIVE && rules[1].indexOf(numAliveNeighbors) > -1) {
    // survive
    return ALIVE;
  }

  return DEAD;

};

const getAliveNeighbors = (states, row, col) => {

  return neighbors.reduce((count, neighbor) => {
    if (
      states[row + neighbor[0]] &&
      states[row + neighbor[0]][col + neighbor[1]] === ALIVE
    ) {
      return count += 1;
    }
    return count;
  }, 0);

};

const hash = (seed, length) => {

  return crypto.createHash('sha512')
               .update(seed)
               .digest("hex")
               .slice(0, length)
               .split('');

};

const toAliveOrDead = (hash) => {

  return hash.map((hexChar) => {

    return parseInt(`0x${hexChar}`) <= THRESHOLD ? ALIVE : DEAD;

  })

};

const toMatrix = (arr, width) => {

  return arr.reduce((rows, val, index) => {

    return (index % width === 0 ? rows.push([val])
                                : rows[rows.length - 1].push(val)) && rows;

  }, []);

};

const run = (height, width, iterations, seed) => {

    let numCells = height * width;

    let hashArray = hash(seed, numCells);
    ALIVE = require('./generateColor')(parseInt(`0x${hashArray[0]}`) / 16);

    let states = toMatrix(toAliveOrDead(hashArray), width);

    let finalStates = runAutonoma(states, iterations, RULES);

    return finalStates.map((row) => {
      // mirror along vertical axis
      return row.concat(row.slice().reverse());
    });

  }


module.exports.run = run;
