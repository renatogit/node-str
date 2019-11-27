'use strict';

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const schema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	slug: {
		type: String,
		required: true,
		trim: true,
		index: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
	},
	active: {
		type: Boolean,
		required: true,
		default: true,
	},
	tags: [
		{
			type: String,
			required: true,
		},
	],
});

module.exports = mongoose.model('Product', schema);

// {
// 	"title": "Móveis",
// 	"slug": "Cadeira Gamer",
// 	"description": "Cadeira Gamer Vermelha",
// 	"price": 500.00,
// 	"active": true,
// 	"tags": ["Gamer","Cadeira"]
// }
