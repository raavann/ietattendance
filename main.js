//express
const express = require('express')
const app = express()

//view engine and json format
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.json());

//path for public css
const path = require('path')
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

//routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.get('/auth/login', (req,res)=>{
    console.log(req.body);
})


//ports
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})