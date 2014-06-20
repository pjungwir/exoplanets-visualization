var exoplanetsControllers = angular.module('exoplanetsControllers', []);

exoplanetsControllers.controller('SystemsCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('/systems.json').success(function(data) {
    $scope.systems = data;
  });

  $scope.orderProp = 'distance';
}]);

exoplanetsControllers.controller('SystemCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
  $scope.id = $routeParams.id;
  $http.get('/systems.json').success(function(data) {
    $scope.system = _.find(data, function(sys) { return '' + sys.id === $scope.id });
  });
}]);

exoplanetsControllers.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.$on('$routeChangeSuccess', function() {
    $scope.menuActive = $location.path().split("/")[1];
  });
}]);
