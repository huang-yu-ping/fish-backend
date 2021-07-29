const Promise = require('bluebird');
//password
const bcrypt = Promise.promisifyAll(require('bcrypt'));
//jwt
const jwt = require('../utils/jwt');
const { jwtSecret } = require('../config/jwt-secret');
// members mysql
const db = require('../models');
const Members = db.membersModel;
//send email
const snedEmail = require('../utils/email')




//login
exports.postLogin = async (req, res, next) => {
    try {
        //驗證
        //生成token
        const memberOne = req.member.toJSON();
        const token = await jwt.sign({
            memberId: memberOne.id
        }, jwtSecret, {
            //set expire time
            expiresIn: '1h'
        })
        //response to client
        const member = {
            name: memberOne.name,
            email: memberOne.email,
            image: memberOne.image,
            token
        }
        res.status(200).json({
            member
        })


    } catch(err) {
        next(err)
    }
}

exports.googleLogin = async (req, res, next) => {
    try {
       console.log(req.member)
       const { name, email, picture } = req.member
       let password = '123456'
       //加密
       snedEmail.sendEmail(email, password)
       //create new member
       const clientPassword = await bcrypt.hashAsync(password, 10);
       const newMember = await Members.create({
           name: name,
           account: email,
           email: email,
           image: picture,
           password: clientPassword
       })
       res.status(200).json({
          newMember
       })

    } catch(err) {
        next(err)
    }
}


//register
exports.postRegister = async (req, res, next) => {
        try {
            //step 1. 
            //1. 獲取帳號,email,密碼,comfirm pwd
            //2. pwd & comfirmpwd is same?
            console.log(req.body);
            let { password, comfirmPassword } = req.body.member;
            if( password !== comfirmPassword ) {
                res.status(201).json({
                    nextStep: false,
                    message: "密碼不一致"
                });
                return;
            }
            //加密
            req.body.member.password = await bcrypt.hashAsync(password, 10);
            //step 2.
            //save members table
            const saveMember = await Members.create(req.body.member);
            const member = {
                name: saveMember.username,
                email: saveMember.email
            }
            res.status(201).json({
                message: "恭喜註冊成功",
                member
            })

        } catch(err) {
            next(err)
        }
}

