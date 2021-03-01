const bcript = require('bcrypt');
const saltRound = 12;
const plainText = 'hoang123';
let hash;
bcript.genSalt(saltRound, (err, salt) => {
  if (err) throw err;
  bcript.hash(plainText, salt, (err, stringEncripted) => {
    if (err) throw err;
    hash = stringEncripted;
    // console.log(stringEncripted);
    bcript.compare(plainText, hash, (err, res) => {
      if (err) throw err;
      //   console.log('====================================');
      //   console.log(res);
      //   console.log('====================================');
    });
  });
});
// const crypto = require('crypto');
// console.log('====================================');
// console.log(crypto.randomBytes(162).toString('utf8'));
// console.log('====================================');
// console.log('====================================');
// console.log(crypto.randomInt(1000, 10000));
// console.log('====================================');

// crypto.scrypt(plainText, 'salt', 64, (err, key) => {
//   if (err) throw err;
//   console.log('====================================');
//   console.log(key.toString('hex'));
//   console.log('====================================');
// });
