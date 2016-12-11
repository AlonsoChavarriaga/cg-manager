'use strict';

angular.module('app.profile', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider){
  $stateProvider
    .state('dashboard.players.profile', {
      url: '/profile/:id',
      params: {
        player: null
      },
      views: {
        '' : {templateUrl: 'components/dashboard/dashboard.html'},
        'nav@dashboard': {templateUrl: 'components/nav/nav.html'},
        'body@dashboard': {
          templateUrl: 'components/partials/players/profile.html',
          controller: 'ProfileController',
          controllerAs: 'profile'
        }
      }
    })
}])

.controller('ProfileController', ['$http','$stateParams', function($http, $stateParams){
  var profile = this;

  profile.visits = [];
  profile.player = $stateParams.player;

  $http.get('api/visits?player=' + profile.player._id + '&populate=games')
      .success(function(data){
        angular.copy(data, profile.visits);
      });



  //Sample URL to get all visits for one player, with games populated
  // /api/visits?player._id=582f69617a544f028c8dee63?&populate=games
}]);