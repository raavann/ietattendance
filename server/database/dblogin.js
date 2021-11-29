const { createPool } = require('mysql2');

require('dotenv').config();

const pool = createPool({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DBLOGIN,
    connectionLimit : 10
});

// pool.query('select * from logins');
// pool.query(
//     `select * from logins`,

//     (error, results, fields) => {
//         console.log(error);
//         console.log(results);
//     }
// );
module.exports = pool;