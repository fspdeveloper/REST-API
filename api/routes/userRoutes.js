const router = require('express').Router();
const routerProtector = require('../middlewares/routerProtector')
const userController = require('../controllers/userController')

// @Router (POST) 
// @Desc       
// @Router Public 
router.post('/user/singup', userController.userSingUpController);


// ------------------------------
// ------------------------------

// @Router (POST) 
// @Desc       
// @Router Public 
router.post('/user/login', userController.userSingInController);

// ------------------------------
// ------------------------------


// @Router (GET) 
// @Desc       
// @Router Protected 
router.get('/users', routerProtector, userController.getAllUserController);


module.exports = router