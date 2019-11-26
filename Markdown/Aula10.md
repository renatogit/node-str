# Aula X (CRUD rest)

Adicione no arquivo app.js os métodos post, update e delete, instale o pacote body-parser. Além do desenvolvimento dos novos métodos uma nova configuração é necessária para transformar as respostas no formato JSON

```bash
yarn add body-parser
```

```js
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

// Depois de instalar o pacote body-parser add essas duas linhas.
// Essa configuração serve para o response ser no formato JSON.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// END

const route = router.get("/", (req, res, next) => {
	res.status(200).send({
		title: "Node Store API",
		version: "0.0.2"
	});
});

const create = router.post("/", (req, res, next) => {
	res.status(201).send(req.body);
});

const put = router.put("/:id", (req, res, next) => {
	const id = req.params.id;
	res.status(200).send({
		id,
		item: req.body
	});
});

const del = router.delete("/", (req, res, next) => {
	res.status(200).send(req.body);
});

app.use("/", route);
app.use("/products", create);
app.use("/products", put);
app.use("/products", del);

module.exports = app;
```
