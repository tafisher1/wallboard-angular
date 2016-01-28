/**
 * @namespace Factories
 */
(function() {
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
	    var EVEREST_TOKEN = '5d89az-x8a7q264-115z9fpq-91acq4';
	    
	    var service = {
	        get 					: get,
	        getAllLocales			: getAllLocales,
	        getFrom					: getFrom,
	        getLocaleByName 		: getLocaleByName
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
	    		.then(function(response) {
	    			for(var i in response._embedded.locales) {
	    				var locale = response._embedded.locales[i];
	    				if (localeName.toLowerCase() == locale.name.toLowerCase()) {
	    					return locale;
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
