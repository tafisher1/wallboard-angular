/**
 * @namespace Controllers
 */
(function() {
	
	'use strict';
	
	angular
		.module('wallboard')
		.controller('HomeController', HomeController);
	
	HomeController.$inject = ['everestService'];
	
	/**
	 * @namespace HomeController
	 * @memberOf Controllers
	 * @desc Controller for the application Home view.
	 */
	function HomeController(everestService) {
		
		var vm = this;
		vm.getAllLocales = getAllLocales;
		
		/////////////////
		
		activate();
		
		/**
		 * @name activate
		 * @memberOf Controllers.HomeController
		 * @desc Handles any activation required on-load.
		 */
		function activate() {
			return getAllLocales();
		}
		
		/**
		 * @name getAllLocales
		 * @memberOf Controllers.HomeController
		 * @desc Fetches and sets all locales in scope.
		 */
		function getAllLocales() {
			return everestService
				.getAllLocales()
				.then(function(data) {
					// TODO Error Handling
					vm.locales = data;
				});
		}
	}
	
})();