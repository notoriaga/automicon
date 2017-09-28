const crypto = require('crypto');

const ALIVE = require('./generateColor')();
const DEAD = {
  red: 223,
  green: 223,
  blue: 223
};

const RULES_ARRAY = [
  [  // conway
    [2, 3], // survive
    [3]     // born
  ],
  [  // maze
    [1, 2, 3, 4, 5],
    [3]
  ],
  [ // walls
    [2, 3, 4],
    [4, 5, 6, 7, 8]
  ],
  [ // walledCity
    [2, 3, 4, 5],
    [4, 5, 6, 7, 8]
  ],
  [ // lifeWithoutDeath
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [3]
  ],
  [ // dayAndNight
    [3, 4, 6, 7, 8],
    [3, 6, 7, 8]
  ],
  [ // diamoeba
    [5, 6, 7, 8],
    [3, 5, 6, 7, 8]
  ]
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

let THRESHOLD = 7;


const evolve = (board, rules) => {

  return board.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      return evolveCell(board, rules, cell, rowIndex, colIndex);
    });
  });

};

const evolveCell = (board, rules, cell, rowIndex, colIndex) => {

  let neighborCount = getAliveNeighbors(board, rowIndex, colIndex);

  if (cell === ALIVE && rules[0].indexOf(neighborCount) > -1) {
    // survive
    return ALIVE;
  }

  if (cell === DEAD && rules[1].indexOf(neighborCount) > -1) {
    // born
    return ALIVE;
  }

  return DEAD;

};

const getAliveNeighbors = (board, row, col) => {

  let count = 0;

  neighbors.forEach(neighbor => {

    if (
      board[row + neighbor[0]] &&
      board[row + neighbor[0]][col + neighbor[1]] === ALIVE
    ) {
      count++;
    }

  });

  return count;

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

const pickRules = (hashArray) => {

  let index = parseInt(`0x${hashArray[0]}`) % RULES_ARRAY.length;
  return RULES_ARRAY[index];

};

const run = (height, width, iterations, seed) => {

    let numCells = height * width;

    let hashArray = hash(seed, numCells);
    let rules = pickRules(hashArray)
    let board = toMatrix(toAliveOrDead(hashArray), width);

    while (iterations > 0) {
      board = evolve(board, rules);
      iterations--;
    }

    let numAlive = board.reduce((acc, row) => {
      return acc + row.filter(cell => cell === ALIVE).length;
    }, 0);

    if (numAlive < 10 || (numCells - numAlive) < 10) {
      // if there are not enough, or too many, cells alive try again
      return run(height, width, iterations, seed + seed[0]);
    }

    let fullBoard = board.map((row) => {
      // mirror along vertical axis
      return row.concat(row.slice().reverse());
    });

    return fullBoard;

  }


module.exports.run = run;
