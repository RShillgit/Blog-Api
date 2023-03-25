var express = require('express');
const passport = require('passport');
const admin = require('../models/admin');
const posts = require('../models/posts');
var router = express.Router();
const jwt = require('jsonwebtoken');
const passwordUtils = require('../utils/passwordUtils');
const jwtUtils = require('../utils/jwtUtils');

/* GET home page. */
router.get('/', function(req, res, next) {

  posts.find({})
  .then(blogs => {
    res.json(blogs)
  })
  .catch(err => console.log(err))

});

/* POST home page. */
router.post('/', function(req, res, next) {
  res.send("Received a POST HTTP method");
});

/* PUT home page. */
router.put('/', function(req, res, next) {
  res.send("Received a PUT HTTP method");
});

/* DELETE home page. */
router.delete('/', function(req, res, next) {
  res.send("Received a DELETE HTTP method");
});

/* GET Register */ 
router.get('/register', (req, res, next) => {
  res.render('register');
})
/* POST Register */ 
router.post('/register', (req, res, next) => {
  const saltHash = passwordUtils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newAdmin = new admin({
    username: req.body.username,
    hash: hash,
    salt: salt
  })
  newAdmin.save()
    .then((user) => {

      const jwt = jwtUtils.issueJWT(user);

      res.json({success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
    })
    .catch(err => next(err));
})

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login');
})

/* POST login page */
router.post('/login', function (req, res, next) {

  // Look for user in DB
  admin.findOne({ username: req.body.username })
    .then((user) => {

      // If no user send error
      if (!user) {
        return res.status(401).json({success: false, error_message: "Could not find user"});
      }

      // Check if password is valid
      const isValid = passwordUtils.validatePassword(req.body.password, user.hash, user.salt);

      // If password is valid send success
      if (isValid) {
        const tokenObject = jwtUtils.issueJWT(user);

        res.cookie('token', tokenObject.token); // Send token as cookie for the front end to use
        return res.status(200).json({success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires});
      } 
      // If password is invalid send error message
      else {
        return res.status(401).json({success: false, error_message: "Invalid Username/Password Combination"})
      }
    })
});

module.exports = router;
