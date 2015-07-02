var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var swig = require('swig');
var mongoose = require('mongoose');
var config= require('./config/dev.local.js');

var indexRoutes = require('./routes/index');
var dashboardRoutes = require('./routes/dashboard');
var postRoutes = require('./routes/post');

var app = express();
var MongoStore = require('connect-mongo')(session);

var db = mongoose.connection;

db.on('error', function handleError(err) {
  console.error(err);
});

db.on('open', function handleOpen() {
  console.log('Connected to mongodb');
});

mongoose.connect(config.mongodb.connectionUri);

// view engine setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);

// no caching in development phase
swig.setDefaults({ cache: false });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(session({
  name: 'winterblog.sess',
  resave: false,
  saveUninitialized: false,
  secret: '6db019627cddc1c13456bbacc6b7f247',
  store: new MongoStore({
    host: config.mongodb.host,
    port: config.mongodb.port,
    db: config.mongodb.dbname,
    username: config.mongodb.username,
    password: config.mongodb.password
  })
}));
app.use(flash());

app.get('/', function(req, res) {
  res.redirect('/index/');
});
app.use('/index/', indexRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/post', postRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;