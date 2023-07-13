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

## Funções Forma de Pagamento

- [X] Gerar um QR Code/pix de pagamento para adicionar creditos

- [X] Atualiza os `CREDITOS` do Usuario ao o pagamento ser Efetuado via PIX.


| Método HTTP	| Endpoint | Descrição |
|--------|----------|----------|
| GET |	/pagamentos/pix |	Retorna todos os pix cadastrados |
| GET |	/pagamentos/pix/{id} |	Retorna um pix específico pelo ID |

#

## Funções Produtos

- [X] Cadastro de Produtos

- [X] Realizar compra de Produtos com creditos
