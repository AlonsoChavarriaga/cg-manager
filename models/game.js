var restful = require('node-restful');
var mongoose = restful.mongoose;

var GameSchema = new mongoose.Schema({
  title: String
});

module.exports = restful.model('Games', GameSchema);