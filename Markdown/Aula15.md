# Aula XV (Models)

```js
// src/models/product.js

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Primitives
// These six types are considered to be primitives. A primitive is not an object and has no methods of its own. All primitives are immutable.
// Boolean — true or false
// Null — no value
// Undefined — a declared variable but hasn’t been given a value
// Number — integers, floats, etc
// String — an array of characters i.e words
// Symbol — a unique value that's not equal to any other value

const schema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	slug: {
		type: String,
		required: true,
		trim: true,
		index: true,
		unique: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	price: {
		type: Number,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: true
	},
	tags: [
		{
			type: String,
			required: true
		}
	]
});

module.exports = mongoose.model("Product", schema);
```
