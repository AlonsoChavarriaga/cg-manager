'use strict';

angular.module('app.stats', ['ui.router'])

.config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider,$stateProvider) {

  $stateProvider
        .state('dashboard.stats', {
          url: '/stats',
          views: {
            '' : {templateUrl: 'components/dashboard/dashboard.html'},
            'nav@dashboard': {templateUrl: 'components/nav/nav.html'},
            'body@dashboard': {
              templateUrl: 'components/partials/stats/stats.html',
              controller: 'StatsController',
              controllerAs: 'stats'
            }
          }
        })

}])

.controller('StatsController', ['$http', function($http) {
  var stats = this;

}]);