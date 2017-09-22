const gameOfLife = require('./gameOfLife');
const PNG = require('pngjs').PNG;
const fs = require('fs');

let png = new PNG({
  width: 256,
  height: 256,
  //filterType: -1
});


let data = gameOfLife.run(16, 50)

let currentColorY = -1;
let currentColorX = -1; 

for (let y = 0; y < png.height; y++) {
  
  if (y % 16 === 0) {
    currentColorY++;
    currentColorX = 0;
  }
  
  for (let x = 0; x < png.width; x++) {

      if (x % 16 === 0) {
        currentColorX++;
      }
      console.log(data[currentColorY][currentColorX % 16], currentColorY, currentColorX % 16)
      let idx = (png.width * y + x) << 2;
      png.data[idx] = data[currentColorY][currentColorX % 16];
      png.data[idx+1] = data[currentColorY][currentColorX % 16];
      png.data[idx+2] = data[currentColorY][currentColorX % 16];
      png.data[idx+3] = 255;
  }

}

png.pack().pipe(fs.createWriteStream('newOut.png'));

// 16 * 16, 16 * 16 blocks 