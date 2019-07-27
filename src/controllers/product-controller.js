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

exports.getByTags = (req, res, next) => {
	Product.find(
		{
			tags: req.params.tag,
			active: true
		},
		"title description price slug 	tags"
	)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.put = (req, res, next) => {
	Product.findByIdAndUpdate(req.params.id, {
		$set: {
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			slug: req.body.slug
		}
	})
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

//

exports.delete = (req, res, next) => {
	Product.findByIdAndRemove(req.body.id)
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
