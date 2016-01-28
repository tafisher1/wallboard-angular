(function() {
'use strict';

angular
	.module('everest.admin').config(adminRouteProvider);

adminRouteProvider.$inject = ['$routeProvider'];

function adminRouteProvider($routeProvider) {
    $routeProvider.when('/home' , {templateUrl: 'views/home/home.html'});
    $routeProvider.when('/employee', {templateUrl: 'views/employee/employee.html',
        controller:'EmployeeController', controllerAs:'employee'});
    $routeProvider.when('/employee/:id', {templateUrl: 'views/employee/view_employee.html',
        controller:'ViewEmployeeController', controllerAs:'employee'});
    $routeProvider.otherwise({redirectTo: '/home'});
}

})();
