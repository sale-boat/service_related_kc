const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const router = require('./server/controllers/router.js');

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(compression());

app.get('/api/bundle.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`);
});

app.get('/api/bundle', (req, res) => {
  res.sendFile(`${__dirname}/dist/bundle.js`);
});

app.use(express.static(`${__dirname}/dist`));

app.get('/api/products/:productId/', router.readRelationship);

app.get('/products/:id', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('*', (req, res) => {
  res.redirect('/products/1');
});

app.listen(3007, console.log('listening to 3007'));
