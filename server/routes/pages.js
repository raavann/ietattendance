const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

const services = require('../services/render');

router.get('/',authController.isLoggedIn, services.homeRoutes)
router.get('/home',authController.isLoggedIn, services.homeRoutes)


router.get('/info', services.infoRoutes)
router.get('/login', services.loginRoutes)

// time table managements
router.get('/add', services.addRoutes)
router.get('/update', services.updateRoutes)

//CRUD API
const crud = require('../controller/crud');
router.post('/api/data/:al', crud.create)
router.get('/api/data/:al', crud.find)
router.put('/api/data/:al/:id', crud.update)
router.post('/api/data/:al/:id', crud.delete)

//test
router.get('/test', async (req,res)=>{
    const jwt = require('jsonwebtoken');
    const { promisify } = require('util');
    console.log(req.cookies.jwt);
    const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.SESSION_SECRET);
    console.log(decoded);
})

module.exports = router