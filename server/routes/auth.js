const router = require('express').Router();
const authController = require('../controller/auth')


router.post('/login', authController.login )

router.get('/logout', authController.logout)

module.exports = router