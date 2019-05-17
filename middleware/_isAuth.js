exports.admin = (req, res, next) => {
    if(!req.session.isLoggedIn && req.session.role != 'admin') {
        return res.redirect('/');
    }
    console.log("Logged In");
    next();
};

exports.spoc = (req, res, next) => {
    if(!req.session.isLoggedIn && req.session.role != 'spoc') {
        return res.redirect('/');
    }
    console.log("Logged In");
    next();
};

exports.mentor = (req, res, next) => {
    if(!req.session.isLoggedIn && req.session.role != 'mentor') {
        return res.redirect('/');
    }
    console.log("Logged In");
    next();
};