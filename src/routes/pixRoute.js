const {Router} = require('express')
const router = Router();
const PixController = require('../controller/pixController')
const autenticado = require('../middleware/middlewares-autenticacao')

router.get('/gerarpix', autenticado ,PixController.gerarQrCod);
router.get('/verificarstatuspix/:id', PixController.verificarstatuspix);
router.get('/index', PixController.visualizarQrCod)


module.exports = router