# Aula XX (Listando os Produtos de uma tag)

```js
// product-controller

// Novo controller
// Com esse método é possível fazer uma busca dentro do array.
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
```

```js
"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");

router.get("/", controller.get);
router.get("/:slug", controller.getBySlug);
router.get("/admin/:id", controller.getById);
// nova rota
router.get("/tags/:tag", controller.getByTags); //http://localhost:3000/products/tags/games
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.delete);

module.exports = router;
```
