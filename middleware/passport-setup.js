const passport = require("passport");
const GoogleStratery = require("passport-google-token").Strategy;
const key = require("../config/key");

passport.use(
  new GoogleStratery(
    {
      clientID: key.google.clientID,
      clientSecret: key.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const defaultMember = {
        name: `${profile.name.givenName}${profile.name.familyName}`,
        email: profile.emails[0].value,
        image: profile._json.picture,
      };
      cb(null, defaultMember);
    }
  )
);
