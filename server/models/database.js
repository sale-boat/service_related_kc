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
        if (e) {
          release();
          sendToClient(e.stack, null);
        } else {
          release();
          sendToClient(null, data.rows);
        }
      });
    }
  });
};

const getRelated = (prodId, sendToClient) => {
  // Simple select
  // const queryStr = `
  //   SELECT a.prod_id AS id,
  //     a.prod_name AS name,
  //     (a.review_one_star_count * 1.0 + a.review_two_star_count * 2 + a.review_three_star_count * 3 + a.review_four_star_count * 4 + a.review_five_star_count * 5) / a.review_count AS avgReview,
  //     a.price,
  //     a.is_prime AS isPrime,
  //     a.review_count AS reviewCount,
  //     a.thumbnail_image AS image
  //   FROM products a
  //   WHERE a.prod_id = ${prodId}
  // `;

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

  // Products join related
  const queryStr = `
    SELECT a.prod_id AS id,
      a.prod_name AS name,
      (a.review_one_star_count * 1.0 + a.review_two_star_count * 2 + a.review_three_star_count * 3 + a.review_four_star_count * 4 + a.review_five_star_count * 5) / a.review_count AS avgReview,
      a.price,
      a.is_prime AS isPrime,
      a.review_count AS reviewCount,
      a.thumbnail_image AS image
    FROM products a
    INNER JOIN (
      SELECT rel_prod_id
      FROM related
      WHERE src_prod_id = ${prodId}
    ) b
    ON a.prod_id = b.rel_prod_id
  `;

  // Products subquery related
  // const queryStr = `
  //   SELECT a.prod_id AS id,
  //     a.prod_name AS name,
  //     (a.review_one_star_count * 1.0 + a.review_two_star_count * 2 + a.review_three_star_count * 3 + a.review_four_star_count * 4 + a.review_five_star_count * 5) / a.review_count AS avgReview,
  //     a.price,
  //     a.is_prime AS isPrime,
  //     a.review_count AS reviewCount,
  //     a.thumbnail_image AS image
  //   FROM products a
  //   WHERE prod_id in (
  //     SELECT rel_prod_id
  //     FROM related
  //     WHERE src_prod_id = ${prodId}
  //   )
  // `;

  // Test select (no harddrive)
  // const queryStr = `
  //   SELECT NOW();
  // `;

  // pool.connect((err, client, release) => {
  //   if (err) {
  //     console.error('Failed to connect to db', err.stack);
  //   }
  //   client.query(queryStr, (e, data) => {
  //     if (e) {
  //       sendToClient(e.stack, null);
  //     } else {
  //       release();
  //       sendToClient(null, data.rows);
  //     }
  //   });
  // });

  nr.startSegment('pg:connect', true, function connectPool(cb) {
    pool.connect(cb);
  }, function connectPoolCallback(err, client, release) {
    if (err) {
      release();
      console.error('Failed to connect to db', err.stack);
    } else {
      nr.startSegment('pg:query', true, function runQuery(cb) {
        client.query(queryStr, cb);
      }, function runQueryCallback(e, data) {
        if (e) {
          release();
          sendToClient(e.stack, null);
        } else {
          release();
          sendToClient(null, data.rows);
        }
      });
    }
  });
};

const addRelated = (prodId, relId, sendToClient) => {
  const queryStr = `
    UPDATE products_nest
    SET related = CASE WHEN related @> ARRAY[${relId}] THEN related ELSE array_append(related, ${relId}) END
    WHERE prod_id = ${prodId}
    RETURNING *
  `;

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Failed to connect to db', err.stack);
    }
    client.query(queryStr, (e, data) => {
      if (e) {
        sendToClient(e.stack, null);
      } else {
        release();
        sendToClient(null, data.rows);
      }
    });
  });
};

const updateRelated = (prodId, oldRelId, newRelId, sendToClient) => {
  const queryStr = `
    UPDATE products_nest
    SET related = array_replace(related, ${oldRelId}, ${newRelId})
    WHERE prod_id = ${prodId}
    RETURNING *
  `;

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Failed to connect to db', err.stack);
    }
    client.query(queryStr, (e, data) => {
      if (e) {
        sendToClient(e.stack, null);
      } else {
        release();
        sendToClient(null, data.rows);
      }
    });
  });
};

const deleteRelated = (prodId, relId, sendToClient) => {
  const queryStr = `
    UPDATE products_nest
    SET related = array_remove(related, ${relId})
    WHERE prod_id = ${prodId}
    RETURNING *
  `;
  pool.connect((err, client, release) => {
    if (err) {
      console.error('Failed to connect to db', err.stack);
    }
    client.query(queryStr, (e, data) => {
      if (e) {
        sendToClient(e.stack, null);
      } else {
        release();
        sendToClient(null, data.rows);
      }
    });
  });
};

module.exports = {
  getRelated,
  addRelated,
  updateRelated,
  deleteRelated,
};
