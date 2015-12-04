'use strict';
var api;
angular
	.module('myApp.everestService', [])
	.factory('everestService', ['$resource', '$http', function($resource, $http) {
		
		// TODO Configure these elsewhere
		var EVEREST_URL = 'http://localhost:8080/api'; 
		var EVEREST_TOKEN = '5d89az-x8a7q264-115z9fpq-91acq4';
		
		return {
			get : get,
		};
		
		function get(url) {
			var request = $http({
				method: 'GET',
				url: url,
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
			console.log(response);
		}
	}]);