describe('ViewEmployeeController', function() {
    beforeEach(module('employee.view'));

    var employeeService;
    beforeEach(inject(function(_employeeService_) {
        employeeService = _employeeService_;
        spyOn(employeeService, 'getEmployee').and.returnValue(getEmployeePromise());
        spyOn(employeeService, 'getEmployeeLocale').and.returnValue(getLocalePromise());
    }));

    var $routeParams = {id: 123};

    var employeeViewController;
    beforeEach(inject(function($controller) {
        employeeViewController = $controller('ViewEmployeeController', {$routeParams : $routeParams,
            employeeService:employeeService});
    }));

    describe('inital state', function() {

        it('should have the employee data initalized', function() {
            expect(employeeViewController.data).toEqual('employee data');
            expect(employeeService.getEmployee.calls.count()).toEqual(1);
            expect(employeeService.getEmployee.calls.argsFor(0)[0]).toEqual(123);
        });

        it('should have the locale data initalized', function() {
            expect(employeeViewController.locale).toEqual('locale data');
            expect(employeeService.getEmployeeLocale.calls.count()).toEqual(1);
            expect(employeeService.getEmployeeLocale.calls.argsFor(0)[0]).toEqual(123);
        });

        it('should have a default image defined', function() {
            expect(employeeViewController.defaultEmployeeImage).toEqual('images/person.jpg');
        });
    });
});

function getEmployeePromise() {
    var promise = {
        then : function(callback) {
            callback('employee data');
        }
    };
    return promise;
}

function getLocalePromise() {
    var promise = {
        then : function(callback) {
            callback('locale data');
        }
    };
    return promise;
}
