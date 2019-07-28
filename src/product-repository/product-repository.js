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
