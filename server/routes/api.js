const router = require('express').Router();
const auth = require('../controller/auth')

//CRUD API
const crud = require('../controller/crud');

// Add entry into specific table
router.post('/add/:allocation',  crud.add)

// Find all/one entries of specific table, if id = 0 findall else find id
router.get('/find/:allocation',  crud.find)

// update one entry of specific table
router.put('/update/:allocation/:id', crud.update)

// delete one entry of specific table
router.delete('/delete/:allocation/:id',  crud.delete)


module.exports = router