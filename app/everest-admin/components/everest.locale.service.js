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
            getLocale: getLocale,
            parseIdFromSelfLink: parseIdFromSelfLink
        };

        return service;

        function listLocales() {
            return everestService.get('/data/locales');
        }

        function getLocale(id) {
            return everestService.get('/data/locales/' + id);
        }

        function parseIdFromSelfLink(link) {
            return link.substring(link.lastIndexOf('/') + 1);
        }

    }
})();
