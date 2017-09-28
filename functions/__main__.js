const fs = require('fs');
const createImage = require('../src/createImage');
const PNG = require('pngjs').PNG;

/**
* @param {string} seed
* @param {object} options
* @returns {any}
*/
module.exports = (seed, options = {
    cellSize: 32,
    iterations: 5,
  }, context, callback) => {

  let strongOptions = validateOptions(options);

  let png = createImage(seed, strongOptions);

  if (context.service.environment === 'local') {
    fs.writeFileSync(`${seed}.png`, png);
    return callback(null, `Image saved ${seed}.png`);
  }

  return callback(null, png);

};

const validateOptions = (options) => {

  const isPositivePowerOfTwo = (n) => {
    return typeof n === 'number' ? n && (n & (n - 1)) === 0
                                 : false
  };

  const isNaturalNumber = (n) => {
    return n >>> 0 === parseFloat(n);
  };

  if (!isPositivePowerOfTwo(options.cellSize) || options.cellSize > 128) {
    throw new Error(`Invalid parameter for cellsize: ${options.cellSize}`);
  }

  if (!isNaturalNumber(options.iterations)) {
    throw new Error(`Invalid parameter for iterations: ${options.iterations}`);
  }

  return {
    cellSize: options.cellSize,
    iterations: options.iterations
  };

};
