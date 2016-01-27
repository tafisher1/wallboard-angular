(function() {
	'use strict';
	
	angular
		.module('everest.admin').config(routeConfig);
	
	routeConfig.$inject = ['$routeProvider'];
	
	function routeConfig($routeProvider) {
		
		$routeProvider.when('/' , {
			templateUrl: 'views/home/home.html'
		});
		
		$routeProvider.when('/home' , {
			templateUrl: 'views/home/home.html'
		});
		
		$routeProvider.when('/employee', {
			templateUrl: 'views/employee/employee.html',
	        controller:'EmployeeController', 
	        controllerAs:'employee'});
	    
	    $routeProvider.otherwise({redirectTo: '/'});
	}

})();
