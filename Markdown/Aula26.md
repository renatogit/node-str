# Aula XXVI (Revisando os models Customers)

```js
// modells/custumers.js

"use strict";

const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model("Custumers", schema);
```

Não esquecer de carregar o model (`const Product = require("./models/custumers");`) em `app.js`.
