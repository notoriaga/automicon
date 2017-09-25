const crypto = require('crypto');

const generateColor = require('./generateColor');

const DEAD = {red: 223, green: 223, blue: 223};
const ALIVE = generateColor();

const conway = [
  [2, 3], //survive
  [3] //born
];
const serviettes = [
  [],
  [2, 3, 4]
];
const maze = [
  [1,2,3,4,5],
  [3]
];
const maze2 = [
  [1,2,3,4],
  [3]
];
const walls = [
  [2,3,4],
  [4,5,6,7,8]
];
const walledCity = [
  [2,3,4,5],
  [4,5,6,7,8]
];
const lifeWithoutDeath = [
  [0,1,2,3,4,5,6,7,8],
  [3]
];
const dayAndNight = [
  [3,4,6,7,8],
  [3,6,7,8]
];
const diamoeba = [
  [5,6,7,8],
  [3,5,6,7,8]
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

const rules = walls;

const toCells = (hash) => {

  return hash.map((hexChar) => {

    return parseInt(`0x${hexChar}`) <= 7 ? ALIVE : DEAD;

  })

};

const toMatrix = (arr, width) =>
  arr.reduce(
    (rows, key, index) =>
      (index % width == 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );

function evolve(board) {

  return board.map((row, row_i) => {
    return row.map((cell, col_i) => {
      return evolveCell(board, row_i, col_i);
    });
  });

}

function evolveCell(board, row, col) {

  let neighborCount = getCellNeighbors(board, row, col);
  return applyRules(board[row][col], neighborCount, rules);

}

function applyRules(cell, neighborCount, rules) {

  if (cell === ALIVE && rules[0].indexOf(neighborCount) > -1) {
    // survive
    return ALIVE;
  }

  if (cell === DEAD && rules[1].indexOf(neighborCount) > -1) {
    // born
    return ALIVE;
  }

  return DEAD;

}

function getCellNeighbors(board, row, col) {

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

}

const randomString = (size) => {

  return crypto.randomBytes(size / 2)
               .toString('hex')
               .split('');

};

const hash = (seed, length) => {

  return crypto.createHash('sha512')
               .update(seed)
               .digest("hex")
               .slice(0, length)
               .split('');
};

function run(size, iterations, seed) {

    //seed = toCells(randomString((size ** 2) * 2));
    console.log(size ** 2 * 2, ' cell');

//    let board = toMatrix(seed, size)
    let board = toMatrix(toCells(hash(seed)), size)

    while (iterations > 0) {
      board = evolve(board);
      iterations--;
    }

    let numAlive = board.reduce((acc, row) => {
      return acc + row.filter(cell => cell === ALIVE).length;
    }, 0);

    console.log(numAlive, ' alive')
    if (numAlive < 5 ) {
      return run(size, iterations, seed);
    }

    return board;

  }


module.exports.run = run;
