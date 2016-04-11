describe('Employee Controller', function () {
    beforeEach(module('employee.view'));
    var employeeService = {};
    var employeeListOutput;

    beforeEach(function () {
        employeeListOutput = {
            _embedded:{
                employees:[
                    {
                        _links:{
                            self:{
                                href:'self url 1',
                            },
                        },
                    },
                    {
                        _links:{
                            self:{
                                href:'self url 2',
                            },
                        },
                    },
                ],
            },
        };

        employeeService.parseIdFromSelfLink = jasmine.createSpy().and.returnValues('1', '2');
        employeeService.listEmployees = function () {
            var promise = {};
            promise.then = function (callback) {
                callback(employeeListOutput);
            };

            return promise;
        };
    });

    var employeeController;
    beforeEach(inject(function ($controller) {
        employeeController = $controller('EmployeeController',
            {
                employeeService: employeeService,
            });
    }));

    var $uibModal;
    beforeEach(inject (function(_$uibModal_) {
        var modalInstance = {
            result:{
                then: function(callback) {
                    callback();
                }
            }
        };

        $uibModal = _$uibModal_;
        spyOn($uibModal, 'open').and.returnValue(modalInstance);
    }));

    it('data should be filled from the employee service when crated', function () {
        expect(employeeController.data).toEqual(employeeListOutput);
        expect(employeeController.data._embedded.employees[0].id).toEqual('1');
        expect(employeeController.data._embedded.employees[1].id).toEqual('2');
        expect(employeeService.parseIdFromSelfLink.calls.count()).toEqual(2);
        expect(employeeService.parseIdFromSelfLink.calls.argsFor(0)[0]).toEqual('self url 1');
        expect(employeeService.parseIdFromSelfLink.calls.argsFor(1)[0]).toEqual('self url 2');
    });

    it('openDeleteModal should create a modal to delete the passed in user', function () {
        employeeController.openDeleteModal('123', 'bob');
        expect($uibModal.open.calls.count()).toEqual(1);
        var modalConfig = $uibModal.open.calls.argsFor(0)[0];
        expect(modalConfig.templateUrl).toEqual('views/employee/modal/delete_employee_modal.html');
        expect(modalConfig.controller).toEqual('DeleteEmployeeModal');
        expect(modalConfig.controllerAs).toEqual('employee');
        expect(modalConfig.resolve.id()).toEqual('123');
        expect(modalConfig.resolve.name()).toEqual('bob');

        //check to see if activate was called 4 times. twice on startup and twice for the modal
        expect(employeeService.parseIdFromSelfLink.calls.count()).toEqual(4);
    });

});
