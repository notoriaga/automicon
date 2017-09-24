const crypto = require('crypto');

const DEAD = {red: 255, green: 255, blue: 255};
const ALIVE = pastel_colour(Math.random().toString(36).substring(10));

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

const rules = dayAndNight;


function pastel_colour(input_str) {
  
      //TODO: adjust base colour values below based on theme
      let baseRed = 128;
      let baseGreen = 128;
      let baseBlue = 128;
  
      //lazy seeded random hack to get values from 0 - 256
      //for seed just take bitwise XOR of first two chars
      let seed = input_str.charCodeAt(0) ^ input_str.charCodeAt(1);
      let rand_1 = Math.abs((Math.sin(seed++) * 10000)) % 256;
      let rand_2 = Math.abs((Math.sin(seed++) * 10000)) % 256;
      let rand_3 = Math.abs((Math.sin(seed++) * 10000)) % 256;
  
      return { red: Math.round((rand_1 + baseRed) / 2), 
               green: Math.round((rand_2 + baseGreen) / 2), 
               blue:  Math.round((rand_3 + baseBlue) / 2)};
}
  

const sha256 = (str) => {
  
  return crypto.createHash('md5').update(str).digest('hex');

};


function hex2bin(hex)
{
    var bytes = [], str;

    for(var i=0; i< hex.length-1; i+=2)
        bytes.push(parseInt(hex.substr(i, 2), 16));

    return String.fromCharCode.apply(String, bytes);    
}

const hashToAD = (hash, size) => {
  
  let possibleChars = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let seed = hash.slice(0, size ** 2).split('');

  return seed.map((char) => {

    return possibleChars.indexOf(char) <= 7 ? ALIVE : DEAD;

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

function run(size, iterations, seed) {

    let bits = ((size) => {
      let bits = [];
      for (let i  = 0; i < (size ** 2) * 2; i++) {
        bits.push(
          Math.round(Math.random()) === 0 ? DEAD : ALIVE
        );
      }
      return bits
    })(size)
    
    //let board = toMatrix(hashToAD(sha256(seed), size), size);
    let board = toMatrix(bits, size)
    console.log(board.length,board[0].length, board[board.length - 1].length)
    
    while (iterations > 0) {
      board = evolve(board);
      iterations--;
    }
    
    return board;
  
  }
  

module.exports.run = run;
