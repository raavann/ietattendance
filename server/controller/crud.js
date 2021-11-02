require('dotenv').config();

const crud = require('../services/crud');


// create and add new data into table
exports.add = (req,res)=>{
    req.body.allocation = req.params.allocation;

    crud.add(req.body , (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success : 0,
                message : "Database connection error!"
            });
        }
        return res.status(200).render('./add' , {allocation : req.params.allocation})
    });
}

// retrieve and return all/one data from table, if id = 0, returns all entries
exports.find = (req,res) => {
    const id = req.query.id || -1;
    const allocation = req.params.allocation;

    crud.find(allocation, id , (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if ( !results ) {
            return res.json({
                success : 0,
                message : "Record not found!"
            });
        }

        return res.json({
            success : 1,
            data : results
        });
    });
}

//update a new field
exports.update = async (req,res) => {
    req.body.id = req.params.id;
    req.body.allocation = req.params.allocation;

    crud.update (req.body, (err, results) => {
        if(err){
            console.log(err);
            return;
        }
        return res.json({
            success : 1,
            message : "Record updated successfully!"
        });
    });

    
}

// delete a field
exports.delete = async (req, res) => {
    req.body.id = req.params.id;
    req.body.allocation = req.params.allocation;

    crud.delete (req.body , (err, results) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!results) {
            return res.json({
                success : 0,
                message : "record not found"
            });
        }

        return res.json({
            success: 1,
            message : "user deleted successfully!"
        });
    });
}