const fs = require('fs');
const PNG = require('pngjs').PNG;

const gameOfLife = require('./gameOfLife');

const ITERATIONS = 10;
// const NUM_BLOCKS = 8;
// const BLOCK_SIZE = 16; // pixels
// const IMG_SIZE = 256; 


const FINAL_IMG_SIZE = 256; 
const CORNER_IMG_SIZE = FINAL_IMG_SIZE / 2; 

const CELL_SIZE = 16; // length of one side
const NUM_CELLS = CORNER_IMG_SIZE / CELL_SIZE; 
console.log(NUM_CELLS)

const pngFromArray = (arr) => {

  let png = new PNG({
      width: FINAL_IMG_SIZE - 1,
      height: FINAL_IMG_SIZE - 1 
    });  
  
    let currentColorY = -1;
    let currentColorX = -1;
    
    for (let y = 0; y < png.height / 2; y++) {
    
      if (y % CELL_SIZE === 0) {
        currentColorY++;
      }
    
      for (let x = 0; x < png.width / 2; x++) {
    
          if (x % CELL_SIZE === 0) {
            currentColorX++;
          }
    
          if (currentColorX === NUM_CELLS) {
            currentColorX = 0;
          }

          let idx1 = (png.width * y + x) << 2;
          let idx2 = (png.width * y + (png.width - x)) << 2;
          let idx3 = (png.width * (png.height - y) + x) << 2;
          let idx4 = (png.width * (png.height - y) + (png.width - x)) << 2;

          png.data[idx1] = arr[currentColorY][currentColorX];
          png.data[idx1+1] = arr[currentColorY][currentColorX];
          png.data[idx1+2] = arr[currentColorY][currentColorX];
          png.data[idx1+3] = 255;

          png.data[idx2] = arr[currentColorY][currentColorX];
          png.data[idx2+1] = arr[currentColorY][currentColorX];
          png.data[idx2+2] = arr[currentColorY][currentColorX];
          png.data[idx2+3] = 255;

          png.data[idx3] = arr[currentColorY][currentColorX];
          png.data[idx3+1] = arr[currentColorY][currentColorX];
          png.data[idx3+2] = arr[currentColorY][currentColorX];
          png.data[idx3+3] = 255;

          png.data[idx4] = arr[currentColorY][currentColorX];
          png.data[idx4+1] = arr[currentColorY][currentColorX];
          png.data[idx4+2] = arr[currentColorY][currentColorX];
          png.data[idx4+3] = 255;
    
      }
    
    }
    
    png.pack().pipe(fs.createWriteStream("test.png"));
  
  };

const pngFromArray2 = (arr) => {

  let png = new PNG({
      width: FINAL_IMG_SIZE - 1,
      height: FINAL_IMG_SIZE - 1 
    });  
  
    let currentColorY = -1;
    let currentColorX = -1;
    
    for (let y = 0; y < png.height; y++) {
    
      if (y % CELL_SIZE === 0) {
        currentColorY++;
      }
    
      for (let x = 0; x < png.width / 2; x++) {
    
          if (x % CELL_SIZE === 0) {
            currentColorX++;
          }
    
          if (currentColorX === NUM_CELLS) {
            currentColorX = 0;
          }

          let idx1 = (png.width * y + x) << 2;
          let idx2 = (png.width * y + (png.width - x)) << 2;

          png.data[idx1] = arr[currentColorY][currentColorX].red;
          png.data[idx1+1] = arr[currentColorY][currentColorX].green;
          png.data[idx1+2] = arr[currentColorY][currentColorX].blue;
          png.data[idx1+3] = 255;

          png.data[idx2] = arr[currentColorY][currentColorX].red;
          png.data[idx2+1] = arr[currentColorY][currentColorX].green;
          png.data[idx2+2] = arr[currentColorY][currentColorX].blue;
          png.data[idx2+3] = 255;

    
      }
    
    }
    
    png.pack().pipe(fs.createWriteStream("test.png"));
  
  };


let seed = 'h.png';

let game = gameOfLife.run(NUM_CELLS, ITERATIONS, seed);
let png = pngFromArray2(game);