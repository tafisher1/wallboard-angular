describe ('LocalesController', function() {
    beforeEach(module('locale.view'));

    var localesOut = ['locale1', 'locale2'];

    var localeService;
    beforeEach(inject(function (_localeService_) {
        localeService = _localeService_;
        spyOn(localeService, 'listLocales').and.returnValue({
            then: function (callback) {
                callback({
                    _embedded:{
                        locales:localesOut
                    }
                });
            }
        });
    }));

    var localesController;
    beforeEach(inject(function($controller) {
        localesController = $controller('LocalesController');
    }));

    describe('inital state', function() {
        it('should have data loaded from locale service', function() {
            expect(localesController.data).toEqual(localesOut);
        });
    });
});
