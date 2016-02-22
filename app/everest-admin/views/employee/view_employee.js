(function () {
    'use strict';

    angular
        .module('employee.view')
        .controller('ViewEmployeeController', ViewEmployeeController);

    ViewEmployeeController.$inject = ['$routeParams', 'employeeService'];

    /* @ngInject */
    function ViewEmployeeController($routeParams, employeeService) {
        var _this = this;
        _this.data = {};
        _this.locale = {};
        _this.defaultEmployeeImage = 'images/person.jpg';
        _this.id = $routeParams.id;
        activate();

        function activate() {
            employeeService.getEmployee(_this.id).then(function (data) {
                _this.data = data;
            });

            employeeService.getEmployeeLocale(_this.id).then(function (data) {
                _this.locale = data;
            });
        }
    }
})();
