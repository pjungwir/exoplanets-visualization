var exoplanetsApp = angular.module('exoplanetsApp', [
    'ngRoute',
    'exoplanetsControllers'
]);

exoplanetsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/systems', {
    templateUrl: 'partials/systems.html',
    controller: 'SystemsCtrl'
  }).
  when('/systems/:id', {
    templateUrl: 'partials/system.html',
    controller: 'SystemCtrl'
  }).
  otherwise({
    redirectTo: '/systems'
  });
}]);
