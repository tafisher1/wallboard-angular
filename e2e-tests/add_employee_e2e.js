var AddEmployeePage = function () {

    this.getPage = function (id) {
        browser.get('#/new/employee/');
    };

    this.getBreadCrumb = function () {
        return element(by.className('breadcrumb'));
    };

    this.getBreadCrumbLink = function (index) {
        return this.getBreadCrumb().all(by.tagName('li')).get(index).element(by.tagName('a'));
    };

    this.getCurrentCrumb = function () {
        return this.getBreadCrumb().all(by.tagName('li')).get(1);
    };

    this.getInputValue = function (input) {
        return input.getAttribute('value');
    };

    this.updateInputValue = function (input, value) {
        input.clear().then(function () {
            input.sendKeys(value);
        });
    };

    //First Name
    this.getFirstNameInput = function () {
        return element(by.id('firstName'));
    };

    //lastName
    this.getLastNameInput = function () {
        return element(by.id('lastName'));
    };

    //title
    this.getTitleInput = function () {
        return element(by.id('title'));
    };

    //Biography
    this.getBiographyInput = function () {
        return element(by.id('biography'));
    };

    //Email
    this.getEmailInput = function () {
        return element(by.id('email'));
    };

    //Work Phone
    this.getWorkPhoneInput = function () {
        return element(by.id('workPhone'));
    };

    //Cell Phone
    this.getCellPhoneInput = function () {
        return element(by.id('cellPhone'));
    };

    this.getImageUrlInput = function () {
        return element(by.id('imageUrl'));
    };

    this.getImageUrlPreview = function () {
        return element(by.id('imgDisplay'));
    };

    this.getImageUrlPreviewSrc = function () {
        return this.getImageUrlPreview().getAttribute('src');
    };

    this.getOptionItems = function () {
        return this.getLocaleSelectInput().all(by.tagName('option'));
    };

    this.getLocaleOptions = function () {
        var output = [];
        this.getOptionItems().each(function (element, index) {
            var item = {
                label: element.getAttribute('label'),
                value: element.getAttribute('value'),
            };
            output[index] = item;
        });

        return output;
    };

    this.getSelectedLocale = function () {
        return this.getOptionItems().filter(function (element, index) {
            return element.isSelected();

        }).first();

    };

    this.getSelectedLocaleText = function () {
        return this.getSelectedLocale().getAttribute('label');
    };

    this.selectLocaleWithIndex = function (id) {
        var options = this.getLocaleSelectInput().all(by.tagName('option')).get(id - 1).click();
    };

    this.getLocaleSelectInput = function () {
        return element(by.id('locale'));
    };

    this.clickSaveButton = function () {
        element(by.buttonText('Save')).click();
    };

    this.clickCancelButton = function () {
        element(by.linkText('Cancel')).click();
    };
};

var addEmployeePage = new AddEmployeePage();

describe('add employee page', function () {
    beforeAll(function () {
        browser.addMockModule('everest.rest.service.mock', function () {
            angular.module('everest.rest.service.mock');
        });
    });

    beforeAll(function () {
        addEmployeePage.getPage();
    });

    it('should have expected breadcrumb', function () {
        checkBreadCrumb();
    });

    it('should have no employee data loaded', function () {
        checkCurrentData();
    });

    it('should have the expected locale options', function () {
        checkLocaleOptions();
    });

    it('should update data as expected and post it correctly', function () {
        updateData(1);

        //need to check the image scr as it should have updated when the url text field is updated
        expect(addEmployeePage.getImageUrlPreviewSrc()).toMatch('/image/1.jpg');

        //Need to check that the Locale was updated correctly
        expect(addEmployeePage.getSelectedLocaleText()).toEqual('Locale1');

        addEmployeePage.clickSaveButton();
        expect(browser.getLocationAbsUrl()).toMatch('/employee/1');

    });

    it('should go back to the employee page when cancel is clicked', function () {
        addEmployeePage.getPage();
        expect(browser.getLocationAbsUrl()).toMatch('/new/employee');

        addEmployeePage.clickCancelButton();
        expect(browser.getLocationAbsUrl()).toMatch('/employee');

    });

    it('should pop an alert box on failed update and stay on page', function () {
        addEmployeePage.getPage();
        var EC = protractor.ExpectedConditions;

        var firstName = addEmployeePage.getFirstNameInput();
        addEmployeePage.updateInputValue(firstName, 'Fail');
        addEmployeePage.clickSaveButton();

        browser.wait(EC.alertIsPresent(), 5000);
        expect(browser.switchTo().alert().getText()).toEqual('Error while adding employee');
        browser.switchTo().alert().dismiss();
        expect(browser.getLocationAbsUrl()).toMatch('/new/employee');
    });

    function updateData() {

        var item = addEmployeePage.getFirstNameInput();
        addEmployeePage.updateInputValue(item, 'First1');

        item = addEmployeePage.getLastNameInput();
        addEmployeePage.updateInputValue(item, 'Last1');

        item = addEmployeePage.getTitleInput();
        addEmployeePage.updateInputValue(item, 'Title1');

        item = addEmployeePage.getBiographyInput();
        addEmployeePage.updateInputValue(item, 'Bio1');

        addEmployeePage.selectLocaleWithIndex(2);

        item = addEmployeePage.getEmailInput();
        addEmployeePage.updateInputValue(item, 'Email1@xpanxion.com');

        item = addEmployeePage.getWorkPhoneInput();
        addEmployeePage.updateInputValue(item, 'Work Phone1');

        item = addEmployeePage.getCellPhoneInput();
        addEmployeePage.updateInputValue(item, 'Cell Phone1');

        item = addEmployeePage.getImageUrlInput();
        addEmployeePage.updateInputValue(item, 'http://127.0.0.1:8080/image/1.jpg');
    }

    function checkLocaleOptions() {
        var options = addEmployeePage.getLocaleOptions();
        for (var option in options) {
            if (true) {
                var id = option + 1;
                expect(options[option].label).toEqual('Locale' + id);
                expect(options[option].value).
                    toEqual('http://127.0.0.1:8080/api/data/locales/' + id);
            }
        }
    }

    function checkCurrentData() {
        var item = addEmployeePage.getFirstNameInput();
        expect(addEmployeePage.getInputValue(item)).toEqual('');

        item = addEmployeePage.getLastNameInput();
        expect(addEmployeePage.getInputValue(item)).toEqual('');

        item = addEmployeePage.getTitleInput();
        expect(addEmployeePage.getInputValue(item)).toEqual('');

        item = addEmployeePage.getBiographyInput();
        expect(addEmployeePage.getInputValue(item)).toEqual('');
        expect(addEmployeePage.getSelectedLocaleText()).toEqual('');

        item = addEmployeePage.getEmailInput();
        expect(addEmployeePage.getInputValue(item)).toEqual('');

        item = addEmployeePage.getWorkPhoneInput();
        expect(addEmployeePage.getInputValue(item)).toEqual('');

        item = addEmployeePage.getCellPhoneInput();
        expect(addEmployeePage.getInputValue(item)).toEqual('');

        item = addEmployeePage.getImageUrlInput();
        expect(addEmployeePage.getInputValue(item))
            .toEqual('');
        expect(addEmployeePage.getImageUrlPreviewSrc())
            .toMatch('');
    }

    function checkBreadCrumb(id) {

        var employeesCrumb = addEmployeePage.getBreadCrumbLink(0);
        expect(employeesCrumb.getText()).toEqual('Employees');
        expect(employeesCrumb.getAttribute('href')).toMatch('#/employee');

        var currentCrumb = addEmployeePage.getCurrentCrumb();
        expect(currentCrumb.getAttribute('class')).toMatch('active');
        expect(currentCrumb.getText()).toEqual('Add');

    }
});
