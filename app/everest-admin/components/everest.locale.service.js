(function () {
    'use strict';

    angular
        .module('everest.locale')
        .factory('localeService', localeService);

    localeService.$inject = ['everestService'];

    /* @ngInject */
    function localeService(everestService) {
        var service = {
            listLocales: listLocales,
        };

        return service;

        function listLocales() {
            return everestService.get('/data/locales');
        }
    }
})();
