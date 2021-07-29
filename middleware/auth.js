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

    //google token
    const isCustomAuth = token.length < 500;


    if(!token) {
        return res.status(401).end()
    }

    try {
        if(token && isCustomAuth) {
            console.log(0)
            const decodedToken = await jwt.verify(token, jwtSecret)
            //console.log(decodedToken.memberId);
            req.member = await Member.findOne({ where: { id: decodedToken.memberId } })
            next()
        } else {
            //google
            const decodedToken = await jwt.decode(token)
            //req.member = decodedToken?.sub;
            const findOneEmail = await Member.findOne({ where: {
                email: decodedToken.email
            }})
            if(findOneEmail === null) {
                req.member = decodedToken
                next();
            } else {
                res.status(201).json({
                    msg: "登入成功",
                    isLogin: true
                })
            }
        }

        
    } catch(err) {
        //無效的token
        return res.status(401).end()
    }
}