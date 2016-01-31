(function() {
	
	'use strict';
	
	angular
		.module('wallboard', [
			'ngRoute',
			'ngResource',
			'everest.rest',
			'html.sanitize',
			'format.percent',
			'wallboard.directives'
		]);
	
})();
