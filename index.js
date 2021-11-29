const express = require('express')
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()

// log requests
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: false }))
app.use(express.json() );
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs')
// app.set("views", path.resolve(__dirname, "views/ejs"))

// path for assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// routes
app.use('/', require('./server/routes/pages'));
app.use('/auth', require('./server/routes/auth'));
app.use('/api' , require('./server/routes/api'))

// ports
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})