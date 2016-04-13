(function() {
    'use strict';

    angular
        .module('default.value.filter')
        .filter('defaultValue', defaultValue);

    function defaultValue() {
        return filterFilter;

        function filterFilter(input, defaultValue) {
            if (input === undefined || input === null || input === '') {
                return defaultValue;
            }
            return input;
        }
    }
})();
