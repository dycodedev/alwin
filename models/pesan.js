var mongoose = require('mongoose');

function match(value) {
  return /([a-zA-Z\_\.0-9]+)@([a-zA-Z\_\.0-9]+)\.([a-zA-Z\_\.0-9]{1,4})/.test(value);
}

var emailCustomValidator = [match, 'Email is not valid'];

var PesanSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, validate: emailCustomValidator },
  isi: { type: String, required: true },
  tanggal: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Pesan', PesanSchema);