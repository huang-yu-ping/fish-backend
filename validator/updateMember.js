const { body } = require("express-validator");
const validate = require("../middleware/validate");
const PromiseBlueBird = require("bluebird");
const bcrypt = PromiseBlueBird.promisifyAll(require("bcrypt"));
//db
const db = require("../models");
const Members = db.membersModel;

exports.updateFile = [
  validate([
    body("member.password")
      .isLength({ min: 6 })
      .withMessage("至少六位數")
      .isAlphanumeric()
      .trim()
      .optional(),
    body("member.name").trim().isLength({ max: 100 }),
    body("member.email")
      .optional()
      .isEmail()
      .withMessage("email格式錯誤")
      .bail()
      // .custom(async (email) => {
      //   const member = await Members.findOne({ where: { email } });
      //   if (member) {
      //     return Promise.reject("email已有");
      //   }
      // })
      .normalizeEmail(),
    body("member.phone")
      .optional()
      .trim()
      .isLength({ max: 10, min: 10 })
      .withMessage("請填寫正確電話"),
    body("member.address").trim().isLength({ max: 200 }),
  ]),
];
