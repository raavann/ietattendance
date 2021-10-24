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
    try {
        const {email, password} = req.body;
        conn.query(`select * from logins where email = '${email}'`, (error, results) => {
            if (results.length==0 || (results[0].password!=password)){
                res.status(401).render('login');
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
                console.log('im rendereng home');
                res.status(200).redirect('/home');
            }
        });
    } catch (error) {
        console.log(error);
    }
    
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