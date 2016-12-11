'use strict';

angular.module('app.players', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {

  $stateProvider
        .state('dashboard.players', {
          url: '/players',
          views: {
            '' : {templateUrl: 'components/dashboard/dashboard.html'},
            'nav@dashboard': {templateUrl: 'components/nav/nav.html'},
            'body@dashboard': {
              templateUrl: 'components/partials/players/players.html',
              controller: 'PlayersController',
              controllerAs: 'players'
            }
          }
        })
}])

.controller('PlayersController', ['$http', '$filter', function($http, $filter) {
  var players = this;

  //Get today's date in the same format
  var todaysDate = function(){
    var today = new Date();
    today = $filter('date')(today, 'fullDate');
    return (today);
  };



  players.all = [];

  $http.get('api/players')
    .success(function(playerData){

      angular.copy(playerData, players.all);

      $http.get('api/visits')
        .success(function(visits){

          angular.forEach(visits, function(visit){
            visit = $filter('date')(visit.createdAt, 'fullDate');

            if (visit == todaysDate()){
              console.log(visit);
            }

          });
        });
    });

}]);