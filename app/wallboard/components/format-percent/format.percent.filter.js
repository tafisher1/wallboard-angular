(function() {
	
	'use strict';
	
	angular
		.module('format.percent')
		.filter('formatPercent', formatPercent);
	
	formatPercent.$inject = ['$filter'];
	
	function formatPercent($filter) {
		return function(input, decimals) {
			return $filter('number')(input, decimals) + '%';
		}
	}
})();