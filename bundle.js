(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 'use strict';
// var angular = require('angular');
// require('angular-multiple-select');
// require('angucomplete-alt');
// require('angular-ui-router');

angular.module('app', [
  'ui.router',
  'multipleSelect',
  'angucomplete-alt',
  'app.index',
  'app.dashboard',
  'app.nav',
  'app.home',
  'app.games',
  'app.stats',
  'app.players'
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

},{}]},{},[1]);
