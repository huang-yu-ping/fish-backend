const express = require("express");
const router = express.Router();
//ctrl
const memberCtrl = require("../controllers/members");
//memberValidator
const memberValidator = require("../validator/member");
//passport
const passport = require('passport')
//passport-setup
require('../middleware/passport-setup');


//login
router.post("/login", memberValidator.postLogin, memberCtrl.postLogin);

//register
router.post("/register", memberValidator.postRegister, memberCtrl.postRegister);

//google login
router.post('/login/google', passport.authenticate('google-token', { session: false }), memberCtrl.googleLogin);



module.exports = router;
