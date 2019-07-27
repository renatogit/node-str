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
