(function () {
    'use strict';

    angular
        .module('everest.employee')
        .factory('employeeService', employeeService);

    employeeService.$inject = ['everestService'];

    /* @ngInject */
    function employeeService(everestService) {
        var service = {
            listEmployees: listEmployees,
            getEmployee: getEmployee,
            getEmployeeLocale: getEmployeeLocale,
            updateEmployee:updateEmployee,
        };

        return service;

        function listEmployees() {
            return everestService.get('/data/employees');
        }

        function getEmployee(employeeId) {
            return everestService.get('/data/employees/' + employeeId);
        }

        function getEmployeeLocale(employeeId) {
            return everestService.get('/data/employees/' + employeeId + '/locale');
        }

        function updateEmployee(employeeId, employee, locale) {
            var updatedEmployee = employee;
            updatedEmployee.locale = locale;
            return everestService.put('/data/employees/' + employeeId, updatedEmployee);
        }

    }
})();
