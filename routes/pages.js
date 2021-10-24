const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', (req, res) => {
    res.render('front');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/home',authController.isLoggedIn, (req, res) => {
    console.log('inside get/home')
    if (req.user){
        console.log('user found going/home')
        res.render('/home');
    } else {
        console.log('user not found going /login')
        res.redirect('/login');
    }
    
})

module.exports = router