(function() {
	'use strict';
	
	angular
		.module('wallboard').config(routeConfig);
	
	routeConfig.$inject = ['$routeProvider'];
	
	function routeConfig($routeProvider) {
		
		$routeProvider.when('/' , {
			templateUrl		: 'views/home/home.html',
			controller		: 'HomeController',
			controllerAs	: 'vm'
		});
	    
	    $routeProvider.when('/wall/:localeName/home', {
	    	templateUrl		: 'views/wall/wall.html',
	    	controller		: 'WallController',
	    	controllerAs	: 'vm'
	    });
	    
	    $routeProvider.otherwise({redirectTo: '/'});
	}

})();
