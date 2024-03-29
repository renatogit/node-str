# Aula XXIV (Repositórios)

Criar novo arquivo src/product-repository/product-repository.js

```js
// product-repository.js
"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = () => {
	return Product.find(
		{
			active: true
		},
		"price title slug"
	);
};

exports.getBySlug = slug => {
	Product.findOne(
		{
			slug,
			active: true
		},
		"title description slug tags"
	);
};

exports.getById = id => {
	Product.findById(id);
};

exports.getByTags = tags => {
	Product.find(
		{
			tags,
			active: true
		},
		"title description price slug 	tags"
	);
};

exports.create = data => {
	var product = new Product(data);
	return product.save();
};

exports.update = (id, data) => {
	Product.findByIdAndUpdate(id, {
		$set: {
			title: data.title,
			description: data.description,
			price: data.price,
			slug: data.slug
		}
	});
};

exports.delete = id => {
	Product.findByIdAndRemove(id);
};
```

Alterar o atualizar o arquivo product-controller.js

```js
"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const ValidationContract = require("../validators/fluent-validator");
const repository = require("../product-repository/product-repository");

exports.get = (req, res, next) => {
	repository
		.get()
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.getBySlug = (req, res, next) => {
	repository
		.getBySlug(req.params.slug)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.getById = (req, res, next) => {
	// Buscando por ID
	repository
		.getById(req.params.id)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.getByTags = (req, res, next) => {
	repository
		.getByTags(req.params.tag)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.put = (req, res, next) => {
	repository
		.update(req.params.id, res.body)
		.then(x => {
			res.status(200).send({
				message: "Produto atualizado com sucesso!"
			});
		})
		.catch(e => {
			res.status(400).send({
				message: "Falha ao atualizar produto",
				data: e
			});
		});
};

exports.post = (req, res, next) => {
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

	// Se os dados não forem inválidos
	if (!contract.isValid()) {
		res
			.status(400)
			.send(contract.errors())
			.end();
		return;
	}

	repository
		.create(req.body)
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

exports.delete = (req, res, next) => {
	repository
		.delete(req.params.id)
		.then(x => {
			res.status(200).send({
				message: "Produto removido com sucesso!"
			});
		})
		.catch(e => {
			res.status(400).send({
				message: "Falha ao remover o produto",
				data: e
			});
		});
};
```
