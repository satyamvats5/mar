const Admin = require('../../models/admin/admin');
const Mentor = require('../../models/mentor/mentor');
const Student = require('../../models/student/student');
const Spoc = require('../../models/college/college');
const path = require('path');

const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if(err)
            console.log(err);
    })
    return res.redirect('/');
}

exports.changePassword = (req, res, next) => {
    const role = req.session.role;
    if(role == 'admin') {
        const id = req.session.values;
        
        const old = req.body.old;
        const news = req.body.new;
        Admin.findOne(
            {
                where: {
                    id: id
                }
            }
        )
        .then(adminRes => {
            // console.log(adminRes.dataValues.id);
            if(adminRes == null) {
                return res
                    .status(200) 
                    .json({status: 404 , message: "Invalidpassword"});
            }
            console.log(old, adminRes.dataValues.password);
            return bcrypt
                .compare(old, adminRes.dataValues.password)
                .then(check => {
                    console.log(check);
                    if(check) {
                        bcrypt
                            .hash(news, 12)
                            .then(hashedPwds => {
                                return Admin.update(
                                    {
                                        password: hashedPwds
                                    },
                                    {
                                        where : {
                                            id: id
                                        }
                                    }
                                    
                                )
                            })
                            .then(updated => {
                                    res.redirect('/admin-index');
                            })
                        } else {
                            return res
                                .status(200) 
                                .json({status: 404 , message: "Invalidpassword"});
                        }
                    })
                })
                .catch(err => {
                    console.log(err.toString())
                    return res.status(200)
                    .json({status: 400, message: "Some Error occured, Please try again"});
                })

    } else if(role =="spoc") {
            const college_code = req.session.college_id;
            console.log(college_code);
            const old = req.body.old;
            const news = req.body.new;
            console.log(old, news);

            Spoc.findOne(
                {
                    where: {
                        college_code: college_code
                    }
                }
            )
            .then(adminRes => {
                // console.log(adminRes.dataValues.id);

                if(adminRes == null) {
                    return res
                        .status(200) 
                        .json({status: 404 , message: "Invalid"});
                }
                console.log(old, adminRes.dataValues.password);
                return bcrypt
                    .compare(old, adminRes.dataValues.password)
                    .then(check => {
                        console.log(check);
                        if(check) {
                            bcrypt
                                .hash(news, 12)
                                .then(hashedPwds => {
                                    return Spoc.update(
                                        {
                                            password: hashedPwds
                                        },
                                        {
                                            where : {
                                                college_code: college_code
                                            }
                                        }
                                        
                                    )
                                })
                                .then(updated => {
                                        res.redirect('/spoc-index');
                                })
                            } else {
                                return res
                                    .status(200) 
                                    .json({status: 404 , message: "Invalidpassword"});
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err.toString())
                        return res.status(200)
                        .json({status: 400, message: "Some Error occured, Please try again"});
                    })
    }
}

exports.collegeSignup = (req, res, next) => {
    console.log(req.body);
    const college_code = req.body.code;
    const email = req.body.email;
    const password = college_code;
    const name = req.body.name;
    Spoc.findOne({where : 
        {
            college_code: college_code
        }
    })
        .then(collegeSpoc => {
            if(collegeSpoc != null) {
                return res  
                        .status(200)
                        .json({status: 400 , message: "College Spoc already registered!"});
            }
            return bcrypt
                .hash(password, 10)
                .then(hashedPwd => {
                    const spoc = new Spoc(
                        {
                            college_code: college_code,
                            email: email,
                            password: hashedPwd,
                            name: name
                        }
                    )
                    return spoc.save()
                })
                .then(() => {
                    return res.redirect('/admin-add-college');
                    // return res
                    //     .status(201)
                    //     .json({status: 201, message: "Spoc added successfully"}); 
                })
        })
        .catch(err => {
            console.log(err.toString())
            return res.status(200)
            .json({status: 400, message: "Some Error occured, Please try again"});
        })
}

exports.mentorSignup = (req, res, next) => {
    console.log(req.body);

    const email = req.body.email;
    const password = req.session.college_id;
    const department = req.body.dept;
    const designation = req.body.desg;
    const name = req.body.name;

    Mentor.findOne({where : 
        {
            email: email
        }
    })
        .then(collegeSpoc => {
            if(collegeSpoc != null) {
                return res  
                        .status(200)
                        .json({status: 400 , message: "Mentor's email id  already Occupied!"});
            }
            return bcrypt
                .hash(password, 10)
                .then(hashedPwd => {
                    const mentor = new Mentor(
                        {
                            email: email,
                            department: department,
                            designation: designation,
                            password: hashedPwd,
                            name: name
                        }
                    )
                    return mentor.save()
                })
                .then(() => {
                    return res.redirect('/spoc-add-mentor');
                    // return res
                    //     .status(201)
                    //     .json({status: 201, message: "Spoc added successfully"}); 
                })
        })
        .catch(err => {
            console.log(err.toString())
            return res.status(200)
            .json({status: 400, message: "Some Error occured, Please try again"});
        })
}

exports.loginController = (req, res, next) => {
    console.log(req.body);
    const role = req.body.role;
    if(role == "admin") {
        const username = req.body.username;
        const pwd = req.body.password;
        Admin.findOne(
            {
                where: {
                    email: username
                }
            }
        )
        .then(adminRes => {
            // console.log(adminRes.dataValues.id);
            if(!adminRes) {
                return res
                    .status(200) 
                    .json({status: 404 , message: "Invalid id or password"});
            }
            bcrypt
                .compare(pwd, adminRes.dataValues.password)
                .then(check => {
                    if(check) {
                        
                        console.log("Admin logged in succesfully");
                        req.session.isLoggedIn = true;
                        req.session.values = adminRes.dataValues.id;
                        req.session.role = "admin";
                        req.session.cookie.maxAge = 10000 * 60 * 60;
                        return res.redirect('/admin-index');
                        // return res
                        //     .status(200)
                        //     .json({
                        //         status: 200 ,
                        //         message: "Admin Logged-In  Successfully",
                        //     });
                    } else {
                        return res
                            .status(200) 
                            .json({status: 404 , message: "Invalid id or password"});
                    } 
                })
        })
    } else if(role === "spoc") {
        const username = req.body.username;
        const pwd = req.body.password;
        Spoc.findOne(
            {
                where: {
                    email: username
                }
            }
        )
        .then(adminRes => {
            if(!adminRes) {
                return res
                    .status(200) 
                    .json({status: 404 , message: "Invalid id or password"});
            }
            bcrypt
                .compare(pwd, adminRes.dataValues.password)
                .then(check => {
                    if(check) {
                        console.log("Spoc logged in succesfully");
                        req.session.isLoggedIn = true;
                        req.session.role = "spoc";
                        req.session.college_id = adminRes.dataValues.college_code;
                        req.session.cookie.maxAge = 10000 * 60 * 60;
                        return res.redirect('/spoc-index');
                    } else {
                        return res
                            .status(200) 
                            .json({status: 404 , message: "Invalid id or password"});
                    } 
                })
        })
    } else if(role == "mentor") {
        const username = req.body.username;
        const pwd = req.body.password;
        Mentor.findOne(
            {
                where: {
                    email: username
                }
            }
        )
        .then(adminRes => {
            if(!adminRes) {
                return res
                    .status(200) 
                    .json({status: 404 , message: "Invalid id or password"});
            }
            bcrypt
                .compare(pwd, adminRes.dataValues.password)
                .then(check => {
                    if(check) {
                        console.log("Spoc logged in succesfully");
                        req.session.isLoggedIn = true;
                        req.session.role = "mentor";
                        req.session.college_id = adminRes.dataValues.college_code;
                        req.session.mentor_id = mentor_id;
                        req.session.cookie.maxAge = 10000 * 60 * 60;
                        return res
                            .status(200)
                            .json({
                                status: 200 ,
                                message: "Mentor Logged-In  Successfully",
                            });
                    } else {
                        return res
                            .status(200) 
                            .json({status: 404 , message: "Invalid id or password"});
                    } 
                })
        })
    }
    
    
    // console.log(req.body);
    // User.findAll( {where : {
    //     email: username
    // }
    // })
    //     .then(user => {
    //         // console.log(user);
    //         if(!user[0]) {
    //             return res
    //                 .status(200) 
    //                 .json({status: 400 , message: "Invalid UserID or password"});
    //         }   
    //         bcrypt
    //             .compare(pwd, user[0].dataValues.password)
    //             .then(check => {
    //                 // This check gives us boolean
    //                 if(check) {
                        
    //                     if(parseInt(user[0].dataValues.status) === 0){ // Negelecting Type
                            
    //                         return res.status(400).json({status: 400 , message: "Profile Not Activated!"});

    //                     }else{
    //                         req.session.isLoggedIn = true;
    //                         req.session.user_id = user[0].dataValues.user_id;
    //                         req.session.cookie.maxAge = 10000 * 60 * 60;
    //                         if(user[0].dataValues.role == 'admin') {
    //                             req.session.admin = true;
    //                         } else {
    //                             req.session.admin = false;
    //                         }
    //                     console.log("User logged in succesfully");
    //                     return res
    //                         .status(200)
    //                         .json({
    //                             status: 200 ,
    //                             message: "User Logged In  Successfully",
    //                             // token: token,
                               
    //                         });
    //                 }
    //             }else{
    //                     res
    //                     .status(200)
    //                     .json({status: 201 , message: "Invalid UserID or password"});
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 res
    //                     .status(400)
    //                     .json({status:  400 , message: err.toString()});
    //             });
    //     });
}

exports.signupController = (req, res, next) => {
    const role = req.body.role;
    if(role === "admin") {
        const email = req.body.email;
        const pwd = req.body.password;
        const admin_id = req.body.id;
        const phone = req.body.phone;
        const id = req.body.id;
        return bcrypt
                    .hash(pwd, 12)
                    .then(hashedPwd => {
                        const admin = new Admin(
                            {
                                id: id,
                                admin_id: admin_id,
                                email: email,
                                password: hashedPwd,
                                phone: phone
                            }
                        )
                        return admin.save()
                        })
            .then(Result => {
                return res
                    .status(201)
                    .json({status: 201, message: "Admin added successfully"});
            })
            .catch(err => {
                return res
                        .status(400)
                        .json({"status": 400, "message": err.toString()});
            })
    } else if (role === "spoc") {
        const college_code = req.body.code;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        Spoc.findOne({where : 
            {
                college_code: college_code
            }
        })
            .then(collegeSpoc => {
                if(collegeSpoc != null) {
                    return res  
                            .status(200)
                            .json({status: 400 , message: "College Spoc already registered!"});
                }
                return bcrypt
                    .hash(password, 12)
                    .then(hashedPwd => {
                        const spoc = new Spoc(
                            {
                                college_code: college_code,
                                phone: phone,
                                email: email,
                                password: hashedPwd,
                                name: name
                            }
                        )
                        return spoc.save()
                    })
                    .then(() => {
                        return res
                            .status(201)
                            .json({status: 201, message: "Spoc added successfully"}); 
                    })
            })
            .catch(err => {
                return res
                        .status(400)
                        .json({"status": 400, "message": err.toString()});
            })
    } else if (role == "mentor") {
        const college_code = req.body.code;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        Mentor.findOne({where : 
            {
                email: email
            }
        })
            .then(mentorRes => {
                if(mentorRes != null) {
                    return res  
                            .status(200)
                            .json({status: 400 , message: "EMail Id  already registered!"});
                }
                return bcrypt
                    .hash(pwd, 12)
                    .then(hashedPwd => {
                        const mentor = new Mentor(
                            {
                                phone: phone,
                                email: email,
                                password: password,
                                name: name,
                                college_code: college_code
                            }
                        )
                        return mentor.save()
                    })
                .then(() => {
                    return res
                        .status(201)
                        .json({status: 201, message: "Mentor added successfully"}); 
                })
            })
            .catch(err => {
                return res
                        .status(400)
                        .json({"status": 400, "message": err.toString()});
            })
    } else if (role == "student") {
        // const college_code = req.body.code;
        // const phone = req.body.phone;
        // const email = req.body.email;
        // const password = req.body.password;
        // const name = req.body.name;
        // const 
    }
}