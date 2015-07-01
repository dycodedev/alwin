var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Winter Blog' });
});

router.get('/kontak', function(req, res){
  res.render('kontak', { title: 'Kontak | Winter Blog' });
});

router.get('/arsip', function(req, res){
  res.render('arsip', { title: 'Arsip | Winter Blog' });
});

router.get('/tentang', function(req, res){
  res.render('tentang', { title: 'Tentang | Winter Blog' });
});

router.post('/kontak', function(req, res){

});

module.exports = router;
