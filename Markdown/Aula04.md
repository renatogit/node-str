## Aula IV (Normalizando a porta)

### Melhorando a estrutura da configuração inicial do projeto.

Criando a função `nomalizePort` e alterando a linha `const port = 3000;` para:<br />
`const port = nomalizePort(process.env.POT || '3000');`

```js
"use strict";

const http = require("http");
const debug = require("debug")("nodestr:server");
const express = require("express");

const app = express();
const port = nomalizePort(process.env.POT || "3000");
app.set("port", port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get("/", (req, res, next) => {
	res.status(200).send({
		title: "Node Store API",
		version: "0.0.1"
	});
});

app.use("/", route);

server.listen(port);
console.log("API rodando na porta" + port);

function nomalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}
```
