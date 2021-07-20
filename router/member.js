const express = require('express');
const router = express.Router();
//ctrl
const memberCtrl = require('../controllers/members');
//memberValidator
const memberValidator = require('../validator/member');
//verify token middleware
const auth = require('../middleware/auth');



//login
router.post('/login', memberValidator.postLogin, memberCtrl.postLogin)

//register
router.post('/register', memberValidator.postRegister, memberCtrl.postRegister)

//current member profile 
router.get('/profile', auth, (req, res) => {
    console.log(req.member)
    res.send('get /profile')
})

//update
router.put('/', )

module.exports = router;