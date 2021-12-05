require('dotenv').config();

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const conn = require('../database/dblogin')

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        conn.query(`select * from logins where email = '${email}'`, (error, results) => {
            if (!results || results.length==0 || (results[0].password!=password)){
                res.render('login' , { msg : "Try again! Invalid email or password!" })
            } else {
                results[0].password = undefined;
                const token = jwt.sign({ result : results[0] }, process.env.SESSION_SECRET, {
                    expiresIn : process.env.EXPIRE
                });
    
                const cookieOptions = {
                    expires : new Date (
                        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
                    ),
                    httpOnly : true
                }
                
                res.cookie('jwt', token, cookieOptions );
                res.redirect('/home');
            }
        });
    } catch (error) {
        console.log(error);
    }
    
}

exports.isLoggedIn = async (req, res, next) => {
    try{
        if (req.cookies.jwt){
            try {
                const decoded =  await promisify(jwt.verify)(req.cookies.jwt, process.env.SESSION_SECRET);
                conn.query(`select * from logins where id = ${decoded.result.id}`, (error,results)=>{
                    if(!results || results.length == 0){
                        return next();
                    }
                    req.user = results[0];
                    return next();
                });
                
            } catch(error) {
                console.log(error);
                return next();
            }
        } else{
            return next();
        }
    } catch(error){
        console.log(error);
        return next();
    }
}

exports.logout = async (req, res) => {
    res.cookie('jwt' , 'loggingOut', {
        expiresIn : new Date(Date.now() + 2*1000),
        httpOnly : true
    });

    res.status(200).redirect('/');
}