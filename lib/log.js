'use strict';

require('colors');

function logBlue(text) {
  console.log(`${text}`.blue);
}

function logGreen(text) {
  console.log(`${text}`.green);
}

function logRed(text) {
  console.log(`${text}`.red);
}

module.exports.logBlue = logBlue;
module.exports.logGreen = logGreen;
module.exports.logRed = logRed;
