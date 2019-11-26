# Aula XIV (Mongoose)

```bash
yarn add mongoose
```

Atualização do arquivo `src/app.js`.

```js
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect("mongodb://localhost/admin", { useNewUrlParser: true });

// Carrega as Rotas
const indexRoute = require("./routes/index-route");
const propductRoute = require("./routes/product-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", propductRoute);

module.exports = app;
```
