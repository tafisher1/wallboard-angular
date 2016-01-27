describe('everest.admin.routes', function() {
    beforeEach(module('everest.admin'));

    it('should redirect to home by default', inject(function($route) {
        expect($route.routes[null].redirectTo).toEqual('/');
    }));
    
    it('should have the template set to home.html for /home', inject(function($route) {
        expect($route.routes['/'].templateUrl).toEqual('views/home/home.html');
    }));
    
    it('should have the template set to home.html for /admin/employee', inject(function($route) {
        var route = $route.routes['/employee'];
    	expect(route.templateUrl).toEqual('views/employee/employee.html');
        expect(route.controller).toEqual('EmployeeController');
    	expect(route.controllerAs).toEqual('employee');
    }));

});
