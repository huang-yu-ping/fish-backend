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
            expiresIn: '24h'
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
       const { name, email, image, token } = req.user
       console.log(token)
       let password = '123456';
       //加密
       password = await bcrypt.hashAsync(password, 10);
       const createMember = {
          account: email,
          name,
          email,
          image,
          password
       }
       const newMember = await Members.findOrCreate({ where: {
           email: email
        }, defaults: createMember })
        console.log(newMember)
        const jwtToken = await jwt.sign({
            memberId: newMember[0].dataValues.id
        }, jwtSecret, {
            //set expire time
            expiresIn: '24h'
        })
        console.log(jwtSecret)
        console.log(jwtToken)
        const member = {
            name: newMember[0].dataValues.name,
            email: newMember[0].dataValues.email,
            image: newMember[0].dataValues.image,
            token: jwtToken,
            isLogin: true
        }
        res.status(201).json({member})
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

