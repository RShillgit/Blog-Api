var express = require('express');
const passport = require('passport');
const admin = require('../models/admin');
var router = express.Router();
const jwt = require('jsonwebtoken');
const genPassword = require('../utils/passwordUtils').genPassword;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login');
})

/* POST login page */
router.post('/login', function (req, res, next) {

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user : user
        });
    }
  
    req.login(user, {session: false}, (err) => {
      if (err) {
          res.send(err);
      }
    // generate a signed son web token with the contents of user object and return it in the response
    const token = jwt.sign({data: user}, 'your_jwt_secret'); // TODO: Change this secret to .env file secret
    return res.json({user, token}); // TODO: SAVE TOKEN??? WHERE IS THE JWT TOKEN STORED???
    });

  })(req, res);

});

/* GET test page */
router.get('/test', (req, res) => {
  console.log(req.user) // TODO: GIVES YOU UNDEFINED, CHECK TO SEE IF THE JWT TOKEN PERSISTS ACROSS PAGES IT SEEMS LIKE IT DOESNT
  if (req.isAuthenticated()) {
    console.log('?')
    res.send(req.user.profile);
  }
  else {
    res.send('Shit aint working...')
  }
})

module.exports = router;
