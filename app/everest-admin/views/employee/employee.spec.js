describe('Employee Controller', function() {
    beforeEach(module('employee.view'));

    var employeeService = {};
    beforeEach(function () {
        employeeService.listEmployees = function() {
            var promise = {};
            promise.then = function (callback) {
                callback('test data');
            };
            return promise;
        };
    });

    var employeeController;
    beforeEach(inject(function ($controller) {
        employeeController = $controller('EmployeeController',
            {employeeService: employeeService});
    }));

    it('data should be filled from the employee service when crated', function() {
        expect(employeeController.data).toEqual('test data');
    });

    it('getEditURL should pull the employee id of a hateos url', function() {
        expect(employeeController.getEditUrl('http://some.domain.com/path/path/path/1'))
            .toEqual('#/employee/1');
    });

});
