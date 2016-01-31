describe('Everest Rest Service', function () {
    var $httpBackend, getRequestHandler;
    beforeEach(module('everest.rest'));

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;

        getRequestHandler = $httpBackend.whenGET('http://127.0.0.1:8080/api/test',
            function (headers) {
                return headers['X-AUTH-TOKEN'] === '5d89az-x8a7q264-115z9fpq-91acq4';
            }).respond(200, 'test response');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('GET', function() {
    	
        afterEach(function() {
            $httpBackend.flush();
        });

        it('Should return a valid response on get to /test', inject(function (everestService) {
            everestService.get('/test').then(function(data) {
                expect(data).toEqual('test response');
            });
        }));

        it('Should log any errors as an error', inject(function(everestService, $log) {
            getRequestHandler.respond(500, 'anError');

            everestService.get('/test').then(function(data) {
                expect(data).toBeUndefined();
                expect($log.error.logs.length).toEqual(1);
                expect($log.error.logs[0][0].status).toEqual(500);
                expect($log.error.logs[0][0].data).toEqual('anError');
            });

        }));
    });
    
    describe('getAllLocales', function() {
    	
    	afterEach(function() {
            $httpBackend.flush();
        });
    	
    	it('should return all locales', inject(function(everestService) {
    		var fakeResponse = {
    			_embedded: {
    				locales: [{
    					name: 'Locale 1'
    				}, {
    					name: 'Locale 2'
    				}]
    			}
    		};
    		
    		getRequestHandler = $httpBackend
    			.whenGET('http://127.0.0.1:8080/api/data/locales')
				.respond(200, fakeResponse);
    		
    		everestService.getAllLocales().then(function(data) {
    			expect(data).toEqual(fakeResponse._embedded.locales);
    		});
    	}));
    });
    
    describe('getFrom', function() {
    	
    	afterEach(function() {
            $httpBackend.flush();
        });
    	
    	it('should return a valid response to get from valid url', inject(function(everestService) {
	    	everestService.getFrom('http://127.0.0.1:8080/api/test').then(function(data) {
	    		expect(data).toEqual('test response');
	    	});
	    }));
	
    	it('should log any errors as an error', inject(function(everestService, $log) {
    		getRequestHandler = $httpBackend
    			.whenGET('http://fail.me')
    			.respond(500, 'anError');

            everestService.getFrom('http://fail.me').then(function(data) {
                expect(data).toBeUndefined();
                expect($log.error.logs.length).toEqual(1);
                expect($log.error.logs[0][0].status).toEqual(500);
                expect($log.error.logs[0][0].data).toEqual('anError');
            });
    	}));

    });
    
    describe('getLocaleByName', function() {
    	
    	afterEach(function() {
            $httpBackend.flush();
        });
    	
    	it('getLocaleByName', inject(function(everestService) {
    		
    		var fakeResponse = {
	    			_embedded: {
	    				locales: [{
	    					id: 1,
	    					name: 'Ames',
	    				}, {
	    					id: 2,
	    					name: 'Kearney'
	    				}]
	    			}
	    		};
	    		
    		getRequestHandler = $httpBackend
    			.whenGET('http://127.0.0.1:8080/api/data/locales')
				.respond(200, fakeResponse);
	    		
    		everestService.getLocaleByName('Ames').then(function(data) {
    			expect(data).toEqual(fakeResponse._embedded.locales[0]);
    		});
    		
    		everestService.getLocaleByName('Kearney').then(function(data) {
    			expect(data).toEqual(fakeResponse._embedded.locales[1]);
    		});
    	}));
    })
});
