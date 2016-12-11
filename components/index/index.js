'use strict';

angular.module('app.index', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider) {

  $stateProvider
        .state('index', {
          url: '/',
          templateUrl: 'components/index/index.html',
          controller: 'IndexController',
          controllerAs: 'ic'
        })

}])

.controller('IndexController', [function() {

}]);