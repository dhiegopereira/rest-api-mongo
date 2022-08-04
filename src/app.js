const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes')
app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use(routes);
module.exports = app;