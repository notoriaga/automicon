const fs = require('fs');
const createImage = require('../src/createImage');
const PNG = require('pngjs').PNG;

/**
* @param {string} seed
* @param {object} options
* @returns {any}
*/
module.exports = (seed, options = {
    height: 256,
    width: 256,
    cellSize: 32,
    iterations: 5,
    rules: 'walls'
  }, context, callback) => {

  let strongOptions = validateOptions(options);

  let png = createImage(seed, strongOptions);

  let buffer = PNG.sync.write(png);

  return callback(null, buffer);

};


const validateOptions = (options) => {

  const isPowerOfTwo = (n) => {
    return typeof n === 'number' ? n && (n & (n - 1)) === 0
                                 : false
  };

  const isNaturalNumber = (n) => {
    return n >>> 0 === parseFloat(n);
  };

  const rules = [
    'conway',
    'serviettes',
    'maze',
    'walls',
    'walledCity',
    'lifeWithoutDeath',
    'dayAndNight',
    'diamoeba'
  ]

  if (options.width % options.cellSize !== 0) {
    //bad
  }

  if (options.height % options.cellSize !== 0) {
    //bad
  }

  if (!isPowerOfTwo(options.cellSize)) {
    //bad
  }

  if (!isNaturalNumber(options.iterations)) {
    //bad
  }

  if (rules.indexOf(options.rules) < 0) {
    //bad
  }

  return {

    width: options.width || 256,
    height: options.height || 256,
    cellSize: isPowerOfTwo(options.cellSize) ? options.cellSize
                                             : 32
  };

};



//for (let i = 0; i < 100; i++) {
  let png = createImage('a', {});
  fs.writeFileSync(`out.png`, png)
//}
