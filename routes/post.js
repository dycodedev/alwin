var express = require('express');
var router = express.Router();
var PostModel = require('../models/post');
var mongooseHelper = require('../helpers/mongoose-helper');

router.get('/', function(req, res) {
  var error = req.flash('postError')[0];

  PostModel.find(function(err, result) {

    res.render('list-post', {
      posts: result,
      title: 'Daftar Post | WinterBlog',
      error: error
    });
  });
});

router.get('/tambah', function(req, res) {
  var error = req.flash('postError')[0];

  res.render('add-post', {
    title: 'Tambah Post | WinterBlog',
    error: error
  })
});

router.post('/tambah', function(req, res) {
  var postData = {
    judul: req.body.judul,
    konten: req.body.konten
  };

  var label = req.body.label;

  // remove the trailing whitespace
  label = label.trim();

  // replace all punctuation except comma with empty string
  var regex = /['!"#$%&\\'()\*+\-\.\/:;<=>?@\[\\\]\^_`{|}~'\ ]/g;
  label = label.replace(regex, "");

  // split the labels into array
  var tempLabel = label.split(',');
  var currentItem;
  var newLabel = [];

  for (index in tempLabel) {
    currentItem = tempLabel[index].trim();

    if (currentItem !== '') {
      newLabel.push({ nama: currentItem });
    }
  }

  postData.label = newLabel;

  console.log(postData);

  var post = new PostModel(postData);

  post.save(function(error, result){
    if (error) {
      var errorArray = mongooseHelper.enumerateModelError(error);

      req.flash('postError', errorArray);
      res.redirect('/post/tambah/');
      return;
    }

    res.redirect('/post/tambah/');
  });
});

module.exports = router;