const {Router} = require('express')
const UserController = require('../controller/usersController')

const router = Router();

router.get('/users', UserController.readmeUser);
router.get('/users/:id', UserController.readmeOneUser);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);


module.exports = router;