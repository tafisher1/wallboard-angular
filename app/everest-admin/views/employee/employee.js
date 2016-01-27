(function() {
    'use strict';

    angular
        .module('employee.view')
        .controller('EmployeeController', EmployeeController);

    EmployeeController.$inject = ['employeeService'];

    /* @ngInject */
    function EmployeeController(employeeService) {
        var vm = this;
        vm.data = {};

        activate();

        function activate() {
            employeeService.listEmployees().then(function (data) {
                vm.data = data;
            });
        }
    }
})();
