const { createPool } = require('mysql2');

require('dotenv').config();

const pool = createPool({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DBTT,
    connectionLimit : 10
});

module.exports = pool;