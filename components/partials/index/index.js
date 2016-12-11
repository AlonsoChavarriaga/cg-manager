'use strict';

angular.module('app.home', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {

  $stateProvider
        .state('dashboard.home', {
          url: '/',
          views: {
            '' : {templateUrl: 'components/dashboard/dashboard.html'},
            'nav@dashboard': {templateUrl: 'components/nav/nav.html'},
            'body@dashboard': {
              templateUrl: 'components/partials/index/index.html',
              controller: 'HomeController',
              controllerAs: 'home'
            }
          }
        })

}])

.controller('HomeController', ['$http', '$location','$scope', '$state', function($http, $location, $scope, $state) {
  var home = this;

  //Initialize arrays for players, games and selected games
  home.games = [];
  home.players = [];
  home.selectedGames = [];

  //Store individual player info, whether pre-existing or new
  home.player = {};
  $scope.newPlayerInfo = {};


  //Get all games for autocomplete
  $http.get('api/games')
      .success(function(data){
        angular.copy(data, home.games);
      });

  //Get all players for autocomplete
  $http.get('api/players')
      .success(function(data){
        angular.copy(data, home.players);
      });


  home.selectGame = function($item){
    home.selectedGames.push($item.originalObject);
  };

  $scope.newPlayer = function(str) {
    $scope.newPlayerInfo.name = str;
  }

  home.addPlayerVisit = function(player, games){
    if(player.originalObject.name){
      var newVisit = {
        player: player.originalObject,
        games: games
      };

      $http.post('api/visits', newVisit)
        .success(function (){
          var addedPlayer = player.originalObject.name
          $state.go($state.current, {}, {reload : true})
              .then(function(){
                setTimeout(function () {
                  $scope.success = true;
                  $scope.successMsg = addedPlayer + " has been logged.";
                  console.log($scope.successMsg);
                }, 5000);
              });
        })
    } else {
      var newPlayerData = {
        name: $scope.newPlayerInfo.name,
        tag: player.originalObject.tag
      };

      $http.post('api/players', newPlayerData)
          .success(function(data){
            newVisit = {
              player: data,
              games: games
            };
            $http.post('api/visits', newVisit)
                .success(function (){
                  $scope.success = true;
                  $scope.successMsg = $scope.newPlayerInfo.name + " has been logged.";
                  $location.path('/dashboard');
                })
          });


    }
  };

  home.deselectGame = function(game){
    var i = home.selectedGames.indexOf(game);
    if (i > -1){
      home.selectedGames.splice(i, 1);
    }
  };


}]);