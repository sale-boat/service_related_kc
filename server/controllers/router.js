const { fetchRelated } = require('../models/database.js');

module.exports = {

  readRelationship: (req, res) => {
    let id = req.params.productId;
    if (!id) id = 1;
    fetchRelated(id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(503).send(err);
      });
  },
};
