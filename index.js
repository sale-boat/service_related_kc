require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const router = require('./server/controllers/router.js');

const app = express();

// app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(compression());

app.use(express.static(`${__dirname}/dist/`));

// API routes
app.use('/api/related', router);

app.use('/:id', express.static(`${__dirname}/dist/`));

app.listen(3007, console.log('listening to 3007'));
