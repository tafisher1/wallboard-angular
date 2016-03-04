(function () {
    'use strict';

    angular
        .module('employee.view')
        .controller('EmployeeController', EmployeeController);

    EmployeeController.$inject = ['employeeService', '$uibModal'];

    /* @ngInject */
    function EmployeeController(employeeService, $uibModal) {
        var _this = this;
        _this.data = {};
        _this.openDeleteModal = openDeleteModal;
        activate();

        function activate() {
            employeeService.listEmployees().then(function (data) {
                _this.data = data;
                for (var item in _this.data._embedded.employees) {
                    if (true) {
                        _this.data._embedded.employees[item].id =
                            employeeService.parseIdFromSelfLink(_this.data
                                ._embedded.employees[item]._links.self.href);
                    }
                }
            });
        }

        function openDeleteModal(id, name) {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/employee/modal/delete_employee_modal.html',
                controller: 'DeleteEmployeeModal',
                controllerAs: 'employee',
                resolve: {
                    id: function () {
                        return id;
                    },

                    name: function () {
                        return name;
                    },
                },

            });

            modalInstance.result.then(function () {
                activate();
            });

        }
    }
})();
