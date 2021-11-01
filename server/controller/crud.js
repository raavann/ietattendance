require('dotenv').config();

const crud = require('../services/crud');
const { verify } = require('jsonwebtoken');

function auth(req, res) {
    if(!req.body){
        res.status(400).send({
            message : "Entries can not be empty!"
        });
        return true;
    }

    // if(!req.cookies.jwt){
    //     // logout here
    //     res.status(400).send({
    //         message : "Please login again!"
    //     });
    //     return true;
    // }

    return false;
}

// create and add new data into table
exports.add = (req,res)=>{
    if(auth(req,res)) {return;}

    req.body.allocation = 'civil1'//verify(req.cookies.jwt, process.env.SESSION_SECRET).result.allocation;

    crud.add(req.body , (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success : 0,
                message : "Database connection error!"
            });
        }
        return res.status(200).json({
            success : 1,
            data : results
        });
    });
}

// retrieve and return all/one data from table, if id = 0, returns all entries
exports.find = (req,res) => {
    const id = req.params.id;
    const allocation = verify(req.cookies.jwt, process.env.SESSION_SECRET).result.allocation;
    
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
    if(auth(req,res)) {return;}

    req.body.id = req.params.id;
    req.body.allocation = verify(req.cookies.jwt, process.env.SESSION_SECRET).result.allocation;

    // const {subject , starttime, endtime, link} = req.body;
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
    if(auth(req,res)) {return;}
    req.body.id = req.params.id;
    req.body.allocation = verify(req.cookies.jwt, process.env.SESSION_SECRET).result.allocation;

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