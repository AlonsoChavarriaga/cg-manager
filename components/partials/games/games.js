'use strict';

angular.module('app.games', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {

  $stateProvider
        .state('dashboard.games', {
          url: '/games',
          views: {
            '' : {templateUrl: 'components/dashboard/dashboard.html'},
            'nav@dashboard': {templateUrl: 'components/nav/nav.html'},
            'body@dashboard': {
              templateUrl: 'components/partials/games/games.html',
              controller: 'GamesController',
              controllerAs: 'games'
            }
          }
        })

}])

.controller('GamesController', ['$http', '$scope', function($http, $scope) {
  var games = this;

  games.all = [];

  $http.get('api/games')
    .success(function(data){
      angular.copy(data, games.all);
    });

  games.addGame = function(game){
    if(game){
      $http.post('api/games', game)
          .success(function(data){
            games.all.push(data)
            $scope.game = {};
          })
    }
  };

  games.deleteGame = function(game){
    $http.delete('api/games/' + game._id)
        .success(function(data){
          var i = games.all.indexOf(game);
          if (i > -1){
            games.all.splice(i, 1);
          }
        })
  };


}]);