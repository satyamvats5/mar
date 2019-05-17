const path = require('path');
const college = require('../../models/college/college');
const mentor = require('../../models/mentor/mentor');

exports.addCollege = (req, res, next) => {
    const code = req.body.code;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone ? req.body.phone : 0000000000;
    
    const College = new college(
        {
            college_code: code,
            phone: phone,
            email: email,
            name: name
        }
    )
    console.log(College)
    College.save()
        .then(Res => {
            console.log(Res);
            if(Res) {
                return res.sendFile(path.join(__dirname + './public/auth/admin_add_college.html'));
            } else  {
                return res.status(200)
                    .json({status: 400, message: "Some Error occured, Please try again"});
            }
        })
        .catch(err => {
            return res.status(200)
                    .json({status: 400, message: "Some Error occured, Please try again"});
        })
}



exports.addMentor = (req, res, next) => {
    const name= req.body.name;
    const department = req.body.dept;
    const designation = req.body.desg;
    const email = req.body.email;

    mentor.findOne(
        {
            where: {
                email: email
            }
        }
    )
    .then(Result => {
        if(Result != null) {
            return res
                .status(200)
                .json({status: 204, message: "This email already used"});
        } else {
            
            const Mentor = new mentor(
                {
                    mentor_id: 1,
                    name: name,
                    
                }
            )
        }

    })

}