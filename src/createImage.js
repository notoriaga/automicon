const fs = require('fs');
const PNG = require('pngjs').PNG;

const gameOfLife = require('./gameOfLife');

const ITERATIONS = 5;

const FINAL_IMG_SIZE = 256;
const HALF_IMG_SIZE = FINAL_IMG_SIZE / 2;

const CELL_SIZE = 2 ** 5 ; // length of one side
const NUM_CELLS = HALF_IMG_SIZE / CELL_SIZE;

 module.exports = (seed = 'seed', options) => {

  let game = gameOfLife.run(NUM_CELLS, ITERATIONS, seed);

  return pngFromMatrix(game);

};

const pngFromMatrix = (arr) => {

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

    return png;

};

let seed = 'dfalkjs'
let width = 4;
let height = 8;

let game = gameOfLife.run(height, width, ITERATIONS, seed);
let png = pngFromMatrix(game);

png.pack().pipe(fs.createWriteStream("test.png"));
