var exoplanetsControllers = angular.module('exoplanetsControllers', []);

exoplanetsControllers.controller('SystemsCtrl', ['$scope', 'System', function($scope, System) {
  $scope.systems = System.query();
  $scope.orderProp = 'distance';
}]);

exoplanetsControllers.controller('SystemCtrl', ['$scope', 'System', '$routeParams', function($scope, System, $routeParams) {
  $scope.system = System.get({id: $routeParams.id}, function(system) {
  });
}]);

exoplanetsControllers.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.$on('$routeChangeSuccess', function() {
    $scope.menuActive = $location.path().split("/")[1];
  });
}]);
