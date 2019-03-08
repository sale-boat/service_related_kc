const { Pool } = require('pg');
const config = require('../../config');

const client = new Pool(config);

client.connect((err) => {
  if (err) {
    console.error('Failed to connect to db', err.stack);
  } else {
    console.log('Connected to database!');
  }
});

const getRelated = async (prodId, cb) => {
  const queryStr = `
    SELECT a.prod_id AS id,
      a.prod_name AS name,
      (a.review_one_star_count * 1.0 + a.review_two_star_count * 2 + a.review_three_star_count * 3 + a.review_four_star_count * 4 + a.review_five_star_count * 5) / a.review_count AS avgReview,
      a.price,
      a.is_prime AS isPrime,
      a.review_count AS reviewCount,
      a.thumbnail_image AS image
    FROM products_nest a
    INNER JOIN (
      SELECT UNNEST(related) AS rel_prod_id
      FROM products_nest
      WHERE prod_id = ${prodId}
    ) b
    ON a.prod_id = b.rel_prod_id
    `;
  client.query(queryStr)
    .then(data => cb(null, data.rows))
    .catch(e => cb(e.stack, null));
};

const addRelated = (prodId, relId, cb) => {
  const queryStr = `
    UPDATE products_nest
    SET related = CASE WHEN related @> ARRAY[${relId}] THEN related ELSE array_append(related, ${relId}) END
    WHERE prod_id = ${prodId}
    RETURNING *
  `;
  client.query(queryStr)
    .then(data => cb(null, data.rows))
    .catch(e => cb(e.stack, null));
};

const updateRelated = (prodId, oldRelId, newRelId, cb) => {
  const queryStr = `
    UPDATE products_nest
    SET related = array_replace(related, ${oldRelId}, ${newRelId})
    WHERE prod_id = ${prodId}
    RETURNING *
  `;
  client.query(queryStr)
    .then(data => cb(null, data.rows))
    .catch(e => cb(e.stack, null));
};

const deleteRelated = (prodId, relId, cb) => {
  const queryStr = `
    UPDATE products_nest
    SET related = array_remove(related, ${relId})
    WHERE prod_id = ${prodId}
    RETURNING *
  `;
  client.query(queryStr)
    .then(data => cb(null, data.rows))
    .catch(e => cb(e.stack, null));
};

module.exports = {
  getRelated,
  addRelated,
  updateRelated,
  deleteRelated,
};
