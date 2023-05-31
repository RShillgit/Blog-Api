const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validatePassword = require('../utils/passwordUtils').validatePassword;
const Admin = require('../models/admin'); 
require('dotenv').config();

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const verifyCallback = (username, password, done) => {

    Admin.findOne({ username: username })
        .exec((err, user) => {
        
            if (err) { 
                return done(err);
            }
            if (user === null) {
                return done(null, false, {message: 'Username Does Not Exist'});
            }

            const isValid = validatePassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect Username/Password Combination'});
            }
        });
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

/**
* JWT Strategy
*/
const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret_string, 
};
const jwtStrategy = new JWTStrategy(jwtOptions, (payload, done) => {
    Admin.findOne({_id: payload.sub})
        .then((user) => {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, null));
});
passport.use(jwtStrategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser((userId, done) => {
    Admin.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
