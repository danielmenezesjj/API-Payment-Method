const {Router} = require('express');
const router = Router();
const ProdutoController = require('../controller/produtoController');
const autenticado = require('../middleware/middlewares-autenticacao');
const VendaController = require('../controller/vendaController')

router.get('/produtos', ProdutoController.readmeAllProduct);
router.get('/produtos/:id', ProdutoController.readmeOneProduct);
router.post('/produtos', ProdutoController.createProduct);
router.post('/vendas/:id', VendaController.vendaProduct)
router.put('/produtos/:id',ProdutoController.updateProduct);
router.delete('/produtos/:id', ProdutoController.deleteProduct)

module.exports =  router;