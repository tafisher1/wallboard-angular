'use strict';

// Declare app level module which depends on views, and components
angular
	.module('myApp', [
		'ngRoute',
		'hateoas',
		'myApp.view1',
		'myApp.view2',
		'myApp.version',
		'myApp.everestService'
	])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);
