var exoplanetsControllers = angular.module('exoplanetsControllers', []);

exoplanetsControllers.controller('SystemsCtrl', ['$scope', 'System', function($scope, System) {
  $scope.systems = System.query();
  $scope.orderProp = 'distance';
}]);

exoplanetsControllers.controller('SystemCtrl', ['$scope', 'System', '$routeParams', function($scope, System, $routeParams) {
  console.log($routeParams.id);
  $scope.system = System.get({id: $routeParams.id}, function(system) {
    initializeD3Orbits(system);
  });

  var initializeD3Orbits = function(system) {
    var w = 800;
    var h = 600;
    var t0 = Date.now();
    var planets = system.planets;
    var pixelsPerAu = 200;
    console.log(system);
    console.log(planets);
    // planets = [{R: 100, r:5, phi0: 326, speed: 10, color: 'green'}];

    planets = _.map(planets, function(p) {
      return {
        r: (p.radius || 0.5) * 10,
        R: pixelsPerAu * p.orbit,
        phi0: 0,
        speed: p.period ? 1/(0+p.period) : 10,
        color: 'green'
      };
    });
    console.log(planets);

    var svg = d3.select("#orbits-visualization").insert("svg")
                .attr("width", w).attr("height", h);

    svg.append("circle").attr("r", (system.radius || 2) * 10).attr("style", "fill: yellow")
      .attr("cx", w / 2).attr("cy", h / 2)
      .attr("class", "sun");

    svg.append("circle").attr("r", pixelsPerAu).attr("style", "stroke:#333333; stroke-dasharray: 10,20; fill:transparent").
      attr("class", "orbit").attr("cx", w / 2).attr("cy", h / 2);

    var container = svg.append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    container.selectAll("g.planet").data(planets).enter().
      append("g").attr("class", "planet").each(function(d, i) {

      d3.select(this).append("circle").attr("style", "stroke:gray; fill:transparent")
        .attr("class", "orbit").attr("r", d.R);

      d3.select(this).append("circle").attr("style", "fill: " + d.color)
        .attr("class", "planet").attr("r", d.r)
        .attr("cx", d.R).attr("cy", 0);
    });

    d3.timer(function() {
      var dt = (Date.now() - t0);
      svg.selectAll(".planet").attr("transform", function(d) {
        return "rotate(" + d.phi0 + dt * d.speed / 2 + ")";
      });
    });
  };
}]);

exoplanetsControllers.controller('MenuCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.$on('$routeChangeSuccess', function() {
    $scope.menuActive = $location.path().split("/")[1];
  });
}]);
