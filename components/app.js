// 'use strict';
// var angular = require('angular');
// require('angular-multiple-select');
// require('angucomplete-alt');
// require('angular-ui-router');

angular.module('app', [
  'ui.router',
  'angucomplete-alt',
  'app.index',
  'app.dashboard',
  'app.nav',
  'app.home',
  'app.games',
  'app.stats',
  'app.players',
  'app.profile'
])
.run(function($rootScope, $state) {
   $rootScope.$state = $state;
})

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true).hashPrefix('!');
    
}]);

// require('./dashboard/dashboard.js');
// require('./index/index.js');
// require('./nav/nav.js');
// require('./partials/index/index.js');
// require('./partials/games/games.js');
// require('./partials/stats/stats.js');
// require('./partials/players/players.js');
