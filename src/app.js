'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect(
	'mongodb+srv://devilla:root@defaultcluster-ae3cx.mongodb.net/test?retryWrites=true&w=majority',
	{ useUnifiedTopology: true },
);

// Carrega os Models
const Product = require('./models/product');
// const Product = require("./models/custumers");

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const propductRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', propductRoute, findApp, renderView, sendJSON);

module.exports = app;
