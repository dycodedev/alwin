var mongoose = require('mongoose');

function matchEmail(value) {
  var re = /([a-zA-Z\_\.0-9]+)@([a-zA-Z\_\.0-9]+)\.([a-zA-Z\_\.0-9]{1,4})/;
  return re.test(value);
}

var emailCustomValidator = [matchEmail, 'Email is not valid'];

var maxLengthErrorMessage = 'Path {PATH} exceeds the maximum allowed length';

var namaMaxLength = [50, maxLengthErrorMessage];
var isiMaxLength = [600, maxLengthErrorMessage];

var KomentarSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectID}
  nama: { type: String, default: 'Anonymous', maxlength: namaMaxLength },
  email: { type: String, required: true, validate: emailCustomValidator },
  isi: { type: String, required: true, maxlength: isiMaxLength },
  tanggal: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Komentar', KomentarSchema);