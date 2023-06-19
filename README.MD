# Pix Payment Method API


## Functions

- [X] Cadastro de Usuarios

| Método HTTP	| Endpoint | Descrição |
|--------|----------|----------|
| GET |	/users |	Retorna todos os usuarios cadastrados |
| GET |	/users/{id} |	Retorna um usuario específico pelo ID |
| POST |	/users |	Cadastra um novo usuario |
| PUT |	/users/{id} |	Atualiza as informações de um usuario existente |
| DELETE |	/users/{id} |	Exclui um usuario existente pelo ID, somente se o usuario estiver com saldo zerado |

- [X] Comunicação com banco em tempo real (webhook)

- [X] Gerar um QR Code/pix de pagamento para adicionar creditos

- [X] Atualiza os `CREDITOS` do Usuario ao o pagamento ser Efetuado via PIX.

- [X] Gerar um Boleto de pagamento para adicionar creditos

- [X] Atualiza os `CREDITOS` do Usuario ao o pagamento ser Efetuado via BOLETO.

- [ ] Cadastro de Produtos

- [ ] Realizar compra de Produtos com creditos

- [ ] Controlar Estoque de Produtos Cadastrados


