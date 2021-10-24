const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/',authController.isLoggedIn, (req, res) => {
    if (req.user){
        res.render('home');
    } else {
        res.redirect('/login');
    }
    
})

router.get('/info', (req, res) => {
    res.render('front');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/home',authController.isLoggedIn, (req, res) => {
    if (req.user){
        res.render('home');
    } else {
        res.redirect('/login');
    }
    
})

module.exports = router