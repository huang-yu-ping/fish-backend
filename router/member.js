const express = require('express');
const router = express.Router();
//ctrl
const memberCtrl = require('../controllers/members');
//memberValidator
const memberValidator = require('../validator/member');

//login
router.post('/login', memberCtrl.postLogin)

//register
router.post('/register', memberValidator.postRegister, memberCtrl.postRegister)

//current member profile 
router.get('/profiles/:memberName', (req, res) => {
    res.send('get /profiles')
})

//update
router.put('/', )

module.exports = router;