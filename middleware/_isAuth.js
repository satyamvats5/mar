exports.admin = (req, res, next) => {
    if(!req.session.isLoggedIn && req.session.role != 'admin') {
        return res.redirect('/');
    }
    console.log("Logged In");
    next();
};