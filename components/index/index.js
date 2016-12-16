'use strict';

angular.module('app.index', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider) {

  $stateProvider
        .state('index', {
          url: '/',
          templateUrl: 'components/index/index.html',
          controller: 'LandingPage',
          controllerAs: 'lp'
        })

}])

.controller('LandingPage', ['$scope', function($scope) {

  $scope.tabActive = 'signup';

  //Toggle between Sign Up and Login tabs
  $scope.tabSwitch = function (tab) {
    $scope.tabActive = tab == 'signup' ? 'signup' : 'login';
    // $scope.tabActive = !$scope.tabActive;
  };

}]);