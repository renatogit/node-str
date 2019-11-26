# Aula XI (Rotas)

Melhorando a estrutura do projeto separando criando novos arquivos e separando as rotas da configuração.

```js
// src/routes/index.js

"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.status(200).send({
		title: "Node Store API",
		version: "0.0.2"
	});
});

module.exports = router;
```

```js
// src/routes/product.ts
"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.status(200).send({
		title: "Node Store API",
		version: "0.0.2"
	});
});

router.post("/", (req, res, next) => {
	res.status(201).send(req.body);
});

router.put("/:id", (req, res, next) => {
	const id = req.params.id;
	res.status(200).send({
		id,
		item: req.body
	});
});

router.delete("/", (req, res, next) => {
	res.status(200).send(req.body);
});

module.exports = router;
```

```js
// src/app.js

"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

// Carrega as Rotas
const indexRoute = require("./routes/index");
const propductRoute = require("./routes/product");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", propductRoute);

module.exports = app;
```
