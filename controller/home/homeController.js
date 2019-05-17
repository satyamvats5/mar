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

exports.spocHome = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/spoc/index.html'));
}

exports.spocUpdate = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/spoc/spoc_update.html'));
}

exports.spocApprove = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/spoc/spoc_approve.html'));
}

exports.spocAddMentor = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/spoc/spoc_add_mentor.html'));
}

exports.mentorHome = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/mentor/index.html'));
}

exports.mentorUpdate = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/mentor/mentor_update.html'));
}

exports.mentorAddStudent = (req, res, next) => {
    res.sendFile(path.join(__dirname + '../../../public/mentor/mentor_student_add.html'));
}
