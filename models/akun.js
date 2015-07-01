var mongoose = require('mongoose');

var AkunSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('Akun', AkunSchema);