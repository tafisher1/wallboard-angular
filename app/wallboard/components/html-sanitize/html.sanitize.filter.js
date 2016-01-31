(function() {
	
	'use strict';
	
	angular
		.module('html.sanitize')
		.filter("sanitize", sanitize);
	
	sanitize.$inject = ['$sce'];
	
	function sanitize($sce) {
		return function(htmlCode) {
			return $sce.trustAsHtml(htmlCode);
		}
	}
	
})();