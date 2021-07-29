const passport = require("passport");
const GoogleStratery = require("passport-google-token").Strategy;
const key = require("../config/key");
// members mysql
const db = require("../models");
const Members = db.membersModel;
const Promise = require("bluebird");
//password
const bcrypt = Promise.promisifyAll(require("bcrypt"));

passport.use(
  new GoogleStratery(
    {
      clientID:
        "1090154977683-uuphfjn83kjaijk2avt976jtglm5k3c0.apps.googleusercontent.com",
      clientSecret: "JhKCk-2Oa4Q-MEPH8iyc6DbR",
      //callbackURL: "http://localhost:3000/api/member/google/callback",
      //passReqToCallback: true
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      return done(null, _);
      // let password = '123456';
      // const clientPassword = await bcrypt.hashAsync(password, 10);
      // const defaultMember = {
      //   name: `${profile.name}`,
      //   email: profile.emails[0].value,
      //   image: profile.photos[0].value,
      //   password: clientPassword
      // }

      // const newMember = await Members.findOrCreate({ where: {
      //   email: profile.emails[0].value
      // }, default: defaultMember }).catch((err) => {
      //   console.log('error create', err);
      //   cb(err, null);
      // })

      // if(newMember && newMember[0]) {
      //   return cb(null, newMember && newMember[0])
      // }
    }
  )
);
