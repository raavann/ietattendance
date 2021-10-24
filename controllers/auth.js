const mysql = require('mysql');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

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
        if (results.length==0 || (results[0].password!=password)){
            console.log('render logins error 401 auth controller line 20')
            res.status(400).render('login', {
                message: 'Email or Password is incorrect!'
            });
        } else {
            const id = results[0].id;
            const token = jwt.sign({id}, process.env.SESSION_SECRET, {
                expiresIn : process.env.EXPIRE
            });

            const cookieOptions = {
                expires : new Date (
                    Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
                ),
                httpOnly : true
            }

            res.cookie('jwt', token, cookieOptions );
            res.status(200).redirect('/home');
        }
    });
}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt){
        try {
            const decoded =  await promisify(jwt.verify)(req.cookies.jwt, process.env.SESSION_SECRET);
            conn.query(`select * from logins where id = ${decoded.id}`, (error,results)=>{
                if(results.length == 0){
                    return next();
                }
                req.user = results[0];
            });

        } catch(error) {
            console.log(error);
            return next();
        }
    } else{
        next();
    }
    
}