describe('wall.controller', function() {
	beforeEach(module('wallboard'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('WallController', function() {
    	
    	var controller, everestService, scope, routeParams;
    	
//    	describe('loadLocaleFromRequest', function() {
//    		
//    		it('should set locale with valid localeName', inject(function(_everestService_, _$routeParams_) {
//    			everestService = _everestService_;
//            	routeParams = _$routeParams_;
//            	routeParams.localeName = 'Kearney';
//            	
//            	// TODO - Is there a better way to mock this returnValue portion?
//            	spyOn(everestService, 'getLocaleByName')
//            		.and.returnValue({ 
//            			then: function(q) { q('it works'); }
//            		});
//    			
//            	controller = $controller('WallController', { 
//        			everestService	: everestService, 
//        			$routeParams	: routeParams
//        		});
//            	
//    			expect(everestService.getLocaleByName).toHaveBeenCalledWith('Kearney');
//    			expect(controller.locale).toEqual('it works');
//    		}));
//    		
//    		
//    		it('should not set locale with invalid localeName', inject(function(_everestService_, _$routeParams_) {
//    			everestService = _everestService_;
//            	routeParams = _$routeParams_;
//            	routeParams.localeName = 'Unknown';
//            	
//            	spyOn(everestService, 'getLocaleByName')
//	        		.and.returnValue({ 
//	        			then: function(q) { q(undefined); }
//	        		});
//    			
//            	controller = $controller('WallController', { 
//        			everestService	: everestService, 
//        			$routeParams	: routeParams
//        		});
//            	
//    			expect(everestService.getLocaleByName).toHaveBeenCalledWith('Unknown');
//    			expect(controller.locale).toEqual(undefined);
//    		}));
//    		
//    	});
    	
    	describe('getWeatherIcon', function() {
    		
    		beforeEach(inject(function(_everestService_, _$routeParams_) {
    			everestService = _everestService_;
    			routeParams = _$routeParams_;
    			
    			controller = $controller('WallController', {
    				everestService	: everestService,
    				$routeParams 	: routeParams
    			});
    		}));
    		
    		it('should return the correct url when iconName is set', function() {
    			expect(controller.getWeatherIcon('42')).toEqual('http://s.imwx.com/v.20120328.084208/img/wxicon/120/42.png')
    		});
    		
    		it('should return nothing when when iconName is not set', function() {
    			expect(controller.getWeatherIcon()).toEqual(undefined)
    		});
    	});
    	
    	describe('getViews', function() {
    		
    		beforeEach(inject(function(_everestService_, _$routeParams_) {
    			everestService = _everestService_;
    			routeParams = _$routeParams_;
    			
    			controller = $controller('WallController', {
    				everestService	: everestService,
    				$routeParams 	: routeParams
    			});
    		}));
    		
    		it('should return the correct views', function() {
    			var views = controller.getViews();
    			expect(views['greetings']).toEqual('/app/wallboard/views/wall/parts/greetings.html');
    			expect(views['locales']).toEqual('/app/wallboard/views/wall/parts/locales.html');
    			expect(views['localeWeather']).toEqual('/app/wallboard/views/wall/parts/localeWeather.html');
    			expect(views['logoPanel']).toEqual('/app/wallboard/views/wall/parts/logoPanel.html');
    			expect(views['news']).toEqual('/app/wallboard/views/wall/parts/news.html');
    			expect(views['profiles']).toEqual('/app/wallboard/views/wall/parts/profiles.html');
    			expect(views['stocks']).toEqual('/app/wallboard/views/wall/parts/stockTickers.html');
    		});
    	});
    });
    
});