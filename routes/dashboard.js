var express = require('express');
var router  = express.Router();
var async = require('async');

router.get('/', function(req, res){
  res.redirect('/dashboard/login');
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res){
  
});

module.exports = router;