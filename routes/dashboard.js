var express = require('express');
var router  = express.Router();
var async = require('async');
var akunModel = require('../models/akun');
var bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  if (!req.session.username) {
    res.redirect('/dashboard/login');
    return;
  }
});

router.get('/login', function(req, res) {
  var error = req.flash('loginError');

  if (req.session.username) {
    res.redirect('/');
    return;
  }

  console.log(error);

  res.render('login', { error: error[0] });
});

router.get('/logout', function(req, res) {

  req.session.destroy(afterDestroy);
 
  function afterDestroy(error) {
    if (error){
      console.error(error);
    }

    res.redirect('/dashboard/login');
  }

});

router.post('/login', function(req, res) {
  var dataAkun = {
    username: req.body.username,
    password: req.body.password
  };

  akunModel.findOne({ username: dataAkun.username }, findAkun);

  function findAkun(err, result) {
    if (err || result === null) {
      req.flash('loginError', {
        name: 'AuthError',
        message: 'Username atau password salah!'
      });
      res.redirect('/dashboard/login');
      return;
    }

    var isPasswordMatch = bcrypt.compareSync(dataAkun.password, result.password);

    if (!isPasswordMatch) {
      req.flash('loginError', {
        name: 'AuthError',
        message: 'Username atau password salah!'
      });
      res.redirect('/dashboard/login');
      return;
    }

    req.session.username = result.username;
    res.redirect('/');
  }
});

module.exports = router;