var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config();

// const { createProxyMiddleware } = require('http-proxy-middleware');

var indexRouter = require('./routes/index');
var postRouter = require('./routes/post');

var app = express();

// Set up mongoose connection
mongoose.set('strictQuery', false); 
const mongoDBURL = process.env.db_url;
const mongoDBOptions = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
} 
const connection = mongoose.createConnection(mongoDBURL, mongoDBOptions); 

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDBURL);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Prevent CORS Errors 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://blog-api-prod.up.railway.app'); // Change to http://localhost:3000 in development
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*'); 
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * ----------------- PASSPORT AUTHENTICATION -----------------
 */
const passport = require('passport'); 
require('./config/passport');

app.use(passport.initialize());
/**
 * -----------------------------------------------------------
 */

app.use('/', indexRouter);
app.use('/posts', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
