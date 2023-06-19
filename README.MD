# Pix Payment Method API


## Funções Usuarios

- [X] Buscar Usuarios

- [X] Buscar somente um Usuario

- [X] Cadastrar Usuario

- [X] Atualiza os dados de um Usuario

- [X] Deleta um Usuario somente se o saldo do usuario estiver zerado.

| Método HTTP	| Endpoint | Descrição |
|--------|----------|----------|
| GET |	/users |	Retorna todos os usuarios cadastrados |
| GET |	/users/{id} |	Retorna um usuario específico pelo ID |
| POST |	/users |	Cadastra um novo usuario |
| PUT |	/users/{id} |	Atualiza as informações de um usuario existente |
| DELETE |	/users/{id} |	Exclui um usuario existente pelo ID, somente se o usuario estiver com saldo zerado |
#

## Funcções Forma de Pagamento

- [X] Comunicação com banco em tempo real (webhook)

- [X] Gerar um QR Code/pix de pagamento para adicionar creditos

- [X] Atualiza os `CREDITOS` do Usuario ao o pagamento ser Efetuado via PIX.

- [X] Gerar um Boleto de pagamento para adicionar creditos

- [X] Atualiza os `CREDITOS` do Usuario ao o pagamento ser Efetuado via BOLETO.

| Método HTTP	| Endpoint | Descrição |
|--------|----------|----------|
| GET |	/pagamentos/pix |	Retorna todos os pix cadastrados |
| GET |	/pagamentos/pix/{id} |	Retorna um pix específico pelo ID |
| GET |	/pagamentos/boletos |	Retorna todos os boletos cadastrados |
| GET |	/pagamentos/boletos/{id} |	Retorna um boleto específico pelo ID |

#

- [ ] Cadastro de Produtos

- [ ] Realizar compra de Produtos com creditos

- [ ] Controlar Estoque de Produtos Cadastrados


