(function () {
    'use strict';

    angular
        .module('employee.view')
        .controller('AddEmployeeController', AddEmployeeController);

    AddEmployeeController.$inject = ['employeeService',
        'localeService', '$location', '$window',
    ];

    /* @ngInject */
    function AddEmployeeController(employeeService, localeService,
         $location, $window) {
        var _this = this;
        _this.pageName = 'Add';
        _this.data = {};
        _this.locale = {};
        _this.allLocales = {};
        _this.saveEmployee = saveEmployee;

        activate();

        function saveEmployee() {
            employeeService.addEmployee(_this.data, _this.locale)
            .then(function (data) {
                if (data === undefined) {
                    $window.alert('Error while adding employee');
                } else {
                    var id = employeeService.parseIdFromSelfLink(data._links.self.href);
                    $location.path('/employee' + id);
                }
            });
        }

        function activate() {
            localeService.listLocales().then(function (data) {
                _this.allLocales = data._embedded.locales;
            });
        }

    }
})();
