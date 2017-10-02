const fs = require('fs');
const PNG = require('pngjs').PNG;

const gameOfLife = require('./gameOfLife');

const FINAL_IMG_SIZE = 256;
const DEAD = {
  red: 239,
  green: 239,
  blue: 239
};

module.exports = (seed, options) => {

  let iterations = options.iterations;
  let cellSize = options.cellSize;

  let height = FINAL_IMG_SIZE / cellSize;
  let width = (FINAL_IMG_SIZE / 2) / cellSize;

  let GOLMatrix = gameOfLife.run(height, width, iterations, seed);

  return pngFromGOLMatrix(GOLMatrix, cellSize);

};

const pngFromGOLMatrix = (matrix, cellSize) => {

  const emptyRow = (row) => {
    return row.every(cell => JSON.stringify(cell) === JSON.stringify(DEAD));
  };

  let topMargin = matrix.findIndex((row) => {
    return !emptyRow(row)
  });

  let bottomMargin = matrix.slice()
                           .reverse()
                           .findIndex((row) => {
                             return !emptyRow(row)
                           });

  let offset = Math.trunc((topMargin + bottomMargin) / 2 * cellSize); // centers the cells vertically

  matrix = matrix.slice(topMargin, matrix.length - bottomMargin + 1)

  let png = new PNG({
      height: FINAL_IMG_SIZE,
      width: FINAL_IMG_SIZE
    });

  // draw background
  for (let y = 0; y < png.height; y++) {

    for (let x = 0; x < png.width; x++) {

        let writeIndex = (png.width * y + x) << 2;

        png.data[writeIndex] = DEAD.red;
        png.data[writeIndex + 1] = DEAD.green;
        png.data[writeIndex + 2] = DEAD.blue;
        png.data[writeIndex + 3] = 255; // alpha

    }

  }

  let currentCellY = 0;
  let currentCellX = 0;

  for (let y = offset; y < png.height - offset; y++) {

    currentCellX = 0;

    if ((y - offset) % cellSize === 0 && (y - offset) !== 0) {
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
