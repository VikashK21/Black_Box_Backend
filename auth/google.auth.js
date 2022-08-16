const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // console.log(profile, ">>>", done);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log(user);
  done(null, user);
});
