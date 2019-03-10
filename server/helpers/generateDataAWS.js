const fs = require('fs');
const faker = require('faker');

// Helper functions
const randIdx = length => Math.floor(Math.random() * length);
const generateProduct = () => {
  return {
    name: faker.commerce.productName(),
    avg_review: randIdx(50) / 10,
    price: `${randIdx(250)}.00`,
    is_prime: faker.random.boolean(),
    review_count: randIdx(250),
  };
};

// Generate related CSV
const csv = fs.createWriteStream(`${__dirname}/../../dist/related-products.csv`);
const start = Date.now();
let i = 10000000;
let product = generateProduct();
let rows = randIdx(25);

const generateData = () => `${randIdx(10000000) + 1},${i},"${product.name}${i}","${product.name}",${product.avg_review},"${product.price}",${product.is_prime},${product.review_count},"http://lorempixel.com/160/160"`;

const generateRow = () => {
  let str = '';

  if (rows > 1) {
    str += generateData();
    rows -= 1;
  } else {
    str += generateData();
    i -= 1;
    product = generateProduct(i);
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
