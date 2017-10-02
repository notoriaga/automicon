const main = require('./__main__.js');

module.exports = (context, callback) => {

  let seed;

  if (context.alias.endsWith('.png')) {
    seed = context.alias.slice(0, -4);
  } else {
    return callback(null);
  }
                                    
  main(seed, context, (err, results) => {

    if (err) {
      return callback(err);
    }

    return callback(null, results);

  });

};
