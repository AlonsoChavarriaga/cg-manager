var restful = require('node-restful');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({

 local: {
   email: String,
   password: String
 },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }

});

//Generates hash
UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = restful.model('User', UserSchema);