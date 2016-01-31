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
		vm.allLocales = [];
		vm.getViews = getViews;
		vm.getWeatherIcon = getWeatherIcon;
		vm.locale = {};
		
		//////////////////////
		
		/**
		 * @name activate
		 * @memberOf Controllers.WallController
		 * @desc Activation method that is called at the end of controller initialization.
		 */
		function activate() {
			
			// Load the initial locale.
			loadLocaleFromRequest().then(function() {
				var urls = vm.locale._links;
				
				if (urls) {
					vm.locale.employees = [];
					everestService.getFrom(urls.employees.href).then(function(data) {
						vm.locale.employees = data._embedded.employees;
					});
					
					vm.locale.stocks = [];
					everestService.getFrom(urls.stocks.href).then(function(data) {
						vm.locale.stocks = data;
					});
					
					vm.locale.news = [];
					everestService.getFrom(urls.news.href).then(function(data) {
						vm.locale.news = data;
					});
					
					vm.locale.weather = {};
					everestService.getFrom(urls.weather.href).then(function(data) {
						vm.locale.weather = data;
					});
				}
				
				$('body').attr('style', 'background-image: url("' + vm.locale.backgroundUrl + '")');
			});
			
			// Load the locale and weather information for all other locales
			everestService.getAllLocales().then(function(data) {
				vm.allLocales = data;
				for(var i in vm.allLocales) {
					(function(x) {
						vm.allLocales[x].weather = {};
						everestService.getFrom(vm.allLocales[x]._links.weather.href).then(function(weatherData) {
							vm.allLocales[x].weather = weatherData;
						});
					})(i);
				}
			});
		}
		
		/**
		 * @name getViews
		 * @memberOf Controllers.WallController
		 * @desc Convenience type that keeps track of the view paths constant for loading
		 * on the using ngInclude.
		 */
		function getViews() {
			return {
				greetings		: '/app/wallboard/views/wall/parts/greetings.html',
				locales			: '/app/wallboard/views/wall/parts/locales.html',
				localeWeather	: '/app/wallboard/views/wall/parts/localeWeather.html',
				logoPanel		: '/app/wallboard/views/wall/parts/logoPanel.html',
				news			: '/app/wallboard/views/wall/parts/news.html',
				profiles		: '/app/wallboard/views/wall/parts/profiles.html',
				stocks			: '/app/wallboard/views/wall/parts/stockTickers.html'
			};
		}
		
		/**
		 * @name getWeatherIcon
		 * @memberOf Controllers.WallController
		 * @desc converts a iconName to its weather icon URL and returns the value.
		 */
		function getWeatherIcon(iconName) {
			if (iconName) {
				return 'http://s.imwx.com/v.20120328.084208/img/wxicon/120/' + iconName + '.png';
			}
		}
		
		/**
		 * @name loadLocaleFromRequest
		 * @memberOf Controllers.WallController
		 * @desc Loads the locale for the view to display. Locale loaded is based on 
		 * the $routeParams.localeName value, used to retrieve the locale from
		 * the provided everestService.
		 */
		function loadLocaleFromRequest() {
			return everestService
				.getLocaleByName($routeParams.localeName)
				.then(function(data) {
					if (data == undefined) {
						// TODO: Error view
					}
					vm.locale = data;
				});
			
		}
		
		activate();
	}
	
})();