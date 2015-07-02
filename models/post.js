var mongoose = require('mongoose');
var mongooseHelper = require('../helpers/mongoose-helper');
var LabelSchema = require('./label').LabelSchema;

var PostSchema = new mongoose.Schema({
  judul: { type: String, required: true, maxlength: 100 },
  konten: { type: String, required: true },
  tanggal: { type: Date, required: true, default: Date.now },
  label: [LabelSchema],
  dibaca: { type: Number, default: 0 },
  slug: { type: String }
});

PostSchema.pre('save', function(next) {
  var judul = this.judul.toLowerCase().slice(0, 20);
  judul = mongooseHelper.replacePunctuation(judul, '-');
  this.slug = judul + '-' +
    this.tanggal.toJSON().slice(0, 19);

    next();
});

module.exports = mongoose.model('Post', PostSchema);