const Jimp = require("jimp");

/**
* @returns {any}
*/
module.exports = (context, callback) => {
  return createImage()
  return callback(null, 'hello');
};


function createImage(callback) {
  Jimp.read("test.jpg", function (err, test) {
        if (err) throw err;
        test.resize(256, 256)
             .quality(50)
             .write(__dirname + "./new.jpg");
  });
};


function onBuffer(err, buffer) {
    if (err) throw err;
    console.log(buffer);
};


function donutJGD() {
    //Pallet  RRGGBBAA
    var _ = 0xFFFFFF00,
        i = 0xFF880088,
        X = 0xFF8800FF;
    return {
        width: 10, height: 10,
        data: [
            _,_,_,_,_,_,_,_,_,_,
            _,_,_,i,X,X,i,_,_,_,
            _,_,X,X,X,X,X,X,_,_,
            _,i,X,X,i,i,X,X,i,_,
            _,X,X,i,_,_,i,X,X,_,
            _,X,X,i,_,_,i,X,X,_,
            _,i,X,X,i,i,X,X,i,_,
            _,_,X,X,X,X,X,X,_,_,
            _,_,_,i,X,X,i,_,_,_,
            _,_,_,_,_,_,_,_,_,_
        ]
    };
};
