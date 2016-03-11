(function () {
    'use strict';

    angular
        .module('employee.view')
        .controller('ViewEmployeeController', ViewEmployeeController);

    ViewEmployeeController.$inject = ['$routeParams', 'employeeService', '$uibModal', '$location'];

    /* @ngInject */
    function ViewEmployeeController($routeParams, employeeService, $uibModal, $location) {
        var _this = this;
        _this.data = {};
        _this.locale = {};
        _this.defaultEmployeeImage = 'images/person.jpg';
        _this.id = $routeParams.id;
        _this.openDeleteModal = openDeleteModal;
        activate();

        function activate() {
            employeeService.getEmployee(_this.id).then(function (data) {
                _this.data = data;
            });

            employeeService.getEmployeeLocale(_this.id).then(function (data) {
                _this.locale = data;
            });
        }

        function openDeleteModal() {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/employee/modal/delete_employee_modal.html',
                controller: 'DeleteEmployeeModal',
                controllerAs: 'employee',
                resolve: {
                    id: function () {
                        return _this.id;
                    },

                    name: function () {
                        return _this.data.firstName + ' ' + _this.data.lastName;
                    },
                },

            });

            modalInstance.result.then(function () {
                $location.path('/employee');
            });

        }
    }
})();
