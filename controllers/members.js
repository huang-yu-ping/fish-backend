const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
// members mysql
const db = require('../models');
const Members = db.membersModel;
//login
exports.postLogin = (req, res, next) => {
        try {
            res.send('post login')
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

// step 1.

// 檢查是否想同帳號,如果有相同,不給註冊
// 檢查密碼和確認密碼是否一致
// step 2.
// 3. 驗證其他欄位

//get current member info