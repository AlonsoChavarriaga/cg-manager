'use strict';

angular.module('app.dashboard', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {

  $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          views: {
            '' : {templateUrl: 'components/dashboard/dashboard.html'},
            'nav@dashboard': {templateUrl: 'components/nav/nav.html'},
            'body@dashboard': {
              templateUrl: 'components/partials/index/index.html',
              controller: 'HomeController',
              controllerAs: 'ic'
            },
            // 'footer@dashboard': {templateUrl: 'components/dashboard/dashboard.html'},
          },
          controller: 'DashboardController',
          controllerAs: 'vc'
        })

}])

.controller('DashboardController', ['$http', function($http) {
  var v2 = this;
  
}]);