const {Router} = require('express')
const UserController = require('../controller/usersController')
const router = Router();

router.post('/auth', UserController.autenticar)
router.get('/userLogado', UserController.userLogado)


module.exports = router;