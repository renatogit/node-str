# Aula XII (Controllers)

Separando rotas dos controles

```js
// src/controlles/product-controllers
"use strict";

exports.post = (req, res, next) => {
	res.status(201).send(req.body);
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

```js
// src/routes/product-route

"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");

router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.delete);

module.exports = router;
```
