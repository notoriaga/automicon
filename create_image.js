const gameOfLife = require('./gameOfLife');
const PNG = require('pngjs').PNG;
const fs = require('fs');
const crypto = require('crypto');

let testString = 'apples'
let hash = crypto.createHash('md5').update(testString).digest("hex");

let png = new PNG({
  width: 128,//256,
  height: 128//256,
  //filterType: -1
});

let gameOfLifeSize = 8
let blockSize = 16;
let data = gameOfLife.run(gameOfLifeSize, 50)

let currentColorY = -1;
let currentColorX = -1;

for (let y = 0; y < png.height; y++) {

  if (y % blockSize === 0) {
    currentColorY++;
  }

  for (let x = 0; x < png.width; x++) {

      if (x % blockSize === 0) {
        currentColorX++;
      }

      if (currentColorX === gameOfLifeSize) {
        currentColorX = 0;
      }

      let idx = (png.width * y + x) << 2;

      png.data[idx] = data[currentColorY][currentColorX];
      png.data[idx+1] = data[currentColorY][currentColorX];
      png.data[idx+2] = data[currentColorY][currentColorX];
      png.data[idx+3] = 155;

  }

}

png.pack().pipe(fs.createWriteStream('newOut.png'));
