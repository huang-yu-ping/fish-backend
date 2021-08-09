//util jwt
const jwt = require('../utils/jwt');
//jwt secret key
const config = require('../config/jwt-secret');
const jwtSecret = config.jwtSecret;
//user mysql
const db = require('../models');
const Member = db.membersModel;



module.exports = async (req, res, next) => {
    //get token from header authorization (own)
    let token = req.headers['authorization']
    token = token ? token.split('Bearer ')[1] : null;

    if(!token) {
        return res.status(401).end()
    }

    try {        
        const decodedToken = await jwt.verify(token, jwtSecret)
        req.member = await Member.findOne({ where: { id: decodedToken.memberId } })
        next()
         
    } catch(err) {
        //無效的token
        return res.status(401).end()
    }
}