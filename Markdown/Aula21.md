# Aula XXI (Atualizando um produto)

Nesse método é necessário passar todos os valores, o campo que não for adicionado
receberá o valor null.

```js
// Alterando o método put anterior.
exports.put = (req, res, next) => {
	Product.findByIdAndUpdate(req.params.id, {
		$set: {
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			slug: req.body.slug
		}
	})
		.then(x => {
			res.status(200).send({
				message: "Produto atualizado com sucesso!"
			});
		})
		.catch(e => {
			res.status(400).send({
				message: "Falha ao atualizar produto",
				data: e
			});
		});
};
```

#Aula XXII (Excluíndo um produto)

Atualizando o método delete anterior.

```js
exports.delete = (req, res, next) => {
	Product.findByIdAndRemove(req.body.id)
		.then(x => {
			res.status(200).send({
				message: "Produto removido com sucesso!"
			});
		})
		.catch(e => {
			res.status(400).send({
				message: "Falha ao remover o produto",
				data: e
			});
		});
};
```
