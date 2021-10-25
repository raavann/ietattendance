exports.homeRoutes = (req, res)=>{
    if (req.user){
        res.render('home');
    } else {
        res.redirect('/login');
    }
}

exports.infoRoutes = (req, res)=>{
    res.render('info');
}

exports.loginRoutes = (req, res)=>{
    res.render('login');
}

exports.addRoutes = (req, res)=>{
    res.render('add');
}

exports.updateRoutes = (req, res)=>{
    res.render('update');
}