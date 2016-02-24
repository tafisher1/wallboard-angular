describe('Employee Service', function () {
    beforeEach(module('everest.employee'));

    var everestService;

    beforeEach(inject(function (_everestService_) {
        everestService = _everestService_;
        spyOn(everestService, 'get').and.returnValue('test data');
        spyOn(everestService, 'put').and.returnValue('updated employee data');
        spyOn(everestService, 'post').and.returnValue('added employee data');

    }));

    it('listEmployees() should get a call to data/employees and get retun value from service',
        inject(function (employeeService) {
            var response = employeeService.listEmployees();
            expect(response).toEqual('test data');
            expect(everestService.get.calls.count()).toEqual(1);
            expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/employees');
        }));

    it('getEmployee() Should get a call to data/employee/{id} and then' +
         'return a value from the service', inject(function (employeeService) {
            var response = employeeService.getEmployee(1);
            expect(response).toEqual('test data');
            expect(everestService.get.calls.count()).toEqual(1);
            expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/employees/1');
        }));

    it('getEmployeeLocale() Should get a call to data/employee/{id}/locale and then' +
             'return a value from the service', inject(function (employeeService) {
                var response = employeeService.getEmployeeLocale(2);
                expect(response).toEqual('test data');
                expect(everestService.get.calls.count()).toEqual(1);
                expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/employees/2/locale');
            }));

    it('updateEmployee() should call put to /data/employees/{id} with the updated employee info',
        inject(function (employeeService) {
            var employeeData = {};
            var locale = 'locale';
            var employeeId = 123;

            var response = employeeService.updateEmployee(employeeId, employeeData, locale);
            expect(response).toEqual('updated employee data');
            expect(everestService.put.calls.count()).toEqual(1);
            expect(everestService.put.calls.argsFor(0)[0]).toEqual('/data/employees/123');
            var updatedEmployee = everestService.put.calls.argsFor(0)[1];
            expect(updatedEmployee).toEqual(employeeData);
            expect(updatedEmployee.locale).toEqual(locale);
        }));

    it('addEmployee() should call put to /data/employees with the new employee info',
        inject(function (employeeService) {
            var employeeData = {};
            var locale = 'locale';

            var response = employeeService.addEmployee(employeeData, locale);
            expect(response).toEqual('added employee data');
            expect(everestService.post.calls.count()).toEqual(1);
            expect(everestService.post.calls.argsFor(0)[0]).toEqual('/data/employees');
            var updatedEmployee = everestService.post.calls.argsFor(0)[1];
            expect(updatedEmployee).toEqual(employeeData);
            expect(updatedEmployee.locale).toEqual(locale);
        }));

    it('parseIdFromSelfLink should return the id portion of an employee self link',
        inject(function (employeeService) {
            expect(employeeService.parseIdFromSelfLink('http://localhost/api/data/employee/1'))
            .toEqual('/1');
        }));

});
