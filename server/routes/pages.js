const router = require('express').Router();

const authController = require('../controller/auth');

const services = require('../services/render');

router.get('/',authController.isLoggedIn, services.homeRoutes)
router.get('/home',authController.isLoggedIn, services.homeRoutes)


router.get('/info', services.infoRoutes)
router.get('/login', services.loginRoutes)

// time table managements
router.get('/add', services.addRoutes)
router.get('/update', services.updateRoutes)

router.get('/test' , (req , res) => {
    console.log(req.params.id);
    res.render('login' , {
        msg : `uo`
    })
});

module.exports = router