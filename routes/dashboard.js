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
  if (req.session.username) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/logout', function(req, res){

  req.session.destroy(afterDestroy);
 
  function afterDestroy(error) {
    if (error){
      console.error(error);
    }

    res.redirect('/dashboard/login');
  }

});

router.post('/login', function(req, res){
  var dataAkun = {
    username: req.body.username,
    password: req.body.password
  };

  akunModel.findOne(dataAkun, findAkun);

  function findAkun(err, result) {
    if (err || result === null) {
      res.render('login', {
        error: new Error('Username atau password salah')
      });

      return;
    }

    var isPasswordMatch = bcrypt.compareSync(dataAkun.password, result.password);

    if (!isPasswordMatch) {
      res.render('login', { error: new Error('Username atau password salah') });

      return;
    }

    req.session.username = result.username;
    res.redirect('/');
  }
});

module.exports = router;