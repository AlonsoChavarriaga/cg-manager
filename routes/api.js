var express = require('express');
var router = express.Router();

var Player = require('../models/player');
var Game = require('../models/game');
var Visit = require('../models/visit');

// Routes
Player.methods(['get','put','post','delete']);
Player.register(router, '/players');

Game.methods(['get','put','post','delete']);
Game.register(router, '/games');

Visit.methods(['get','put','post','delete']);
Visit.register(router, '/visits');

// Return router
module.exports = router;