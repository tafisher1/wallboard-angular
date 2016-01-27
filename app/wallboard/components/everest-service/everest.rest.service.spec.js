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
});
