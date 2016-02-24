describe('EditEmployeeController', function () {
    beforeEach(module('employee.view'));

    var employeeService, localeService;
    beforeEach(inject(function (_employeeService_, _localeService_) {
        employeeService = _employeeService_;
        localeService = _localeService_;
        spyOn(employeeService, 'getEmployee').and.returnValue(getEmployeePromise());
        spyOn(employeeService, 'getEmployeeLocale').and.returnValue(getLocalePromise());
        spyOn(localeService, 'listLocales').and.returnValue(getAllLocalesPromise());
    }));

    var $routeParams = {
        id: 123,
    };

    var $location, $window;

    var employeeEditController;
    beforeEach(inject(function ($controller) {
        $location = {};
        $location.path = jasmine.createSpy('path');

        $window = {};
        $window.alert = jasmine.createSpy('alert');

        employeeEditController = $controller('EditEmployeeController', {
            $routeParams: $routeParams,
            employeeService:employeeService,
            localeService:localeService,
            $location:$location,
            $window:$window,
        });
    }));

    describe('inital state', function () {
        it('should have the employee data initalized', function () {
            expect(employeeEditController.data).toEqual('employee data');
            expect(employeeService.getEmployee.calls.count()).toEqual(1);
            expect(employeeService.getEmployee.calls.argsFor(0)[0]).toEqual(123);
        });

        it('should have the locale data initalized', function () {
            expect(employeeEditController.locale).toEqual('locale data');
            expect(employeeService.getEmployeeLocale.calls.count()).toEqual(1);
            expect(employeeService.getEmployeeLocale.calls.argsFor(0)[0]).toEqual(123);
        });

        it('should have all locales data initalized', function () {
            expect(employeeEditController.allLocales).toEqual('all locales');
            expect(localeService.listLocales.calls.count()).toEqual(1);
        });

        it('should have id set from route parms', function () {
            expect(employeeEditController.id).toEqual(123);
        });
    });

    describe('update employee', function () {

        it('should redirect the user to the view employee page if update is successfull',
            function () {
                //given
                spyOn(employeeService, 'updateEmployee').and
                    .returnValue(getUpdateEmployeeSuccessfullPromise());

                //when
                employeeEditController.updateEmployee();

                //then
                expect(employeeService.updateEmployee.calls.count()).toEqual(1);
                expect(employeeService.updateEmployee.calls.argsFor(0)[0]).toEqual(123);
                expect(employeeService.updateEmployee.calls.argsFor(0)[1]).toEqual('employee data');
                expect(employeeService.updateEmployee.calls.argsFor(0)[2]).toEqual('locale data');
                expect($location.path.calls.count()).toEqual(1);
                expect($location.path.calls.argsFor(0)[0]).toEqual('/employee/123');
            });

        it('should show an error to the user if update fails',
            function () {
                //given
                spyOn(employeeService, 'updateEmployee').and
                    .returnValue(getUpdateEmployeeFailPromise());

                //when
                employeeEditController.updateEmployee();

                //then
                expect(employeeService.updateEmployee.calls.count()).toEqual(1);
                expect(employeeService.updateEmployee.calls.argsFor(0)[0]).toEqual(123);
                expect(employeeService.updateEmployee.calls.argsFor(0)[1]).toEqual('employee data');
                expect(employeeService.updateEmployee.calls.argsFor(0)[2]).toEqual('locale data');
                expect($window.alert.calls.count()).toEqual(1);
                expect($window.alert.calls.argsFor(0)[0]).toEqual('Error while saving employee');
            });

    });

    function getUpdateEmployeeSuccessfullPromise() {
        var promise = {
            then: function (callback) {
                callback('update success');
            },
        };
        return promise;
    }

    function getUpdateEmployeeFailPromise() {
        var promise = {
            then: function (callback) {
                callback();
            },
        };
        return promise;
    }

    function getEmployeePromise() {
        var promise = {
            then: function (callback) {
                callback('employee data');
            },
        };
        return promise;
    }

    function getAllLocalesPromise() {
        var promise = {
            then: function (callback) {
                var data = {
                    _embedded:{
                        locales:'all locales',
                    },
                };
                callback(data);
            },
        };
        return promise;
    }

    function getLocalePromise() {
        var promise = {
            then: function (callback) {
                var data = {
                    _links:{
                        self:{
                            href:'locale data',
                        },
                    },
                };

                callback(data);
            },
        };
        return promise;
    }
});
