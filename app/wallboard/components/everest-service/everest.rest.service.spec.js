describe('Everest Rest Service', function () {
    var $httpBackend, getRequestHandler, putRequestHandler, postRequestHandler;
    beforeEach(module('everest.rest'));

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;

        getRequestHandler = $httpBackend.whenGET('http://127.0.0.1:8080/api/test',
            function (headers) {
                return headers['X-AUTH-TOKEN'] === 'ad3dfe-1d5a8d7e-d8a7d8e9-dadadw';
            }).respond(200, 'test response');

        putRequestHandler = $httpBackend.whenPUT('http://127.0.0.1:8080/api/test',
                function (headers) {
                    return headers['X-AUTH-TOKEN'] === 'ad3dfe-1d5a8d7e-d8a7d8e9-dadadw';
                }).respond(200, 'test put response');

        postRequestHandler = $httpBackend.whenPOST('http://127.0.0.1:8080/api/test',
                function (headers) {
                    return headers['X-AUTH-TOKEN'] === 'ad3dfe-1d5a8d7e-d8a7d8e9-dadadw';
                }).respond(200, 'test post response');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('GET', function () {

        afterEach(function () {
            $httpBackend.flush();
        });

        it('Should return a valid response on get to /test', inject(function (everestService) {
            everestService.get('/test').then(function (data) {
                expect(data).toEqual('test response');
            });
        }));

        it('Should log any errors as an error', inject(function (everestService, $log) {
            getRequestHandler.respond(500, 'anError');

            everestService.get('/test').then(function (data) {
                expect(data).toBeUndefined();
                expect($log.error.logs.length).toEqual(1);
                expect($log.error.logs[0][0].status).toEqual(500);
                expect($log.error.logs[0][0].data).toEqual('anError');

            });

        }));
    });

    describe('PUT', function () {

        afterEach(function () {
            $httpBackend.flush();
        });

        it('Should return a valid response on get to /test', inject(function (everestService) {
            everestService.put('/test').then(function (data) {
                expect(data).toEqual('test put response');
            });
        }));

        it('Should log any errors as an error', inject(function (everestService, $log) {
            putRequestHandler.respond(500, 'anError');

            everestService.put('/test').then(function (data) {
                expect(data).toBeUndefined();
                expect($log.error.logs.length).toEqual(1);
                expect($log.error.logs[0][0].status).toEqual(500);
                expect($log.error.logs[0][0].data).toEqual('anError');

            });

        }));
    });

    describe('POST', function () {

        afterEach(function () {
            $httpBackend.flush();
        });

        it('Should return a valid response on get to /test', inject(function (everestService) {
            everestService.post('/test').then(function (data) {
                expect(data).toEqual('test post response');
            });
        }));

        it('Should log any errors as an error', inject(function (everestService, $log) {
            postRequestHandler.respond(500, 'anError');

            everestService.post('/test').then(function (data) {
                expect(data).toBeUndefined();
                expect($log.error.logs.length).toEqual(1);
                expect($log.error.logs[0][0].status).toEqual(500);
                expect($log.error.logs[0][0].data).toEqual('anError');

            });

        }));
    });

});
