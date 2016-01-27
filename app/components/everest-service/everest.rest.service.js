(function() {
'use strict';

angular
	.module('everest.rest')
	.factory('everestService',  everestService);

everestService.$inject = ['$http', '$log'];

function everestService($http, $log) {

    // TODO Configure these elsewhere
    var EVEREST_URL = 'http://127.0.0.1:8080/api';
    var EVEREST_TOKEN = '5d89az-x8a7q264-115z9fpq-91acq4';
    var service = {
        get : get
    };
    return service;

    function get(url) {
        var request = $http({
            method: 'GET',
            url: EVEREST_URL + url,
            headers: {
                'X-AUTH-TOKEN': EVEREST_TOKEN
            }
        });
        return request.then(handleSuccess, handleFailure);
    }

    function handleSuccess(response) {
        return response.data;
    }

    function handleFailure(response) {
        $log.error(response);
    }
	}

})();
