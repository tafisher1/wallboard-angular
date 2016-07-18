describe('ViewLocaleController', function() {
    beforeEach(module('locale.view'));

    var $routeParams = {
        id:'123'
    };

    var data = {
        newsKeywords:'news1,news2,news3',
        stockSymbols:'stock1,stock2,stock3'
    };

    var localeService;
    beforeEach(inject(function(_localeService_) {
        localeService = _localeService_;
        spyOn(localeService, 'getLocale').and.returnValue({
            then: function(callback) {
                callback(data);
            }
        });
    }));

    var viewController;
    beforeEach(inject(function($controller) {
        viewController = $controller('ViewLocaleController', {

            $routeParams: $routeParams,
            localeService:localeService
        });

    }));

    describe ('inital state', function() {
        it('should have called the locale service with the id', function() {
            expect(localeService.getLocale.calls.count()).toEqual(1);
            expect(localeService.getLocale.calls.argsFor(0)[0]).toEqual('123');
        });

        it('should have expected data value', function() {
            expect(viewController.data).toEqual(data);
        });

        it('should have expected id value', function() {
            expect(viewController.id).toEqual('123');
        });

        it('should have expected news keywords', function() {
            expect(viewController.newsKeywords[0]).toEqual('news1');
            expect(viewController.newsKeywords[1]).toEqual('news2');
            expect(viewController.newsKeywords[2]).toEqual('news3');

        });

        it('should have expected stocks', function() {
            expect(viewController.stocks[0]).toEqual('stock1');
            expect(viewController.stocks[1]).toEqual('stock2');
            expect(viewController.stocks[2]).toEqual('stock3');
        });

    });
});
