const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const conn = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DBLOGIN
});

function auth(req, res) {
    if(!req.body){
        res.status(400).send({
            message : "Entries can not be empty!"
        });
        return;
    }

    if(!req.cookies.jwt){
        // logout here
        res.status(400).send({
            message : "Please login again!"
        });
        return;
    }
}

// create and add new data into table
exports.create = async (req,res)=>{
    auth(req,res);

    const {subject , starttime, endtime, link} = req.body;
    const decoded =  await promisify(jwt.verify)(req.cookies.jwt, process.env.SESSION_SECRET);

    if(decoded.allocation == 'all'){
        return;
    }

    conn.query(`insert into ${decoded.allocation} (sub, st, et, link) values('${subject}','${starttime}','${endtime}','${link}')`, (error, results)=>{
        if(error){
            res.status(400).send({
                message : "Your entried were invalid, Please try again!"
            });
            return;
        }
    }); 
}

// retrieve and return all/one data from table
exports.find = (req,res) => {
    // const decoded =  await promisify(jwt.verify)(req.cookies.jwt, process.env.SESSION_SECRET);
    const allocation = req.params.al;
    console.log(decoded);
    conn.query(`select * from ${allocation}`, (error, results)=>{
        if(error){
            res.status(400).send({
                message : "Your entried were invalid, Please try again!"
            });
            return;
        }
        return results;
    }); 
}

//update a new field
exports.update = async (req,res) => {
    auth(req,res);
    const id = req.params.id;
    const decoded =  await promisify(jwt.verify)(req.cookies.jwt, process.env.SESSION_SECRET);
    const {subject , starttime, endtime, link} = req.body;

    conn.query(`update ${decoded.allocation} set sub='${subject}', st='${starttime}', et='${endtime}',link='${link}'`, (error, results)=>{
        if(error){
            res.status(400).send({
                message : "Your entries were invalid, Please try again!"
            });
            return;
        }
    });
}

// delete a field
exports.delete = async (req, res) => {
    auth(req,res);
    const id = req.params.id;
    const decoded =  await promisify(jwt.verify)(req.cookies.jwt, process.env.SESSION_SECRET);

    conn.query(`delete from ${decoded.allocation} where id=${id}`, (error, results)=>{
        if(error){
            res.status(400).send({
                message : "Oops! Something went very wrong, Please try again!"
            });
            return;
        } else {
            res.send({
                message: "Deleted"
            })
        }
    });
}