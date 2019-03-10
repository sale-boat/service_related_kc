const { Pool } = require('pg');
const nr = require('newrelic');
const config = require('../../config');

const pool = new Pool(config);

const sendQuery = (queryStr, sendToClient) => {
  nr.startSegment('pg:connect', true, cb => pool.connect(cb), (err, client, release) => {
    if (err) {
      release();
      console.error('Failed to connect to db', err.stack);
    } else {
      nr.startSegment('pg:query', true, cb => client.query(queryStr, cb), (e, data) => {
        release();
        if (e) {
          sendToClient(e.stack, null);
        } else {
          sendToClient(null, data.rows);
        }
      });
    }
  });
};

const getRelated = (prodId, sendToClient) => {
  // Related products
  const queryStr = `
    SELECT *
    FROM related_products
    WHERE prod_id = ${prodId}
  `;

  // Product nest
  // const queryStr = `
  //   SELECT a.prod_id AS id,
  //     a.prod_name AS name,
  //     (a.review_one_star_count * 1.0 + a.review_two_star_count * 2 + a.review_three_star_count * 3 + a.review_four_star_count * 4 + a.review_five_star_count * 5) / a.review_count AS avgReview,
  //     a.price,
  //     a.is_prime AS isPrime,
  //     a.review_count AS reviewCount,
  //     a.thumbnail_image AS image
  //   FROM products_nest a
  //   INNER JOIN (
  //     SELECT UNNEST(related) AS rel_prod_id
  //     FROM products_nest
  //     WHERE prod_id = ${prodId}
  //   ) b
  //   ON a.prod_id = b.rel_prod_id
  // `;

  sendQuery(queryStr, sendToClient);
};

const addRelated = (prodId, relId, sendToClient) => {
  // Related products
  // const queryStr = `

  // `;

  // Product nest
  const queryStr = `
    UPDATE products_nest
    SET related = CASE WHEN related @> ARRAY[${relId}] THEN related ELSE array_append(related, ${relId}) END
    WHERE prod_id = ${prodId}
    RETURNING *
  `;

  sendQuery(queryStr, sendToClient);
};

const updateRelated = (prodId, oldRelId, newRelId, sendToClient) => {
  // Related products


  // Product nest
  const queryStr = `
    UPDATE products_nest
    SET related = array_replace(related, ${oldRelId}, ${newRelId})
    WHERE prod_id = ${prodId}
    RETURNING *
  `;

  sendQuery(queryStr, sendToClient);
};

const deleteRelated = (prodId, relId, sendToClient) => {
  // Related products


  // Product nest
  const queryStr = `
    UPDATE products_nest
    SET related = array_remove(related, ${relId})
    WHERE prod_id = ${prodId}
    RETURNING *
  `;
  
  sendQuery(queryStr, sendToClient);
};

module.exports = {
  getRelated,
  addRelated,
  updateRelated,
  deleteRelated,
};
