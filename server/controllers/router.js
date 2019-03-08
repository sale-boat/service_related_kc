const express = require('express');
const db = require('../models/database.js');

const router = express.Router();

router.get('/:id', (req, res) => {
  db.getRelated(req.params.id, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.post('/:id', (req, res) => {
  db.addRelated(req.params.id, req.body.relId, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.patch('/:id', (req, res) => {
  db.updateRelated(req.params.id, req.body.oldRelId, req.body.newRelId, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.delete('/:id', (req, res) => {
  db.deleteRelated(req.params.id, req.body.relId, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
