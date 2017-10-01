const lib = require('lib');
const fs = require('fs');

for (let i = 0; i < 100; i++) {

  let png = lib.steve['image-generation']['@dev'](`steve${i}`, (err, result) => {

      if (err) {
        console.log(err);
        return;
      }

      fs.writeFileSync(`tests/test${i}.png`, result);

  });

}
