const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/_isAuth');

const authController = require('../controller/auth/authController');

const homeController = require('../controller/home/homeController');

const collegeController = require('../controller/college/collegeController');

router
    .post('/login', authController.loginController)
    .post('/signup', authController.signupController)
    .get('/logout', authController.logoutController)

router
    .post('/college-signup', isAuth.admin, authController.collegeSignup)
    .post('/change-password', isAuth.admin, authController.changePassword)
    .post('/mentor-signup', isAuth.spoc, authController.mentorSignup)

router
    .get('/spoc-index', isAuth.spoc, homeController.spocHome)
    .get('/spoc-update', isAuth.spoc, homeController.spocUpdate)
    .get('/spoc-approve', isAuth.spoc, homeController.spocApprove)
    .get('/spoc-add-mentor', isAuth.spoc, homeController.spocAddMentor)
    

router
    .get('/admin-index', isAuth.admin, homeController.adminHome)  
    .get('/admin-update', isAuth.admin, homeController.adminUpdate)
    .get('/admin-add-college', isAuth.admin, homeController.adminAddCollege)
    .get('/', homeController.getHome)
    

module.exports = router;