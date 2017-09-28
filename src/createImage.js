const fs = require('fs');
const PNG = require('pngjs').PNG;

const gameOfLife = require('./gameOfLife');

const FINAL_IMG_SIZE = 256;

module.exports = (seed, options) => {

  let iterations = options.iterations;
  let cellSize = options.cellSize;

  let height = FINAL_IMG_SIZE / cellSize;
  let width = (FINAL_IMG_SIZE / 2) / cellSize;

  let GOLMatrix = gameOfLife.run(height, width, iterations, seed);

  return pngFromGOLMatrix(GOLMatrix, cellSize);

};

const pngFromGOLMatrix = (matrix, cellSize) => {

  let png = new PNG({
      height: FINAL_IMG_SIZE,
      width: FINAL_IMG_SIZE
    });

  let currentCellY = 0;
  let currentCellX = 0;

  for (let y = 0; y < png.height; y++) {

    currentCellX = 0;

    if (y % cellSize === 0 && y !== 0) {
      currentCellY++;
    }

    for (let x = 0; x < png.width; x++) {

        if (x % cellSize === 0 && x !== 0) {
          currentCellX++;
        }

        let writeIndex = (png.width * y + x) << 2;

        png.data[writeIndex] = matrix[currentCellY][currentCellX].red;
        png.data[writeIndex + 1] = matrix[currentCellY][currentCellX].green;
        png.data[writeIndex + 2] = matrix[currentCellY][currentCellX].blue;
        png.data[writeIndex + 3] = 255; // alpha

    }

  }

  let buffer = PNG.sync.write(png);

  return buffer;

};
