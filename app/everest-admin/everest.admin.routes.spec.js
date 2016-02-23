describe('everest.admin.routes', function() {
    beforeEach(module('everest.admin'));

    it('should redirect to home by default', inject(function($route) {
        expect($route.routes[null].redirectTo).toEqual('/home');
    }));

    it('should have the template set to home.html for /home', inject(function($route) {
        expect($route.routes['/home'].templateUrl).toEqual('views/home/home.html');
    }));

    it('should have the template set to home.html for /admin/employee', inject(function($route) {
        var route = $route.routes['/employee'];
        expect(route.templateUrl).toEqual('views/employee/employee.html');
        expect(route.controller).toEqual('EmployeeController');
        expect(route.controllerAs).toEqual('employee');
    }));

    it('should have the template set to home.html for /admin/employee/:id',
        inject(function($route) {
            var route = $route.routes['/employee/:id'];
            expect(route.templateUrl).toEqual('views/employee/view_employee.html');
            expect(route.controller).toEqual('ViewEmployeeController');
            expect(route.controllerAs).toEqual('employee');
        }));

});
