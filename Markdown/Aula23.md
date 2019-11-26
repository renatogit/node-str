# Aula XXIII (Validações)

```js
// src/validators/fluent-validators.js
"use strict";

let errors = [];

function ValidationContract() {
	errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
	if (!value || value.length <= 0) errors.push({ message });
};

ValidationContract.prototype.hasMinLen = (value, min, message) => {
	if (!value || value.length < min) errors.push({ message });
};

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
	if (!value || value.length < max) errors.push({ message });
};

ValidationContract.prototype.isFixedLen = (value, len, message) => {
	if (value.length != len) errors.push({ message });
};

ValidationContract.prototype.isEmail = (value, message) => {
	var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	if (!reg.test(value)) errors.push({ message });
};

ValidationContract.prototype.errors = () => {
	return errors;
};

ValidationContract.prototype.clear = () => {
	errors = [];
};

ValidationContract.prototype.isValid = () => {
	return errors.length == 0;
};

module.exports = ValidationContract;
```

```js
// Validacão no método post

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
```
