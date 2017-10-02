const lib = require('lib');
const fs = require('fs');

for (let i = 0; i < 300; i++) {

  let png = lib.steve['image-generation']['@dev'](`steve${i}@email.com`, (err, result) => {

      if (err) {
        console.log(err);
        return;
      }

      fs.writeFileSync(`tests/test${i}.png`, result);

  });

}
