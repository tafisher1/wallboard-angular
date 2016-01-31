describe('format.percent', function() {
	beforeEach(module('format.percent'));
	
	var filter;
	
	beforeEach(inject(function(formatPercentFilter) {
		filter = formatPercentFilter;
	}));
	
	it('should return the correct formatted percentage -- round up', function() {
		expect(filter('5.0326')).toEqual('5.033%');
	});
	
	it('should return the correct formatted percentage -- round down', function() {
		expect(filter('5.0324')).toEqual('5.032%');
	});
});