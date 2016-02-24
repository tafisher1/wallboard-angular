describe('AddEmployeeController', function () {
    beforeEach(module('employee.view'));

    var employeeService, localeService;
    beforeEach(inject(function (_employeeService_, _localeService_) {
        employeeService = _employeeService_;
        localeService = _localeService_;
        spyOn(localeService, 'listLocales').and.returnValue(getAllLocalesPromise());
    }));

    var $location, $window;

    var employeeAddController;
    beforeEach(inject(function ($controller) {
        $location = {};
        $location.path = jasmine.createSpy('path');

        $window = {};
        $window.alert = jasmine.createSpy('alert');

        employeeAddController = $controller('AddEmployeeController', {
            employeeService:employeeService,
            localeService:localeService,
            $location:$location,
            $window:$window,
        });
    }));

    describe('inital state', function () {
        it('should have empty employee data', function () {
            expect(employeeAddController.data).toEqual({});
        });

        it('should have empty locale', function () {
            expect(employeeAddController.locale).toEqual({});
        });

        it('should have all locales data initalized', function () {
            expect(employeeAddController.allLocales).toEqual('all locales');
            expect(localeService.listLocales.calls.count()).toEqual(1);
        });

        it('should have page name set to add', function () {
            expect(employeeAddController.pageName).toEqual('Add');
        });
    });

    describe('save employee', function () {

        it('should redirect the user to the view employee page if update is successfull',
            function () {
                //given
                spyOn(employeeService, 'addEmployee').and
                    .returnValue(getSaveEmployeeSuccessfullPromise());

                //when
                employeeAddController.data = 'employee data';
                employeeAddController.locale = 'locale data';
                employeeAddController.saveEmployee();

                //then
                expect(employeeService.addEmployee.calls.count()).toEqual(1);
                expect(employeeService.addEmployee.calls.argsFor(0)[0]).toEqual('employee data');
                expect(employeeService.addEmployee.calls.argsFor(0)[1]).toEqual('locale data');
                expect($location.path.calls.count()).toEqual(1);
                expect($location.path.calls.argsFor(0)[0]).toEqual('/employee/123');
            });

        it('should show an error to the user if update fails',
            function () {
                //given
                spyOn(employeeService, 'addEmployee').and
                    .returnValue(getSaveEmployeeFailPromise());

                //when
                employeeAddController.data = 'employee data';
                employeeAddController.locale = 'locale data';
                employeeAddController.saveEmployee();

                //then
                expect(employeeService.addEmployee.calls.count()).toEqual(1);
                expect(employeeService.addEmployee.calls.argsFor(0)[0]).toEqual('employee data');
                expect(employeeService.addEmployee.calls.argsFor(0)[1]).toEqual('locale data');
                expect($window.alert.calls.count()).toEqual(1);
                expect($window.alert.calls.argsFor(0)[0]).toEqual('Error while adding employee');
            });

    });

    function getSaveEmployeeSuccessfullPromise() {
        var promise = {
            then: function (callback) {
                var obj = {
                    _links:{
                        self:{
                            href:'http://localhost/api/data/employee/123',
                        },
                    },
                };

                callback(obj);
            },
        };
        return promise;
    }

    function getSaveEmployeeFailPromise() {
        var promise = {
            then: function (callback) {
                callback();
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

});
