# Pix Payment Method API


- [X] Cadastro de Usuarios

| Método HTTP	| Endpoint | Descrição |
|--------|----------|----------|
| GET |	/users |	Retorna todos os produtos cadastrados |
| GET |	/users/{id} |	Retorna um produto específico pelo ID |
| POST |	/users |	Cadastra um novo produto |
| PUT |	/users/{id} |	Atualiza as informações de um produto existente |
| DELETE |	/users/{id} |	Exclui um produto existente pelo ID, somente se o usuario estiver com saldo zerado |

- [X] Comunicação com banco em tempo real (webhook)

- [X] Gerar um QR Code/pix de pagamento para adicionar creditos

- [X] Atualiza `CREDITOS` do Usuario ao o pagamento ser Efetuado.


- [] Cadastro de Produtos


