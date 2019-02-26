const faker = require('faker');
const database = require('../../config.js');

database.schema.dropTableIfExists('products')
  .then(() => database.schema.createTable('products', (table) => {
    table.increments('product_id');
    table.string('name');
    table.string('image');
    table.decimal('price');
    table.decimal('avg_review', 2, 1);
    table.integer('review_count');
    table.boolean('is_prime');
    table.string('category');
    table.string('manufacturer');
  }))
  .then(() => {
    // fill with row objects
    const rows = [];
    for (let i = 0; i < 100; i += 1) {
      const product = {};
      product.name = faker.commerce.productName();
      product.price = faker.commerce.price();
      product.avg_review = Math.floor(Math.random() * 40 + 10) / 10;
      product.review_count = Math.floor(Math.random() * 5000);
      product.is_prime = faker.random.boolean();
      product.category = faker.commerce.department();
      product.manufacturer = faker.company.companyName();
      // product.image = `https://s3-us-west-1.amazonaws.com/amazon-product-carousel-images/products/item-${i + 1}.png`;
      rows.push(product);
    }
    return database('products').insert(rows);
  })
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    throw (err);
  });
