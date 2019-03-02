/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */ // Disabled because arrow assignment binding is undesired effect

const fs = require('fs');
const { Transform } = require('stream');

const start = Date.now();
const readable = fs.createReadStream(`${__dirname}/../../dist/products-sample.csv`);
const writable = fs.createWriteStream(`${__dirname}/../../dist/products.csv`);
const regex = /\/([^"/]+)"/g;
let lastMatch;
let first = true;

const addData = new Transform({ objectMode: true });
addData._transform = function (chunk, encoding, done) {
  let data = chunk.toString('utf8');
  if (this._lastLineData) {
    data = this._lastLineData + data;
  }

  const lines = data.split('\n');
  [this._lastLineData] = lines.splice(lines.length - 1, 1);

  lines.forEach((line, index) => {
    const match = line.match(regex);
    if (match) [lastMatch] = match;
    let concatVal = `,"http://lorempixel.com/160/160${lastMatch}\n`;
    if (first) {
      concatVal = ',thumbnail_image\n';
      first = false;
    }
    lines[index] = line.concat(concatVal);
  });

  lines.forEach(this.push.bind(this));
  done();
};

addData._flush = function (done) {
  if (this._lastLineData) {
    const match = this._lastLineData.match(regex);
    if (match) [lastMatch] = match;
    this._lastLineData = this._lastLineData.concat(`,"http://lorempixel.com/160/160${lastMatch}\n`);
    this.push.bind(this)(this._lastLineData);
  }
  this._lastLineData = null;
  done();
};

readable.pipe(addData).pipe(writable);
writable.on('close', () => {
  console.log(Date.now() - start);
});
