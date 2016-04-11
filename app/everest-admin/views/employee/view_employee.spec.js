describe('ViewEmployeeController', function () {
    beforeEach(module('employee.view'));

    var employeeData = {
        firstName: 'bob',
        lastName: 'burger'
    };

    var employeeService;
    beforeEach(inject(function (_employeeService_) {
        employeeService = _employeeService_;
        spyOn(employeeService, 'getEmployee').and.returnValue(getEmployeePromise());
        spyOn(employeeService, 'getEmployeeLocale').and.returnValue(getLocalePromise());
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

    var $location;
    beforeEach(inject(function(_$location_) {
        $location = _$location_;
        spyOn($location, 'path');
    }));

    var $routeParams = {
        id: 123,
    };

    var employeeViewController;
    beforeEach(inject(function ($controller) {
        employeeViewController = $controller('ViewEmployeeController', {
            $routeParams: $routeParams,
            employeeService:employeeService,
        });
    }));

    describe('inital state', function () {

        it('should have the employee data initalized', function () {
            expect(employeeViewController.data).toEqual(employeeData);
            expect(employeeService.getEmployee.calls.count()).toEqual(1);
            expect(employeeService.getEmployee.calls.argsFor(0)[0]).toEqual(123);
        });

        it('should have the locale data initalized', function () {
            expect(employeeViewController.locale).toEqual('locale data');
            expect(employeeService.getEmployeeLocale.calls.count()).toEqual(1);
            expect(employeeService.getEmployeeLocale.calls.argsFor(0)[0]).toEqual(123);
        });

        it('should have a default image defined', function () {
            expect(employeeViewController.defaultEmployeeImage).toEqual('images/person.jpg');
        });

        it('should have the user id exposed in a paramter', function () {
            expect(employeeViewController.id).toEqual(123);
        });

        it('openDeleteModal should create a modal to delete the passed in user', function () {
            employeeViewController.openDeleteModal();
            expect($uibModal.open.calls.count()).toEqual(1);
            var modalConfig = $uibModal.open.calls.argsFor(0)[0];
            expect(modalConfig.templateUrl)
                .toEqual('views/employee/modal/delete_employee_modal.html');
            expect(modalConfig.controller).toEqual('DeleteEmployeeModal');
            expect(modalConfig.controllerAs).toEqual('employee');
            expect(modalConfig.resolve.id()).toEqual(123);
            expect(modalConfig.resolve.name()).toEqual('bob burger');

            expect($location.path.calls.count()).toEqual(1);
            expect($location.path.calls.argsFor(0)[0]).toEqual('/employee');
        });

    });

    function getEmployeePromise() {
        var promise = {
            then: function (callback) {
                callback(employeeData);
            },
        };
        return promise;
    }

    function getLocalePromise() {
        var promise = {
            then: function (callback) {
                callback('locale data');
            },
        };
        return promise;
    }

});
