describe('everest.admin.routes', function () {
    beforeEach(module('everest.admin'));

    it('should redirect to home by default', inject(function ($route) {
        expect($route.routes[null].redirectTo).toEqual('/home');
    }));

    it('should have the template set to home.html for /home', inject(function ($route) {
        expect($route.routes['/home'].templateUrl).toEqual('views/home/home.html');
    }));

    it('should have the template set to employee.html for /employee',
     inject(function ($route) {
        var route = $route.routes['/employee'];
        expect(route.templateUrl).toEqual('views/employee/employee.html');
        expect(route.controller).toEqual('EmployeeController');
        expect(route.controllerAs).toEqual('employee');
    }));

    it('should have the template set to view_employee.html for /employee/:id',
        inject(function ($route) {
            var route = $route.routes['/employee/:id'];
            expect(route.templateUrl).toEqual('views/employee/view_employee.html');
            expect(route.controller).toEqual('ViewEmployeeController');
            expect(route.controllerAs).toEqual('employee');
        }));

    it('should have the template set to add-edit_employee.html for /employee/:id/edit',
            inject(function ($route) {
                var route = $route.routes['/employee/:id/edit'];
                expect(route.templateUrl).toEqual('views/employee/add-edit_employee.html');
                expect(route.controller).toEqual('EditEmployeeController');
                expect(route.controllerAs).toEqual('employee');
            }));

    it('should have the template set to add-edit_employee.html for /new/employee',
            inject(function ($route) {
                var route = $route.routes['/new/employee'];
                expect(route.templateUrl).toEqual('views/employee/add-edit_employee.html');
                expect(route.controller).toEqual('AddEmployeeController');
                expect(route.controllerAs).toEqual('employee');
            }));

    it('should have the template set to locales.html for /locales',
            inject(function ($route) {
                var route = $route.routes['/locales'];
                expect(route.templateUrl).toEqual('views/locale/locales.html');
                expect(route.controller).toEqual('LocalesController');
                expect(route.controllerAs).toEqual('locales');
            }));

});
