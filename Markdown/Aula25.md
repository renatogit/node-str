# Aula XXV (Async Await)

Adicionando async await no arquivo product-controller.js

```js
"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../product-repository/product-repository");

exports.get = async (req, res, next) => {
	// Add async await && try catch
	try {
		var data = await repository.get();
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: "Falha ao procesar sua requisição"
		});
	}
};

exports.getBySlug = (req, res, next) => {
	try {
		var data = await repository.getBySlug(req.params.slug);
		res.status(200).send(data);
	} catch (e) {
		res.status(500).send({
			message: "Falha ao processar sua requisição."
		});
	}
};

exports.getById = async(req, res, next) => {
	try {
			var data = await repository.getById(req.params.id);
			res.status(200).send(data)
		} catch (e) {
				res.status(500).send({
					message: "Falha ao processar sua requisição."
				});
		}
};

exports.getByTags = async(req, res, next) => {
	try {
		const data = await repository.getByTags(req.params.tag);
		res.status(200).send(data)
	} catch (e) {
			res.status(500).send({
			message: "Falha ao processar sua requisição."
		});
	}
};

exports.post = async(req, res, next) => {
	let contract = new ValidationContract();
	contract.hasMinLen(
		req.body.title,
		3,
		"O título deve conter pelo menos 3 caracteres"
	);
	contract.hasMinLen(
		req.body.slug,
		3,
		"O título deve conter pelo menos 3 caracteres"
	);
	contract.hasMinLen(
		req.body.description,
		3,
		"O título deve conter pelo menos 3 caracteres"
	);

	if (!contract.isValid()) {
		res
			.status(400)
			.send(contract.errors())
			.end();
		return;
	}
	try {
		await repository.create(req.body)
			res.status(201).send({
				message: "Produto cadastrado com sucesso!"
			});
	} catch (e) {
		res.status(500).send({
			message: "Falha ao cadastrar o produto"
		});
	}
};

exports.put = async(req, res, next) => {
try {
	await repository.update(req.params.id, req.body);
	res.status(200).send({
		message: "Produto atualizado com sucesso!"
	})
} catch (e) {
		res.status(500).send({
		message: "Falha ao processar sua requisição."
	});
}
};

exports.delete = async(req, res, next) => {
	try {
		await repository.delete(req.body.id)
		res.status(200).send({
			message: "Produto removido com sucesso!"
		})
	} catch (e) {
			res.status(500).send({
			message: "Falha ao processar sua requisição."
		});
	}
};

```

Adicionando async await no arquivo product-repository.js

```js
// product-repository/product-repository.js

"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = async () => {
	const res = await Product.find(
		{
			active: true
		},
		"price title slug"
	);
	return res;
};

exports.getBySlug = async slug => {
	const res = await Product.findOne(
		{
			slug,
			active: true
		},
		"title description slug tags"
	);
	return res;
};

exports.getById = async id => {
	const res = Product.findById(id);
	return res;
};

exports.getByTags = async tags => {
	const res = Product.find(
		{
			tags,
			active: true
		},
		"title description price slug 	tags"
	);
	return res;
};

exports.create = async data => {
	var product = new Product(data);
	await product.save();
};

exports.update = async (id, data) => {
	await Product.findByIdAndUpdate(id, {
		$set: {
			title: data.title,
			description: data.description,
			price: data.price,
			slug: data.slug
		}
	});
};

exports.delete = async id => {
	await Product.findByIdAndRemove(id);
};
```
