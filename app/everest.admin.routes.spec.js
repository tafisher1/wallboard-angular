describe('everest.admin.routes', function() {
    beforeEach(module('everest.admin'));

    it('should redirect to home by default', inject(function($route) {
        expect($route.routes[null].redirectTo).toEqual('/home');
    }));

    it('Should have the template set to home.html for /home', inject(function($route) {
        expect($route.routes['/home'].templateUrl).toEqual('views/home/home.html');
    }));

    it('Should have a template, controller and controlleras for /employee',
        inject(function($route) {
            var route = $route.routes['/employee'];
            expect(route.templateUrl).toEqual('views/employee/employee.html');
            expect(route.controller).toEqual('EmployeeController');
            expect(route.controllerAs).toEqual('employee');
        }));

});
