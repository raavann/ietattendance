const router = require('express').Router();
const auth = require('../controller/auth')

//CRUD API
const crud = require('../controller/crud');

// Add entry into specific table
router.post('/add',  crud.add)

// Find all/one entries of specific table, if id = 0 findall else find id
router.get('/find/:id', auth.checkToken, crud.find)

// update one entry of specific table
router.put('/update/:id', auth.checkToken, crud.update)

// delete one entry of specific table
router.delete('/delete/:id', auth.checkToken, crud.delete)

router.get('/fake', (req, res)=>{
    console.log("wo odo ");
    res.render('login', { msg : "hello"});
})

module.exports = router