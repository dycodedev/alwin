var mongoose = require('mongoose');
var Komentar = require('./komentar');
var Label = require('./label');

var PostSchema = new mongoose.Schema({
  judul: { type: String, required: true, maxlength: 100 },
  konten: { type: String, required: true },
  tanggal: { type: Date, required: true, default: Date.now },
  komentar: [Komentar],
  label: [Label],
  dibaca: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', PostSchema);