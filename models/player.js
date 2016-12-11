var restful = require('node-restful');
var mongoose = restful.mongoose;

var PlayerSchema = new mongoose.Schema({
  name: String,
  tag: String,
  visits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visits'
  }]
}, {timestamps: true});

module.exports = restful.model('Players', PlayerSchema);