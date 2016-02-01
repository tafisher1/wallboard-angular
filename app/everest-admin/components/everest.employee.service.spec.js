describe('Employee Service', function () {
    beforeEach(module('everest.employee'));

    var everestService;

    beforeEach(inject(function(_everestService_) {
        everestService = _everestService_;
        spyOn(everestService, 'get').and.returnValue('test data');
    }));

    it('listEmployees() should get a call to data/employees and get retun value from service',
        inject(function(employeeService) {
            var response = employeeService.listEmployees();
            expect(response).toEqual('test data');
            expect(everestService.get.calls.count()).toEqual(1);
            expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/employees');
        }));

    it('getEmployee() Should get a call to data/employee/{id} and then' +
         'return a value from the service',inject(function(employeeService) {
            var response = employeeService.getEmployee(1);
            expect(response).toEqual('test data');
            expect(everestService.get.calls.count()).toEqual(1);
            expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/employees/1');
        }));

    it('getEmployeeLocale() Should get a call to data/employee/{id}/locale and then' +
             'return a value from the service',inject(function(employeeService) {
                var response = employeeService.getEmployeeLocale(2);
                expect(response).toEqual('test data');
                expect(everestService.get.calls.count()).toEqual(1);
                expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/employees/2/locale');
            }));

});
