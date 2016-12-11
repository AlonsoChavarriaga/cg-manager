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

.controller('PlayersController', ['$http', '$filter', '$scope', function($http, $filter, $scope) {
  var players = this;

  $scope.playerFilter = false;

  players.all = [];
  players.today = [];

  //Get today's date in the same format
  var todaysDate = function(){
    var today = new Date();
    today = $filter('date')(today, 'fullDate');
    return (today);
  };

  //Toggle player filter between 'all' and 'today'
  $scope.playerToggle = function () {
    $scope.playerFilter = !$scope.playerFilter;
  };

  $http.get('api/players')
    .success(function(playerData){

      angular.copy(playerData, players.all);

      $http.get('api/visits?populate=player')
        .success(function(visits){

          angular.forEach(visits, function(visitData){
            var visit = $filter('date')(visitData.createdAt, 'fullDate');
            if (visit == todaysDate()){
              players.today.push(visitData.player);
              console.log(players.today);
            }

          });
        });
    });

}]);