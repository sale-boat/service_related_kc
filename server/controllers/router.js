const express = require('express');
const db = require('../models/database.js');

const router = express.Router();

router.get('/:id', (req, res) => {
  db.getRelated(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      const retData = data.map(row => ({
        id: row.rel_id,
        name: row.prod_name,
        avgReview: row.avg_review,
        price: row.price,
        isPrime: row.is_prime,
        reviewCount: row.review_count,
        image: row.thumbnail_image,
        category: 'product',
      }));
      res.status(200).send(retData);
    }
  });
});

router.post('/:id', (req, res) => {
  const bodyData = {
    prodId: req.params.id,
    relId: req.body.relId,
    prodName: req.body.prodName,
    avgReview: req.body.avgReview,
    price: req.body.price,
    isPrime: req.body.isPrime,
    reviewCount: req.body.reviewCount,
    thumbnailImage: req.body.thumbnailImage,
  };

  db.addRelated(bodyData, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(data[0]);
    }
  });
});

router.patch('/:id', (req, res) => {
  db.updateRelated(req.params.id, req.body.oldRelId, req.body.newRelId, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data[0]);
    }
  });
});

router.delete('/:id', (req, res) => {
  db.deleteRelated(req.params.id, req.body.relId, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data[0]);
    }
  });
});

module.exports = router;
