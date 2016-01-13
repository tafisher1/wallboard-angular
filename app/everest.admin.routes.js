(function() {
'use strict';

angular
	.module('everest.admin').config(adminRouteProvider);

adminRouteProvider.$inject = ['$routeProvider'];

function adminRouteProvider($routeProvider) {
    $routeProvider.when('/home' , {templateUrl: 'views/home/home.html'});
    $routeProvider.otherwise({redirectTo: '/home'});
}

})();
