describe('Locale Service', function () {
    beforeEach(module('everest.locale'));

    beforeEach(inject(function (everestService) {
        spyOn(everestService, 'get').and.returnValue('locales');
    }));

    it('listLocales shoulc call /data/locales on the everest service',
        inject(function (everestService, localeService) {
            var response = localeService.listLocales();

            expect(response).toEqual('locales');
            expect(everestService.get.calls.count()).toEqual(1);
            expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/locales');
        }));

});
