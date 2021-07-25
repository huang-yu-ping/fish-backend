const Promise = require('bluebird');
//password
const bcrypt = Promise.promisifyAll(require('bcrypt'));
//jwt
const jwt = require('../utils/jwt');
const { jwtSecret } = require('../config/jwt-secret');
// members mysql
const db = require('../models');
const Members = db.membersModel;





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
            token
        }
        res.status(200).json({
            member
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
                res.status(422).json({
                    nextStep: false,
                    message: "密碼不一致"
                });
                res.end();
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
                mewssage: "恭喜註冊成功",
                member
            })

        } catch(err) {
            next(err)
        }
}

