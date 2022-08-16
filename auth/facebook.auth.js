const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
console.log(process.env.FACEBOOK_CALL_BACK_URL);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALL_BACK_URL,
      profileFields: ['id', 'displayName', 'name', 'email', 'picture.type(large)']
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile, 'fb');
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user, 'serial');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user, 'deserial');
  done(null, user);
});
