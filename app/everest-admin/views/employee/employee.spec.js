describe('Employee Controller', function() {
    beforeEach(module('employee.view'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    var testee;
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

    it('data should be filled from the employee service when crated', function() {
        var employeeController = $controller('EmployeeController',
            {employeeService: employeeService});
        expect(employeeController.data).toEqual('test data');
    });

});
