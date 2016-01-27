describe('wall.controller', function() {
	beforeEach(module('wallboard'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('WallController', function() {
    	
    	describe('loadLocaleFromRequest', function() {
    		
    		var controller, everestService, scope, routeParams;
    		
    		it('should set locale with valid localeName', inject(function(_everestService_, _$routeParams_) {
    			everestService = _everestService_;
            	routeParams = _$routeParams_;
            	routeParams.localeName = 'Kearney';
            	
            	// TODO - Is there a better way to mock this returnValue portion?
            	spyOn(everestService, 'getLocaleByName')
            		.and.returnValue({ 
            			then: function(q) { q('it works'); }
            		});
    			
            	controller = $controller('WallController', { 
        			everestService	: everestService, 
        			$routeParams	: routeParams
        		});
            	
    			expect(everestService.getLocaleByName).toHaveBeenCalledWith('Kearney');
    			expect(controller.locale).toEqual('it works');
    		}));
    		
    		
    		it('should not set locale with invalid localeName', inject(function(_everestService_, _$routeParams_) {
    			everestService = _everestService_;
            	routeParams = _$routeParams_;
            	routeParams.localeName = 'Unknown';
            	
            	spyOn(everestService, 'getLocaleByName')
            		.and.returnValue({ 
            			then: function(q) { q(undefined); }
            		});
    			
            	controller = $controller('WallController', { 
        			everestService	: everestService, 
        			$routeParams	: routeParams
        		});
            	
    			expect(everestService.getLocaleByName).toHaveBeenCalledWith('Unknown');
    			expect(controller.locale).toEqual(undefined);
    		}));
    		
    	});
    });
    
});