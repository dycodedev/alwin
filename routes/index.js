var express = require('express');
var router = express.Router();
var PesanModel = require('../models/pesan');
var mongooseHelper = require('../helpers/mongoose-helper');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Winter Blog' });
});

router.get('/kontak', function(req, res) {
  var error = req.flash('kontakError')[0];

  res.render('kontak', {
    title: 'Kontak | Winter Blog',
    error: error
  });
});

router.get('/arsip', function(req, res) {
  res.render('arsip', { title: 'Arsip | Winter Blog' });
});

router.get('/tentang', function(req, res) {
  res.render('tentang', { title: 'Tentang | Winter Blog' });
});

router.post('/kontak', function(req, res) {
  var formData = {
    nama: req.body.nama,
    email: req.body.email,
    isi: req.body.pesan,
  };

  var pesan = new PesanModel(formData);
  pesan.save(function(error){

    if (error) {
      console.log(error);
      req.flash('kontakError', mongooseHelper.enumerateModelErorr(error));
    }

    res.redirect('/index/kontak');
  });
});

module.exports = router;