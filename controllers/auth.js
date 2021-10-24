const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

dotenv.config();

const conn = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DBLOGIN
});

exports.login = (req, res) => {
    const {email, password} = req.body;

    conn.query(`select * from logins where email = '${email}'`, (error, results) => {
        if(error) throw error;
        if (!results || (results[0].password!=password)){
            res.status(401).render('login', {
                message: 'Email or Password is incorrect!'
            });
        } else {
            const id = results[0].id;
            const token = jwt.sign({id}, process.env.SESSION_SECRET, {
                expiresI : process.env.EXPIRE
            });

            const cookieOptios = {
                expires : new Date (
                    Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60
                ),
                httpOnly : true
            }

            res.cookie('jwt')
        }
    });
}