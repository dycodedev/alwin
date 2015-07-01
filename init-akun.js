var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var AkunModel = require('./models/akun');
var config = require('./config/dev.local.js');


mongoose.connect(config.mongodb.connectionUri);
mongoose.connection.on('open', function initializeAkun(){
  var password = bcrypt.hashSync('winter', 8);
  var akun = new AkunModel({
    username: 'winter',
    password: password
  });

  akun.save();
});
