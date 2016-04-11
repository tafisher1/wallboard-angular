(function() {
    'use strict';

    angular
        .module('locale.view')
        .controller('LocalesController', LocalesController);

    LocalesController.$inject = ['localeService'];

    /* @ngInject */
    function LocalesController(localeService) {
        var vm = this;
        vm.data = [];
        activate();

        function activate() {
            localeService.listLocales().then(function(data) {
                vm.data = data._embedded.locales;
            });
        }
    }
})();
