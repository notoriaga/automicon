const fs = require('fs');

const Jimp = require('jimp');
const PNG = require('pngjs').PNG;

const gameOfLife = require('./gameOfLife');

let NUM_BLOCKS = 8;
let BLOCK_SIZE = 16; // pixels

const md5 = (str) => {
  
  const crypto = require('crypto');
  return crypto.createHash('md5').update(str).digest("hex");

};

const pngFromArray = (arr) => {

  let png = new PNG({
    width: 128,
    height: 128
  });

  let currentColorY = -1;
  let currentColorX = -1;
  
  for (let y = 0; y < png.height; y++) {
  
    if (y % BLOCK_SIZE === 0) {
      currentColorY++;
    }
  
    for (let x = 0; x < png.width; x++) {
  
        if (x % BLOCK_SIZE === 0) {
          currentColorX++;
        }
  
        if (currentColorX === NUM_BLOCKS) {
          currentColorX = 0;
        }
  
        let idx = (png.width * y + x) << 2;
  
        png.data[idx] = arr[currentColorY][currentColorX];
        png.data[idx+1] = arr[currentColorY][currentColorX];
        png.data[idx+2] = arr[currentColorY][currentColorX];
        png.data[idx+3] = 155;
  
    }
  
  }

  return png;

};

const generateImage = (png, size = 256) => {

  png.pack().pipe(fs.createWriteStream('temp.png'));
  
  Jimp.read('temp.png', function (err, quarter) {
    
    let half = new Jimp(128, 256);
    let whole = new Jimp(256, 256);
  
    half.blit(quarter, 0 ,0)
        .blit(quarter.flip(false, true), 0, 128)
      
    whole.blit(half, 0, 0)
         .blit(half.flip(true, false), 128, 0)
         .write('test.png')
  
    fs.unlinkSync('temp.png');
  
  });

};

generateImage(pngFromArray(gameOfLife.run(NUM_BLOCKS, 100)));
