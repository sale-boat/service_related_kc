const fs = require('fs');

// Helper functions
const randIdx = length => Math.floor(Math.random() * length);

// Generate related CSV
const csv = fs.createWriteStream(`${__dirname}/../../dist/related.csv`);
const start = Date.now();
let i = 10000000;
let rows = randIdx(25);

const generateData = () => `${i},${randIdx(10000000)}`;

const generateRow = () => {
  let str = '';

  if (rows > 1) {
    str += generateData();
    rows -= 1;
  } else {
    str += generateData();
    i -= 1;
    rows = randIdx(25);
  }
  str += '\n';

  return str;
};

const writeGenerator = (writer, callback) => {
  const write = () => {
    let ok = true;
    do {
      if (i === 1 && rows === 1) {
        // last iteration
        writer.write(generateRow(), callback);
      } else {
        // Write and check whether to continue
        ok = writer.write(generateRow());
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early, wait for drain to write more
      writer.once('drain', write);
    }
  };

  write();
};

writeGenerator(csv, () => {
  console.log(`'Related' data took ${Date.now() - start}ms to generate`);
});
