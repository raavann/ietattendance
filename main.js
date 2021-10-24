//express
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

//path for public css
const path = require('path')
const publicDirectory = path.join(__dirname,  './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

//view engine
app.set('view engine', 'ejs')

//routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

//ports
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})