var mongoose = require('mongoose');

var namaMaxLength = [20, 'Path {PATH} exceeds the maximum allowed length'];

function validateNamaLabel(value) {
  return /([a-zA-Z]+)/.test(value);
}

var namaLabelCustomValidator = [validateNamaLabel, 'Label name is not valid'];

var LabelSchema = new mongoose.Schema({
  nama: { type: String, maxlength: namaMaxLength, validate: namaLabelCustomValidator }
});

exports.LabelModel = mongoose.model('Label', LabelSchema);
exports.LabelSchema = LabelSchema;