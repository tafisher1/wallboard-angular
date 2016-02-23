(function () {
    'use strict';

    angular
        .module('employee.view')
        .controller('EmployeeController', EmployeeController);

    EmployeeController.$inject = ['employeeService'];

    /* @ngInject */
    function EmployeeController(employeeService) {
        var _this = this;
        _this.data = {};
        _this.getEditUrl = getEditUrl;
        activate();

        function activate() {
            employeeService.listEmployees().then(function (data) {
                _this.data = data;
            });
        }

        function getEditUrl(hateosUrl) {
            var id = employeeService.parseIdFromSelfLink(hateosUrl);
            return '#/employee' + id;
        }
    }
})();
