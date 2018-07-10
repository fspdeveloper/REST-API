const router = require('express').Router();
const contactControllers = require('../controllers/contactController')
const routerProtector = require('../middlewares/routerProtector')


// @Route (GET) 
// @Desc        
// @Access Public
router.get('/contacts/', routerProtector, contactControllers.getContactController);


// ------------------------------
// ------------------------------

// @Router (POST) 
// @Desc       
// @Router Protected 
router.post('/contact/', routerProtector, contactControllers.postContactController);


// ------------------------------
// ------------------------------

// @Router (GET) Edit By Id
// @Desc        
// @Router Protected 
router.get('/contact/:id', routerProtector, contactControllers.getSingelContactController);


// ------------------------------
// ------------------------------

// @Router (PATCH)
// @Desc        
// @Router Protected 
router.patch('/contact/:id', routerProtector, contactControllers.patchContactController);


// ------------------------------
// ------------------------------

// @Router DELETE
// @Desc        
// @Router Protected 
router.delete('/contact/:id', routerProtector, contactControllers.deleteContactController);

module.exports = router