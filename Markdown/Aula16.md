# Aula 16 (Criando um produto)

```js
// product-controller.js

"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

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

Import o model em app

```js
// Carrega os Models
const Product = require("./models/product");
```
