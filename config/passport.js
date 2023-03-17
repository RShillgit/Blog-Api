const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const validatePassword = require('../utils/passwordUtils').validatePassword;
const Admin = require('../models/admin'); 

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
                // return done(null);
                return done(null, false, {message: 'Username Does Not Exist'});
            }

            const isValid = validatePassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                //return done(null, false);
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
    secretOrKey: 'secret',
};
const jwtStrategy = new JWTStrategy(jwtOptions, (payload, done) => {
    console.log(payload)
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

/* 
module.exports = (passport) => {
    passport.use(jwtStrategy)
}
*/

/*
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('JWT'),
        secretOrKey : 'secret' // TODO: Change to .env file secret
    },
    function (jwt_payload, done) {
        console.log(`JWT PAYLOAD: ${jwt_payload}`)

        // TODO: find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return Admin.findOneById(jwt_payload._id)
            .exec((err, user) => {
                console.log(user);
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
    }
));
*/

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
