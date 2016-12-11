var restful = require('node-restful');
var mongoose = restful.mongoose;

var VisitSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Players'
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Games'
  }]
}, {timestamps: true});

module.exports = restful.model('Visits', VisitSchema);