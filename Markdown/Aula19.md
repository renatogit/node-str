# Aula XIX (Listando um produto pelo ID)

```js
"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
	// Product.find({ title: "Mouse" })
	Product.find(
		{
			active: true
		},
		"price title slug"
	)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.getBySlug = (req, res, next) => {
	// É utilizado o método findOne para retornar somento o objeto sem [].
	// Product.find(
	Product.findOne(
		{
			slug: req.params.slug,
			active: true
		},
		"title description slug tags"
	)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

// Novo método
exports.getById = (req, res, next) => {
	// Buscando por ID
	Product.findById(req.params.id)
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

```js
"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");

router.get("/", controller.get);
router.get("/:slug", controller.getBySlug);
// nova rota
router.get("/admin/:id", controller.getById); // http://localhost:3000/products/admin/5d3509a5b3035d09a3221b70
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.delete);

module.exports = router;
```
