describe('home.controller', function() {
	beforeEach(module('wallboard'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('HomeController', function() {
    	
    	var controller, everestService;
    	
    	beforeEach(inject(function(_everestService_) {
    		everestService = _everestService_;
    		
    		// TODO - Is there a better way to mock this returnValue portion?
        	spyOn(everestService, 'getAllLocales')
        		.and.returnValue({ 
        			then: function(q) { q('it works'); }
        		});
    		
    		controller = $controller('HomeController', {
    			everestService : everestService
    		});
    	}));
    	
    	describe('activate', function() {
    		it('should call getAllLocales()', function() {
    			expect(everestService.getAllLocales).toHaveBeenCalled();
    			expect(controller.locales).toEqual('it works');
    		});
    	});
    	
    	describe('getAllLocales', function() {
    		it('should fetch all locales and store them', function() {
    			expect(everestService.getAllLocales).toHaveBeenCalled();
    			expect(controller.locales).toEqual('it works');
    		});
    	});

    });
    
});