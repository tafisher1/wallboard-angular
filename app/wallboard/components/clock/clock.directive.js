(function() {
	
	'use strict';
	
	angular
		.module('wallboard.directives')
		.directive('wbClock', wbClock);
	
	function wbClock() {
		return {
			restrict: 'EA',
			template: 
				'<div class="wbClock">' + 
					'<span class="hour">{{time.hour}}</span>' + 
					':' + 
					'<span class="minute">{{time.minute}}</span>' +
					' ' +
					'<span class="period">{{time.period}}</span>' +
				'</div>',
			scope: {
				timeZone : '='
			},
			link: function(scope, iElement, iAttrs) {
				var browserUtcTimeOffset = new Date().getTimezoneOffset();
				scope.time = {
					hour: 5,
					minute: 32,
					period: 'PM'
				};
				console.log(getOffsetFromUTC('US/Central'));
				console.log(scope.timeZone);
				console.log(scope.time);
			}
		}
	}
	
	function getOffsetFromUTC(timeZone) {
		return {
			'US/Central' : -6
		}[timeZone] * 60;
	}
	
})();