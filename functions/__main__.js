const fs = require('fs');
const createImage = require('../src/createImage');

/**
* @param {string} seed
* @returns {buffer}
*/
module.exports = (seed, context, callback) => {

  let options = {
      cellSize: 32,
      iterations: 5,
  };

  let strongOptions = validateOptions(options);

  let png = createImage(seed, strongOptions);

  if (context.service.environment === 'local') {
    fs.writeFileSync('test.png', png)
  }

  return callback(null, png, {'Content-Type': 'image/png'});

};

const validateOptions = (options) => {

  const isPositivePowerOfTwo = (n) => {
    return typeof n === 'number' ? n && (n & (n - 1)) === 0
                                 : false
  };

  const isNaturalNumber = (n) => {
    return n >>> 0 === parseFloat(n);
  };

  if (!isPositivePowerOfTwo(options.cellSize) || options.cellSize > 128 || options.cellSize < 16) {
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
