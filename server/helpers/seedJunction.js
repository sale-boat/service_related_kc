const database = require('../../config.js');

const generateRelationships = (n, id) => {
  // have a target product
  // have create related products
  const results = [];
  while (results.length < n) {
    const rand = Math.floor(Math.random() * 100) + 1;
    if (!results.includes(rand) && rand !== id) {
      results.push(rand);
    }
  }
  return results;
};


database.schema.dropTableIfExists('products_index')
  .then(() => database.schema.createTable('products_index', (table) => {
    table.integer('product_id');
    table.integer('related_id');
  }))
  .then(() => {
    const rows = [];
    for (let i = 0; i < 100; i += 1) {
      const relations = generateRelationships(20, i + 1);
      for (let k = 0; k < relations.length; k += 1) {
        rows.push({
          product_id: i + 1,
          related_id: relations[k],
        });
      }
    }
    return database('products_index').insert(rows);
  })
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    throw (err);
  });
