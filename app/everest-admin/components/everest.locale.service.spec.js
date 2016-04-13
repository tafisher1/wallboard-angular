describe('Locale Service', function () {
    beforeEach(module('everest.locale'));

    var everestService;
    beforeEach(inject(function (_everestService_) {
        everestService = _everestService_;
        spyOn(everestService, 'get').and.returnValue('locales');
    }));

    it('listLocales shoulc call /data/locales on the everest service',
        inject(function (localeService) {
            var response = localeService.listLocales();

            expect(response).toEqual('locales');
            expect(everestService.get.calls.count()).toEqual(1);
            expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/locales');
        }));

    it('getlocale should call /dat/locales/:id on the everest service',
        inject(function (localeService) {
            var response = localeService.getLocale(1);
            expect(response).toEqual('locales');
            expect(everestService.get.calls.count()).toEqual(1);
            expect(everestService.get.calls.argsFor(0)[0]).toEqual('/data/locales/1');

        }));

    it('parseIdFromSelfString should pull the ID out of a self url',
        inject(function(localeService) {
            expect(localeService.parseIdFromSelfLink('pin/dkif/sidf/3')).toEqual('3');
        }));

});
