
var HomePage = function () {
    var navBar = element(by.className('navbar-nav'));

    this.get = function () {
        browser.get('index.html');
    };

    this.getActiveNavBarItem = function () {
        return navBar.element(by.className('active'));
    };

    this.getActiveNavBarItemText = function () {
        return this.getActiveNavBarItem().element(by.tagName('a')).getText();
    };

    this.selectNavBarItemIdentifedBy = function (name) {
        navBar.all(by.tagName('li')).each(function (item) {
            item.element(by.tagName('a')).getText().then(function (elementName) {
                if (elementName === name) {
                    item.click();
                }
            });
        });
    };

    this.clickEmployeesButton = function () {
        element(by.className('btn-group-vertical')).element(by.linkText('Employees')).click();
    };

    this.clickHomeButton = function () {
        element(by.className('btn-group-vertical')).element(by.linkText('Home')).click();
    };

    this.getCurrentUrl = function () {
        return browser.getLocationAbsUrl();
    };

    this.checkForCurrentUrl = function (urlPart) {
        expect(this.getCurrentUrl()).toMatch(urlPart);
    };

};

describe('home page', function () {
    beforeEach(function () {
        browser.addMockModule('everest.rest.service.mock', function () {
            angular.module('everest.rest.service.mock');
        });
    });

    var home = new HomePage();

    it('should automatically redirect to /home when the location is empty', function () {
        home.get();
        home.checkForCurrentUrl('/home');
    });

    describe('navigation bar', function () {
        beforeEach(function () {
            home.get();
        });

        it('should start with home navigation selected', function () {
            expect(home.getActiveNavBarItemText()).toEqual('Home');
        });

        it('should switch selected item when nav bar is clicked', function () {
            home.selectNavBarItemIdentifedBy('Employees');
            expect(home.getActiveNavBarItemText()).toEqual('Employees');
            home.checkForCurrentUrl('/employee');

            home.selectNavBarItemIdentifedBy('Home');
            expect(home.getActiveNavBarItemText()).toEqual('Home');
            home.checkForCurrentUrl('/home');

        });

        it('selected navbar item should switch when buttons in home page are clicked.',
         function () {
            home.clickEmployeesButton();
            expect(home.getActiveNavBarItemText()).toEqual('Employees');
            home.checkForCurrentUrl('/employee');

            home.get();
            home.clickHomeButton();
            expect(home.getActiveNavBarItemText()).toEqual('Home');
            home.checkForCurrentUrl('/home');

        });
    });

});
