(function() {
    'use strict';

    angular
        .module('employee.view')
        .controller('ViewEmployeeController', ViewEmployeeController);

    ViewEmployeeController.$inject = ['$routeParams', 'employeeService'];

    /* @ngInject */
    function ViewEmployeeController($routeParams, employeeService) {
        var vm = this;
        vm.data = {};
        vm.locale = {};
        vm.defaultEmployeeImage = 'images/person.jpg';
        activate();

        function activate() {
            employeeService.getEmployee($routeParams.id).then(function(data) {
                vm.data = data;
            });

            employeeService.getEmployeeLocale($routeParams.id).then(function(data) {
                vm.locale = data;
            });
        }
    }
})();
