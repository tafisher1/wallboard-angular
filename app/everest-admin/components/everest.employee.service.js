(function() {
    'use strict';

    angular
        .module('everest.employee')
        .factory('employeeService', employeeService);

    employeeService.$inject = ['everestService'];

    /* @ngInject */
    function employeeService(everestService) {
        var service = {
            listEmployees: listEmployees
        };

        return service;

        function listEmployees() {
            return everestService.get('/data/employees');
        }

    }
})();
