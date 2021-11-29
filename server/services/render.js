const axios = require('axios');
const { verify } = require('jsonwebtoken');
const port = process.env.PORT || 3000;

exports.homeRoutes = (req, res)=>{
    if (req.user){
        const allocation = verify(req.cookies.jwt, process.env.SESSION_SECRET).result.allocation;

        axios.get(`http://localhost:${port}/api/find/${allocation}`)
        .then( response => {
            res.render('home', { allocation, data : response.data.data });
        })
        .catch (err => {
            res.send(err);
        });
        
    } else {
        res.render('login', {
            msg : ""
        });
    }
}

exports.aboutRoutes = (req, res)=>{
    res.render('about');
}

exports.loginRoutes = (req, res)=>{
    res.render('login' , { msg : "" });
}

exports.addRoutes = (req, res)=>{
    const allocation = verify(req.cookies.jwt, process.env.SESSION_SECRET).result.allocation;
    res.render('add', { allocation });
}

exports.updateRoutes = (req, res)=>{
    const allocation = req.params.allocation;
    const id = req.query.id;
    console.log(allocation, id)
    axios.get(`http://localhost:${port}/api/find/${allocation}?id=${id}`)
    .then( function (response) {
        res.render('update', { allocation : allocation, data : response.data.data[0]});
    })
    .catch ( err=>{
        res.send(err);
    });
}