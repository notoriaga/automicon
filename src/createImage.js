const fs = require('fs');
const PNG = require('pngjs').PNG;

const gameOfLife = require('./gameOfLife');

const ITERATIONS = 5;

const FINAL_IMG_SIZE = 256;
const HALF_IMG_SIZE = FINAL_IMG_SIZE / 2;

const CELL_SIZE = 2 ** 5 ; // length of one side
const NUM_CELLS = HALF_IMG_SIZE / CELL_SIZE;

 module.exports = (seed = 'seed', options) => {

  let width = 4;
  let height = 8;
  let iterations = 5;
  let cellSize = 256 / height;


  function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  seed = randomString(5)
  let game = gameOfLife.run(height, width, iterations, seed);

  let png = pngFromGOLMatric(game, width, cellSize);

  return png;

};

const pngFromGOLMatric = (matrix, width, cellSize) => {

  let png = new PNG({
      height: FINAL_IMG_SIZE - 1,
      width: FINAL_IMG_SIZE - 1
    });

    let currentColorY = -1;
    let currentColorX = -1;

    for (let y = 0; y < png.height; y++) {

      if (y % cellSize === 0) {
        currentColorY++;
      }

      for (let x = 0; x < png.width / 2; x++) {

          if (x % cellSize === 0) {
            currentColorX++;
          }

          if (currentColorX === width) {
            currentColorX = 0;
          }

          let left = (png.width * y + x) << 2;
          let right = (png.width * y + (png.width - x)) << 2;

          png.data[left] = matrix[currentColorY][currentColorX].red;
          png.data[left+1] = matrix[currentColorY][currentColorX].green;
          png.data[left+2] = matrix[currentColorY][currentColorX].blue;
          png.data[left+3] = 255;


          png.data[right] = matrix[currentColorY][currentColorX].red;
          png.data[right+1] = matrix[currentColorY][currentColorX].green;
          png.data[right+2] = matrix[currentColorY][currentColorX].blue;
          png.data[right+3] = 255;

      }

    }

    let buffer = PNG.sync.write(png);

    return buffer;

};
