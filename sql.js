var mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config()

var connection = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
}); 

connection.query("INSERT INTO FAKE (NAME) VALUES ('ANURUDH');");
 
connection.end();
