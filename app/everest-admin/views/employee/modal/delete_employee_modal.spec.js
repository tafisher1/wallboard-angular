describe('DeleteEmployeeModal', function () {
    beforeEach(module('employee.view'));

    var employeeService ;
    beforeEach(inject(function(_employeeService_) {
        employeeService = _employeeService_;
        spyOn(employeeService, 'deleteEmployee').and.returnValue({then:function(callback) {
            callback('data');
        }});
    }));

    var $uibModalInstance;
    beforeEach(function() {
        $uibModalInstance = {};
        $uibModalInstance.close = jasmine.createSpy();
        $uibModalInstance.dismiss = jasmine.createSpy();
    });

    var $window;
    beforeEach(inject(function (_$window_) {
        $window = _$window_;
        spyOn($window, 'alert');
    }));

    var deleteEmployeeModal;
    beforeEach(inject(function ($controller) {
        deleteEmployeeModal = $controller('DeleteEmployeeModal', {
            name: 'bob',
            id:'352',
            $uibModalInstance:$uibModalInstance
        });
    }));

    it('should have the name set', function() {
        expect(deleteEmployeeModal.name).toEqual('bob');
    });

    it('ok should delete the employee and close the modal', function() {
        deleteEmployeeModal.ok();
        expect(employeeService.deleteEmployee.calls.count()).toEqual(1);
        expect(employeeService.deleteEmployee.calls.argsFor(0)[0]).toEqual('352');
        expect($uibModalInstance.close.calls.count()).toEqual(1);
        expect($window.alert.calls.count()).toEqual(0);
    });

    it('ok with error should close the modal and open an alert', function() {
        employeeService.deleteEmployee.and.returnValue({then:function(callback) {
            callback();
        }});
        deleteEmployeeModal.ok();
        expect(employeeService.deleteEmployee.calls.count()).toEqual(1);
        expect(employeeService.deleteEmployee.calls.argsFor(0)[0]).toEqual('352');
        expect($uibModalInstance.close.calls.count()).toEqual(1);
        expect($window.alert.calls.count()).toEqual(1);
        expect($window.alert.calls.argsFor(0)[0]).toEqual('Error while deleting employee');
    });

    it('cancel should dismiss the modal', function() {
        deleteEmployeeModal.cancel();
        expect($uibModalInstance.dismiss.calls.count()).toEqual(1);
    });
});
