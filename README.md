# NODE.JS

## Aula I (Instalação do Node)
### Apresentação do curso

## Aula II (npm init e instalação dos pacotes)
### Criação da estrutura básica do projeto e Instalação das dependências.   

```bash
mkdir node-str

npm init -y
```

```txt
create server.js

//  Adicione "use strict" na primeira linha do projeto.
// Isso vai forçar o código a ser escrito melhor. Qualquer
// erro no eslint ou falta de ";", dará erro de compilação.
```
```bash
yarn add http express debug
```

## Aula III (Criando um servidor Web)
#### Configuração básica do node

```js
'use strict'

const http = require('http')
const debug = require('debug')('nodestr:server')
const express = require('express')

const app = express();
const port = 3000;
app.set('port', port)

const server = http.createServer(app)
const router = express.Router()

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route)

server.listen(port);
console.log('API rodando na porta' + port);
```

## Aula IV (Normalizando a porta)
### Melhorando a estrutura da configuração inicial do projeto.
Criando a função `nomalizePort` e alterando a linha `const port = 3000;` para:<br />
`const port = nomalizePort(process.env.POT || '3000');`

```js
'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = nomalizePort(process.env.POT || '3000');
app.set('port', port);

const server = http.createServer(app)
const router = express.Router()

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route)

server.listen(port);
console.log('API rodando na porta' + port);

function nomalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}
```

## Aula V (Gerenciando Erros no Servidor)

### Melhorando a estrutura do projeto criando a função `onError`.

Existe uma lista de erro na documentação do Node que pode ser add nessa função.
```js
'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
const port = nomalizePort(process.env.POT || '3000');
app.set('port', port);

const server = http.createServer(app)
const router = express.Router()

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route)

server.listen(port);
server.on('error, onError')
console.log('API rodando na porta' + port);

function nomalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevaed privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already use');
            process.exit(1);
            break;
            
        default:
            throw error;
    }
}
```

# Aula VI (Iniciando o Debug)
## Add o debug na aplicação.

```js
"use strict";

const http = require("http");
const debug = require("debug")("nodestr:server");
const express = require("express");

const app = express();
const port = nomalizePort(process.env.PORT || "3000");
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
server.on("error", onError);
server.on("listening", OnListening);

console.log("API rodando na porta " + port);

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

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevaed privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function OnListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debug("Listening on " + bind);
}

```

# Aula VII (Separando o Servidor)

Não é bom que o servidor, as rotas e os controles estejam rodando, tudo, dentro do mesmo arquivo.

SERVER

```js
// bin/server.js
"use strict";
const app = require("../src/app");
const http = require("http");
const debug = require("debug")("nodestr:server");

const port = nomalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", OnListening);

console.log("API rodando na porta " + port);

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

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevaed privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function OnListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debug("Listening on " + bind);
}

```

APP

```js
// src/app.js
"use strict";

const express = require("express");

const app = express();
const router = express.Router();

const route = router.get("/", (req, res, next) => {
	res.status(200).send({
		title: "Node Store API",
		version: "0.0.1"
	});
});

app.use("/", route);

module.exports = app;
```

# Aula VIII (Configurando o npm start) 

Altere o valor atributo `scripts` no arquivo `package.json` para:

```json
{ ...
	"scripts": {
  	"start": "node ./bin/server.js"
	},
	...
}
```

Execute o comando: 
```bash 
yarn start
```
# Aula IX (Nodemon)
Instale o pacote de desenvolvimento nodemon para o servidor atualizar as mudanças automaticamente.

```bash
yarn add -D nodemon
```

altere o arquivo `package.json` para:

```json
{...
"scripts": {
		"start": "node ./bin/server.js",
		"dev": "nodemon ./bin/server.js"
	}
...
}
```
# Aula X (CRUD rest)

Adicione no arquivo app.js os métodos post, update e delete, instale o pacote body-parser. Além do desenvolvimento dos novos métodos uma nova configuração é necessária para transformar as respostas no formato JSON

```bash
yarn add body-parser
```

```js
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

// Depois de instalar o pacote body-parser add essas duas linhas.
// Essa configuração serve para o response ser no formato JSON.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// END

const route = router.get("/", (req, res, next) => {
	res.status(200).send({
		title: "Node Store API",
		version: "0.0.2"
	});
});

const create = router.post("/", (req, res, next) => {
	res.status(201).send(req.body);
});

const put = router.put("/:id", (req, res, next) => {
	const id = req.params.id;
	res.status(200).send({
		id,
		item: req.body
	});
});

const del = router.delete("/", (req, res, next) => {
	res.status(200).send(req.body);
});

app.use("/", route);
app.use("/products", create);
app.use("/products", put);
app.use("/products", del);

module.exports = app;
```
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

# Aula XIII (MongoDB Setup)

Pesquisa recomendada:
NoSql Distiled - Martin Fowler

---

Banco de dados não relacional online: https://mlab.com

# Aula XIV (Mongoose)

```bash
yarn add mongoose
```

Atualização do arquivo `src/app.js`.

```js
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();

// Conecta ao banco
mongoose.connect("mongodb://localhost/admin", { useNewUrlParser: true });

// Carrega as Rotas
const indexRoute = require("./routes/index-route");
const propductRoute = require("./routes/product-route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/products", propductRoute);

module.exports = app;

```

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

# Aula 16 (Criando um produto)

```js
// product-controller.js

"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.post = (req, res, next) => {
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

Import o model em app

```js
// Carrega os Models
const Product = require("./models/product");

```

# Aula 17 (Listando os produtos)

Adicione o método get

```js
// product-controller.js
"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
	Product.find(
		{
			active: true
		},
		// Esse é um filtro que retorna somente os produtos listados
		"price title slug"
	)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.post = (req, res, next) => {
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

Crie a rota get
```js
"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");

// Nova Rota
router.get("/", controller.get);

router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.delete);

module.exports = router;

```

# Aula 18 (Listando produtos pelo slug)
Criando um novo controller e uma nova rota

```js
// product-controller
"use strict";

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
	// Product.find({ title: "Mouse" })
	Product.find(
		{
			active: true
		},
		"price title slug"
	)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.getBySlug = (req, res, next) => {
	// É utilizado o método findOne para retornar somento o objeto sem [].
	// Product.find(
	Product.findOne(
		{
			slug: req.params.slug,
			active: true
		},
		"title description slug tags"
	)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(e => {
			res.status(400).send(e);
		});
};

exports.post = (req, res, next) => {
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
"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");

router.get("/", controller.get);
// nova rota 
router.get("/:slug", controller.getBySlug); // http://localhost:3000/products/mouse-gamer
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/", controller.delete);

module.exports = router;

```
