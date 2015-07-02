var mongoose = require('mongoose');

var namaMaxLength = [20, 'Path {PATH} exceeds the maximum allowed length'];

function validateNamaLabel(value) {
  return /[a-zA-Z]{1, 20}/.test(value);
}

var LabelSchema = new mongoose.Schema({
  nama: { type: String, maxlength: namaMaxLength, validate: validateNamaLabel }
});

module.exports = mongoose.model('Label', LabelSchema);