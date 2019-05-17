const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/_isAuth');

const authController = require('../controller/auth/authController');

const homeController = require('../controller/home/homeController');

router
    .post('/login', authController.loginController)
    .post('/signup', authController.signupController)
    .get('/logout', authController.logoutController)

router
    .post('/college-signup', isAuth.admin, authController.collegeSignup)

router
    .get('/admin-index', isAuth.admin, homeController.adminHome)  
    .get('/admin-update', isAuth.admin, homeController.adminUpdate)
    .get('/admin-add-college', isAuth.admin, homeController.adminAddCollege)
    .get('/', homeController.getHome)
    

module.exports = router;