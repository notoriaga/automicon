const gameOfLife = require('./gameOfLife');
const PNG = require('pngjs').PNG;
const fs = require('fs');

var png = new PNG({
  width: 100,
  height: 100,
  filterType: -1
});

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
      let idx = (png.width * y + x) << 2;
      png.data[idx  ] = 0;
      png.data[idx+1] = 0;
      png.data[idx+2] = 0;
      png.data[idx+3] = 255;
  }
}

png.pack().pipe(fs.createWriteStream('newOut.png'));


let data = gameOfLife.run(16, 50)
console.log(data);
