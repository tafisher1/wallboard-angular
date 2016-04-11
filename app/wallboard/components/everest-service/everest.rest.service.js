/**
 * @namespace Factories
 */
(function () {
    'use strict';

    angular
		.module('everest.rest')
		.factory('everestService', everestService);

    everestService.$inject = ['$http', '$log'];

    /**
	 * @namespace EverestService
	 * @memberOf Factories
	 */
	function everestService($http, $log) {
	
	    // TODO Configure these elsewhere
	    var EVEREST_URL = 'http://127.0.0.1:8080/api';
	    var EVEREST_TOKEN = 'ad3dfe-1d5a8d7e-d8a7d8e9-dadadw';
	    
	    var service = {
	        get 					: get,
	        getAllLocales			: getAllLocales,
	        getFrom					: getFrom,
	        put						: put,
            post					: post,
            getAllLocales			: getAllLocales,
            getLocaleByName			: getLocaleByName,
            doDelete				: doDelete,
	    };
	    
	    return service;
	    //////////////////////
	    
	    /**
	     * @name get
	     * @memberOf Factories.EverestService
	     * @param {String} url The url endpoint from which to retrieve data. Prepends the everest gateway to URL
	     * prior to making the request.
	     * @returns {Promise}
	     * @desc Fetches and returns the data from the provided url.
	     */
	    function get(url) {
	        return service.getFrom(EVEREST_URL + url);
	    }

        function put(url, data) {
            var reqeust = $http({
                method: 'PUT',
                url: EVEREST_URL + url,
                headers: {
                    'X-AUTH-TOKEN': EVEREST_TOKEN,
                },
                data: data,
            });
            return reqeust.then(handleSuccess, handleFailure);
        }

        function post(url, data) {
            var reqeust = $http({
                method: 'POST',
                url: EVEREST_URL + url,
                headers: {
                    'X-AUTH-TOKEN': EVEREST_TOKEN,
                },
                data: data,
            });
            return reqeust.then(handleSuccess, handleFailure);
        }

        function doDelete(url) {
            var reqeust = $http({
                method: 'DELETE',
                url: EVEREST_URL + url,
                headers: {
                    'X-AUTH-TOKEN': EVEREST_TOKEN,
                },
            });
            return reqeust.then(handleSuccess, handleFailure);
        }

        /**
	     * @name getAllLocales
	     * @memberOf Factories.EverestService
	     * @returns {Promise}
	     * @desc Fetches and return the data for all locales.
	     */
	    function getAllLocales() {
	    	return service
	    		.get('/data/locales')
	    		.then(function(response) {
	    			return response._embedded.locales;
	    		});
	    }
	    
	    /**
	     * @name getFrom
	     * @memberOf Factories.EverestService
	     * @param {String} url The url from which to retrieve data.
	     * @returns {Promise}
	     * @desc Fetches and returns the data from the provided url.
	     */
	    function getFrom(url) {
	    	var request = $http({
	            method: 'GET',
	            url: url,
	            headers: {
	                'X-AUTH-TOKEN': EVEREST_TOKEN
	            }
	        });
	
	        return request.then(handleSuccess, handleFailure);
	    }
	    
        function getAllLocales() {
            return service
             .get('/data/locales')
             .then(function (response) {
                 return response._embedded.locales;
             });
        }

        /**
	     * @name getLocaleByName
	     * @memberOf Factories.EverestService
	     * @param {String} localeName The localeName to retrieve data for.
	     * @returns {Promise}
	     * @desc Fetches and returns the data for the locale based on it's localeName.
	     */
        function getLocaleByName(localeName) {
            return service
            .get('/data/locales')
            .then(function (response) {
                for (var i in response._embedded.locales) {
                    if (true) {
                        var locale = response._embedded.locales[i];
                        if (localeName.toLowerCase() === locale.name.toLowerCase()) {
                            return locale;
                        }
                    }
                }
            });
        }

        /**
	     * @name Handler method for all successful HTTP requests
	     * @memberOf Factories.EverestService
	     * @param {String} response The response data.
	     * @desc Handler method for all erroneous HTTP requests.
	     */
        function handleFailure(response) {
            $log.error(response);
        }

        /**
	     * @name handleSuccess
	     * @memberOf Factories.EverestService
	     * @param {String} response The response data.
	     * @returns {Promise}
	     * @desc Handler method for all successful HTTP requests.
	     */
        function handleSuccess(response) {
            return response.data;
        }
    }

})();
