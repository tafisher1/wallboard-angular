/**
 * @namespace Controllers
 */
(function() {
	
	'use strict';

	angular
		.module('wallboard')
		.controller('WallController', WallController);
	
	WallController.$inject = ['everestService', '$routeParams'];
	
	/**
	 * @namespace WallController
	 * @memberOf Controllers
	 * @desc Controller for the Wall view. 
	 */
	function WallController(everestService, $routeParams) {
		
		var vm = this;
		vm.locale = {};
		
		/**
		 * @name loadLocaleFromRequest
		 * @memberOf Controllers.WallController
		 * @desc Loades the locale for the view to display. Locale loaded is based on 
		 * the $routeParams.localeName value, used to retrieve the locale from
		 * the provided everestService.
		 */
		vm.loadLocaleFromRequest = function() {
			everestService
				.getLocaleByName($routeParams.localeName)
				.then(function(data) {
					if (data == undefined) {
						// TODO: Error view
					}
					vm.locale = data;
				});
			
		};
		
		// Initialization calls
		vm.loadLocaleFromRequest();
	}
	
})();