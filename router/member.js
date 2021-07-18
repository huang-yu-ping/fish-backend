const express = require('express');
const router = express.Router();
//mysql
const db = require('../models');
const Members = db.membersModel;


//login
router.post('/login', async (req, res) => {
    console.log(req.body);
    const ret = await Members.findOne()
    console.log(ret);
    res.send('post /login')
})

//register
router.post('/register', (req, res) => {
    res.send('post /register')
})

//current member profile 
router.get('/profiles/:memberName', (req, res) => {
    res.send('get /profiles')
})

//update
router.put('/', )

module.exports = router;