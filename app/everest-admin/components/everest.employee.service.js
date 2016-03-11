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
            addEmployee:addEmployee,
            parseIdFromSelfLink: parseIdFromSelfLink,
            deleteEmployee: deleteEmployee,
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

        function addEmployee(employee, locale) {
            var addedEmployee = employee;
            addedEmployee.locale = locale;
            return everestService.post('/data/employees', addedEmployee);
        }

        function deleteEmployee(employeeId) {
            return everestService.doDelete('/data/employees/' + employeeId);
        }

        function parseIdFromSelfLink(link) {
            return link.substring(link.lastIndexOf('/') + 1);
        }

    }
})();
