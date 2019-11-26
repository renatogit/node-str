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
