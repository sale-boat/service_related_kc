const fs = require('fs');

// Helper functions
const randIdx = length => Math.floor(Math.random() * length);

// Generate related CSV
const csv = fs.createWriteStream('../../dist/related.csv');
const start = Date.now();
let i = 10000000;
let rows = randIdx(25);

const generateData = () => `${i},${randIdx(10000000)}`;

const generateRow = (last) => {
  let str = '';

  if (rows > 1) {
    str += generateData();
    rows -= 1;
  } else {
    str += generateData();
    i -= 1;
    rows = randIdx(25);
  }

  if (!last) {
    str += '\n';
  }

  return str;
};

const writeGenerator = (writer, callback) => {
  const write = () => {
    let ok = true;
    do {
      if (i === 1 && rows === 1) {
        // last time!
        writer.write(generateRow(true), callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(generateRow(false));
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };

  write();
};

writeGenerator(csv, () => {
  console.log(Date.now() - start);
});
