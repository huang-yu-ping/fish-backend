const express = require("express");
const router = express.Router();
//ctrl
const memberCtrl = require("../controllers/members");
//memberValidator
const memberValidator = require("../validator/member");
//auth
const auth = require('../middleware/auth')
//passport
const passport = require('passport')



//login
router.post("/login", memberValidator.postLogin, memberCtrl.postLogin);

//register
router.post("/register", memberValidator.postRegister, memberCtrl.postRegister);

//google login
router.get('/login/google', auth, memberCtrl.googleLogin);

//----------------google login
//router.get('/login/google/test', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/login/google/test', passport.authenticate('google-token'),
 function(req, res) {
  res.send(req.user);
});

// router.get('/google/callback', passport.authenticate('google', { 
//     failureMessage: 'cannot login with google, please try again later'
//   }),
//   (req, res) => {
//       console.log(req.user);
//       res.send('恭喜登入')
//   }
// )

module.exports = router;
