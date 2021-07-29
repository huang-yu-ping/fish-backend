const { body } = require('express-validator')
const validate = require('../middleware/validate')
const PromiseBlueBird = require('bluebird');
const bcrypt = PromiseBlueBird.promisifyAll(require('bcrypt'))
//db
const db = require('../models');
const Members = db.membersModel;


exports.postLogin = [
    validate([
      body('member.account')
        .notEmpty().withMessage('email不能為空')
        .trim(),
      body('member.password')
        .notEmpty().withMessage('密碼不為空')
        .isAlphanumeric()
        .trim()
     ]),
    validate([
      body('member.account')
        .custom(async (account, { req }) => {
          const member = await Members.findOne({ where: { account } });
          if(!member) {
            return Promise.reject('帳戶不存在');
          }
  
          req.member = member
        })   
    ]),
    validate([
      body('member.password')
        .custom(async (password, { req }) => {
          //密碼比對
          const compare = await bcrypt.compareAsync(password, req.member.password)
          if(!compare) {
            return Promise.reject('密碼錯誤')
          } 
        })
    ])
  ]


//register step 1.
//register step 2.
exports.postRegister = [
    validate([
        //訂制規則
        body('member.account')
            .notEmpty().withMessage('會員名不能為空')
            .isAlphanumeric()
            .trim()
            .custom(async account => {
              const member = await Members.findOne({ where: { account } })
              if(member) {
                return Promise.reject('會員帳號已有')
              }
            }),
        ]),
    validate([
        body('member.email')
            .notEmpty().withMessage('會員email不能為空')
            .isEmail().withMessage('email格式錯誤')
            .bail()
            .custom(async email => {
              const member = await Members.findOne({ where: { email } })
              if(member) {
                return Promise.reject('email已有')
              }
            })
            .normalizeEmail(),
        ]),
    validate([
        body('member.password')
            .notEmpty().withMessage('密碼不能為空')
            .isLength({ min: 6 }).withMessage('至少六位數')
            .isAlphanumeric()
            .trim(),
        body('member.comfirmPassword')
            .notEmpty().withMessage('密碼不能為空')
            .isLength({ min: 6 }).withMessage('至少六位數')
            .isAlphanumeric()
            .trim()
        ]),
    validate([
        body('member.name')
            .notEmpty().withMessage('名字不能為空')
            .trim()
            .isLength({ max: 100 }),
        body('member.gender')
            .notEmpty().withMessage('請選擇性別')
            .isNumeric(),
        body('member.birthday')
            .notEmpty().withMessage('請選擇生日'),
        body('member.phone')
            .notEmpty().withMessage('請填寫電話')
            .trim()
            .isLength({ max: 10, min: 10 }).withMessage('請填寫正確電話'),
        body('member.address')
            .notEmpty().withMessage('地址不能為空')
            .trim()
            .isLength({ max: 200 }),
    ])
]

