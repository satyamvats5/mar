const path = require('path');

exports.getHome = (req, res, next) => {
    res.sendFile(path.join(__dirname + './public/index.html'));
}

exports.adminHome = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/admin/index.html'))
}

exports.adminUpdate = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/admin/admin_update.html'))
}

exports.adminAddCollege = (re, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/admin/admin_add_college.html'))
}