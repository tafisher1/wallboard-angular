(function () {
    'use strict';

    angular
        .module('employee.view')
        .controller('EditEmployeeController', EditEmployeeController);

    EditEmployeeController.$inject = ['$routeParams', 'employeeService',
        'localeService', '$location', '$window',
    ];

    /* @ngInject */
    function EditEmployeeController($routeParams, employeeService, localeService,
         $location, $window) {
        var _this = this;
        _this.pageName = 'Edit';
        _this.data = {};
        _this.locale = {};
        _this.allLocales = {};
        _this.id = $routeParams.id;
        _this.saveEmployee = updateEmployee;

        activate();

        function updateEmployee() {
            employeeService.updateEmployee(_this.id, _this.data, _this.locale)
            .then(function (data) {
                if (data === undefined) {
                    $window.alert('Error while saving employee');
                } else {
                    $location.path('/employee/' + _this.id);
                }
            });
        }

        function activate() {
            employeeService.getEmployee(_this.id).then(function (data) {
                _this.data = data;
            });

            employeeService.getEmployeeLocale(_this.id).then(function (data) {
                _this.locale = data._links.self.href;
            });

            localeService.listLocales().then(function (data) {
                _this.allLocales = data._embedded.locales;
            });
        }

    }
})();
