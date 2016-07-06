(function() {
    'use strict';

    angular
        .module('locale.view')
        .controller('ViewLocaleController', ViewLocaleController);

    ViewLocaleController.$inject = ['$routeParams','localeService'];

    /* @ngInject */
    function ViewLocaleController($routeParams,localeService) {
        var vm = this;
        vm.data = {};
        vm.id = $routeParams.id;
        vm.newsKeywords = [];
        vm.stocks = [];
        activate();

        function activate() {
            localeService.getLocale(vm.id).then(function (data) {
                vm.data = data;
                vm.newsKeywords = data.newsKeywords.split(',');
                vm.stocks = data.stockSymbols.split(',');
            });
        }

    }
})();
