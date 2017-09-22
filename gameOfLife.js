const dead = '255';
const alive = '0';

const conway = [
  [2, 3], //survive
  [3] //born
];
const serviettes = [[], [2, 3, 4]];

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

const rules = serviettes;

function run(size, iterations) {

  let board = binarygrid(size);
  
  while (iterations > 0) {
    board = evolve(board);
    iterations--;
  }
  
  return board;

}

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
  
  if (cell === alive && rules[0].indexOf(neighborCount) > -1) {
    // survive
    return alive;
  }

  if (cell === dead && rules[1].indexOf(neighborCount) > -1) {
    // born
    return alive;
  }

  return dead;

}

function getCellNeighbors(board, row, col) {

  let count = 0;

  neighbors.forEach(neighbor => {
    
    if (
      board[row + neighbor[0]] &&
      board[row + neighbor[0]][col + neighbor[1]] === alive
    ) {
      count++;
    }

  });

  return count;

}

function binarygrid(size) {

  let grid = [];
  
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      if (Math.random() > 0.9) {
        row.push(alive);
      } else {
        row.push(dead);
      }
    }
    grid.push(row);
  }

  return grid;

}

module.exports.run = run;
