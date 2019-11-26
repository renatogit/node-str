# Aula 17 (Listando os produtos)

Adicione o método get

```js
// product-controller.js
"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
	Product.find(
		{
			active: true
		},
		// Esse é um filtro que retorna somente os produtos listados
		"price title slug"
	)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.post = (req, res, next) => {
	var product = new Product(req.body);
	product
		.save()
		.then(x => {
			res.status(201).send({
				message: "Produto cadastrado com sucesso!"
			});
		})
		.catch(e => {
			res.status(400).send({
				message: "Falha ao cadastrar o produto",
				data: e
			});
		});
};

exports.put = (req, res, next) => {
	const id = req.params.id;
	res.status(200).send({
		id,
		item: req.body
	});
};

exports.delete = (req, res, next) => {
	res.status(200).send(req.body);
};
```

Crie a rota get

```js
"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");

// Nova Rota
router.get("/", controller.get);

router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.delete);

module.exports = router;
```
