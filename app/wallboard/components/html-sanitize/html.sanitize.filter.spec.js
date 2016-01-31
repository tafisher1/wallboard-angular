describe('html.sanitize', function() {
	beforeEach(module('html.sanitize'));
	
	var sanitizeFilter;
	
	beforeEach(inject(function(_sanitizeFilter_) {
        sanitizeFilter = _sanitizeFilter_;
    }));
	
	it('should allow the html code and return it', inject(function($sce) {
		var result = sanitizeFilter('<p>Test <br> Content</p>');
		expect(result.$$unwrapTrustedValue()).toEqual('<p>Test <br> Content</p>');
	}));
})