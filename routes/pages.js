const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('front');
})

router.get('/login', (req, res) => {
    res.render('login.ejs');
})

router.get('/home', (req, res) => {
    res.render('home.ejs');
})

module.exports = router