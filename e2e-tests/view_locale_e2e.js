var ViewLocalePage = function() {

    this.getPage = function (id) {
        browser.get('#/locale/' + id);
    };

    this.getBreadCrumb = function () {
        return element(by.className('breadcrumb'));
    };

    this.getBreadCrumbRootLink = function () {
        return this.getBreadCrumb().all(by.tagName('li')).get(0).element(by.tagName('a'));
    };

    this.getCurrentCrumb = function () {
        return this.getBreadCrumb().all(by.tagName('li')).get(1);
    };

    this.getPageHeader = function () {
        return element(by.className('page-header'));
    };

    this.getHeaderButton = function () {
        return this.getPageHeader().element(by.tagName('button'));
    };

    this.getCode = function() {
        return element(by.id('code'));
    };

    this.getMessage = function() {
        return element(by.id('message'));
    };

    this.getTimeZone = function() {
        return element(by.id('timeZone'));
    };

    this.getWeatherCode = function() {
        return element(by.id('weatherCode'));
    };

    this.getThemeName = function() {
        return element(by.id('themeName'));
    };

    this.getThemeDescription = function() {
        return element(by.id('themeDescription'));
    };

    this.getBackgroundImage = function() {
        return element(by.id('bgimage'));
    };

    this.getBackgroundUrl = function() {
        return element(by.id('imageUrl'));
    };

    this.getNewsKeywords = function() {
        return element(by.id('news')).all(by.tagName('li'));
    };

    this.getStocks = function() {
        return element(by.id('stocks')).all(by.tagName('li'));
    };

    this.getHeaderDropDown = function () {
        return this.getPageHeader().element(by.tagName('ul'));
    };

    this.getPageHeaderDropDownEditButton = function () {
        return this.getHeaderDropDown().all(by.tagName('a')).get(0);
    };

    this.getPageHeaderDropDownDeleteButton = function () {
        return this.getHeaderDropDown().all(by.tagName('a')).get(1);
    };

    this.clickHeaderButton = function () {
        this.getHeaderButton().click();
    };
};

var viewLocalePage = new ViewLocalePage();
describe('view locale page', function() {
    beforeAll(function () {
        browser.addMockModule('everest.rest.service.mock', function () {
            angular.module('everest.rest.service.mock');
        });
    });

    it('locale 1 should have expected content', function () {
        viewLocalePage.getPage(1);
        checkLocaleView(1);
    });

    it('locale 2 should have expected content', function () {
        viewLocalePage.getPage(2);
        checkLocaleView(2);
    });

    it('locale 3 should have expected content', function () {
        viewLocalePage.getPage(3);
        checkLocaleView(3);
    });

    it('locale 4 should have expected content', function () {
        viewLocalePage.getPage(4);
        checkLocaleView(4);
    });

    it('locale 5 should have expected content', function () {
        viewLocalePage.getPage(5);
        checkLocaleView(5);
    });

    it('locale 6 should have expected content', function () {
        viewLocalePage.getPage(6);
        checkLocaleView(6);
    });
});

function checkLocaleView(id) {
    checkBreadCrumb(id);
    checkPageHeader(id);
    checkPageData(id);
}

function checkPageHeader(id) {
    expect(viewLocalePage.getHeaderButton().getText()).toEqual('Locale' + id);

    //On page Load we expect that the drop down items are not shown.
    expect(viewLocalePage.getPageHeaderDropDownEditButton().isDisplayed()).toEqual(false);
    expect(viewLocalePage.getPageHeaderDropDownDeleteButton().isDisplayed()).toEqual(false);

    //after clicking on the user's name we expect that the drop down will be shown;
    viewLocalePage.clickHeaderButton();

    expect(viewLocalePage.getPageHeaderDropDownEditButton().isDisplayed()).toEqual(true);
    expect(viewLocalePage.getPageHeaderDropDownDeleteButton().isDisplayed()).toEqual(true);
    expect(viewLocalePage.getPageHeaderDropDownEditButton().getText()).toEqual('Edit');
    expect(viewLocalePage.getPageHeaderDropDownDeleteButton().getText()).toEqual('Delete');

    //clicking the user's name again will close the drop down.
    viewLocalePage.clickHeaderButton();
    expect(viewLocalePage.getPageHeaderDropDownEditButton().isDisplayed()).toEqual(false);
    expect(viewLocalePage.getPageHeaderDropDownDeleteButton().isDisplayed()).toEqual(false);
}

function checkPageData(id) {
    expect(viewLocalePage.getHeaderButton().getText()).toEqual('Locale' + id);
    expect(viewLocalePage.getCode().getText()).toEqual('Code : Code' + id);
    expect(viewLocalePage.getMessage().getText()).toEqual('Message : Greeting' + id);
    expect(viewLocalePage.getTimeZone().getText()).toEqual('Time Zone: timezone' + id);
    expect(viewLocalePage.getWeatherCode().getText()).toEqual('Weather Code : weather' + id);

    var newsItems = viewLocalePage.getNewsKeywords();
    expect(newsItems.count()).toEqual(3);
    expect(newsItems.get(0).getText()).toEqual('news' + id + '1');
    expect(newsItems.get(1).getText()).toEqual('news' + id + '2');
    expect(newsItems.get(2).getText()).toEqual('news' + id + '3');

    var stocks = viewLocalePage.getStocks();
    expect(stocks.count()).toEqual(3);
    expect(stocks.get(0).getText()).toEqual('stock' + id + '1');
    expect(stocks.get(1).getText()).toEqual('stock' + id + '2');
    expect(stocks.get(2).getText()).toEqual('stock' + id + '3');

    expect(viewLocalePage.getThemeName().getText()).toEqual('Name : theme' + id);
    expect(viewLocalePage.getThemeDescription().getText())
        .toEqual('Description : description' + id);

    expect(viewLocalePage.getBackgroundImage().getAttribute('src'))
        .toEqual('http://127.0.0.1:8080/image/' + id + '.jpg');

    expect(viewLocalePage.getBackgroundUrl().getText())
        .toEqual('Image Url : http://127.0.0.1:8080/image/' + id + '.jpg');

}

function checkBreadCrumb(id) {
    var root = viewLocalePage.getBreadCrumbRootLink(id);
    expect(root.getText()).toEqual('Locales');
    expect(root.getAttribute('href')).toMatch('#/locales');

    var currentCrumb = viewLocalePage.getCurrentCrumb();
    expect(currentCrumb.getText()).toEqual('Locale' + id);
}
