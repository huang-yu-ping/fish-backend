const express = require("express");
const router = express.Router();
//ctrl
const memberCtrl = require("../controllers/members");
//memberValidator
const memberValidator = require("../validator/member");
//verify token middleware

//login
router.post("/login", memberValidator.postLogin, memberCtrl.postLogin);

//register
router.post("/register", memberValidator.postRegister, memberCtrl.postRegister);

//current member profile

module.exports = router;
