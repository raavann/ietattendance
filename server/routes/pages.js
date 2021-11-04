const router = require('express').Router();

const authController = require('../controller/auth');

const services = require('../services/render');

router.get('/',authController.isLoggedIn, services.homeRoutes)
router.get('/home',authController.isLoggedIn, services.homeRoutes)


router.get('/about', services.aboutRoutes)
router.get('/login', services.loginRoutes)

// time table managements
router.get('/add', services.addRoutes)
router.get('/update/:allocation', services.updateRoutes)

module.exports = router