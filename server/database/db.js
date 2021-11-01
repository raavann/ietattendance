const { createPool } = require('mysql');

require('dotenv').config();

const pool = createPool({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DBLOGIN,
    connectionLimit : 10
});

pool.query('show grants' , (error, results, fields)=>{
    if (error){
        console.log(error);
    } else {
        console.log(results);
    }
})

module.exports = pool;