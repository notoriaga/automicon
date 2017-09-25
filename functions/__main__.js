const fs = require('fs');
const createImage = require('../src/createImage');

/**
* @param {string} seed
* @param {object} options
* @returns {any}
*/
module.exports = (seed, options, context, callback) => {

  let strongOptions = validateOptions(options);
  let png = createImage(seed, strongOptions);

  png.pack().pipe(fs.createWriteStream("test.png"));

  return callback(null);

};


const validateOptions = (options) => {

  const isPowerOfTwo = (param) => {

    return typeof n === 'number' ? n && (n & (n - 1)) === 0
                                 : false

  }

  return {

    width: options.width || 256,
    height: options.height || 256,
    cellSize: isPowerOfTwo(options.cellSize) ? options.cellSize
                                             : 32
  };

};
