const gameOfLife = require('./gameOfLife');
const PNG = require('pngjs').PNG;
const fs = require('fs');
const crypto = require('crypto');
const Jimp = require('jimp');

let testString = 'apples'
let hash = crypto.createHash('md5').update(testString).digest("hex");

let png = new PNG({
  width: 128,
  height: 128
});

let numBlocks = 8;
let blockSize = 16; // pixels

let data = gameOfLife.run(numBlocks, 100)

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

      if (currentColorX === numBlocks) {
        currentColorX = 0;
      }

      let idx = (png.width * y + x) << 2;

      png.data[idx] = data[currentColorY][currentColorX];
      png.data[idx+1] = data[currentColorY][currentColorX];
      png.data[idx+2] = data[currentColorY][currentColorX];
      png.data[idx+3] = 155;

  }

}

png.pack().pipe(fs.createWriteStream('temp.png'));

Jimp.read('temp.png', function (err, quarter) {
  
  let half = new Jimp(128, 256);
  let whole = new Jimp(256, 256);

  half.blit(quarter, 0 ,0)
      .blit(quarter.flip(false, true), 0, 128)
    
  whole.blit(half, 0, 0)
       .blit(half.flip(true, false), 128, 0)
       .write('test.png')

});
