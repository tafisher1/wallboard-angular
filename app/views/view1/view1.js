'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'views/view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['everestService', '$scope', function(everestService, $scope) {
	
	$scope.baseUrl = 'http://localhost:8080/api';
	$scope.prevUrl = $scope.baseUrl;
	
	$scope.loadData = function(url) {
		$scope.prevUrl = $scope.currentUrl;
		$scope.currentUrl = url;
		everestService.get(url).then(function(data) {
			$scope.everestData = data;
			console.log($scope.everestData);
		})
	}
	
	$scope.prettyPrint = function(obj) {
		return JSON.stringify(obj, null, 2);
	}
	
	$scope.loadData($scope.baseUrl);
	
}]);