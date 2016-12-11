'use strict';

angular.module('app.nav', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {

  $stateProvider
        .state('nav', {
          url: '/nav',
          templateUrl: 'components/nav/nav.html',
          controller: 'NavController',
          controllerAs: 'nc'
        })

}])

.controller('NavController', ['$http', function($http) {
  var nc = this;
    nc.toggleMenu = function(){
        nc.openedMenu = !nc.openedMenu;
    }
  
}]);