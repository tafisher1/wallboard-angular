(function () {
    'use strict';

    angular
        .module('employee.view')
        .controller('DeleteEmployeeModal', DeleteEmployeeModal);

    DeleteEmployeeModal.$inject = ['employeeService', '$uibModalInstance', '$window', 'name', 'id'];

    /* @ngInject */
    function DeleteEmployeeModal(employeeService, $uibModalInstance, $window,
             name, id) {
        var _this = this;
        _this.name = name;
        _this.ok = ok;
        _this.cancel = cancel;

        function ok() {
            employeeService.deleteEmployee(id).then(function (data) {
                $uibModalInstance.close();
                if (data === undefined) {
                    $window.alert('Error while deleting employee');
                }

            });
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }
})();
