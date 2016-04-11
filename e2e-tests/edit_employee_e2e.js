var EditEmployeePage = function () {

    this.getPage = function (id) {
        browser.get('#/employee/' + id + '/edit');
    };

    this.getBreadCrumb = function () {
        return element(by.className('breadcrumb'));
    };

    this.getBreadCrumbLink = function (index) {
        return this.getBreadCrumb().all(by.tagName('li')).get(index).element(by.tagName('a'));
    };

    this.getCurrentCrumb = function () {
        return this.getBreadCrumb().all(by.tagName('li')).get(2);
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

var editEmployeePage = new EditEmployeePage();

describe('edit employee page', function () {
    beforeAll(function () {
        browser.addMockModule('everest.rest.service.mock', function () {
            angular.module('everest.rest.service.mock');
        });
    });

    describe('View Employee 1', function () {
        var id = 1;
        var newId = 4;

        beforeAll(function () {
            editEmployeePage.getPage(id);
        });

        it('should have expected breadcrumb', function () {
            checkBreadCrumb(id);
        });

        it('should have current employee data loaded', function () {
            checkCurrentData(id);
        });

        it('should have the expected locale options', function () {
            checkLocaleOptions();
        });

        it('should update data as expected and post it correctly', function () {
            updateData(newId);

            //need to check the image scr as it should have updated when the url text field is updated
            expect(editEmployeePage.getImageUrlPreviewSrc()).toMatch('/image/' + newId + '.jpg');

            //Need to check that the Locale was updated correctly
            expect(editEmployeePage.getSelectedLocaleText()).toEqual('Locale' + newId);

            editEmployeePage.clickSaveButton();

            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id);

        });

        it('should go back to the employee page when cancel is clicked', function () {
            editEmployeePage.getPage(id);
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id + '/edit');

            editEmployeePage.clickCancelButton();
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id);

        });

        it('should pop an alert box on failed update and stay on page', function () {
            editEmployeePage.getPage(id);
            var EC = protractor.ExpectedConditions;

            var firstName = editEmployeePage.getFirstNameInput();
            editEmployeePage.updateInputValue(firstName, 'Fail');
            editEmployeePage.clickSaveButton();

            browser.wait(EC.alertIsPresent(), 5000);
            expect(browser.switchTo().alert().getText()).toEqual('Error while saving employee');
            browser.switchTo().alert().dismiss();
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id + '/edit');

        });

    });

    describe('View Employee 2', function () {
        var id = 2;
        var newId = 5;

        beforeAll(function () {
            editEmployeePage.getPage(id);
        });

        it('should have expected breadcrumb', function () {
            checkBreadCrumb(id);
        });

        it('should have current employee data loaded', function () {
            checkCurrentData(id);
        });

        it('should have the expected locale options', function () {
            checkLocaleOptions();
        });

        it('should update data as expected and post it correctly', function () {
            updateData(newId);

            //need to check the image scr as it should have updated when the url text field is updated
            expect(editEmployeePage.getImageUrlPreviewSrc()).toMatch('/image/' + newId + '.jpg');

            //Need to check that the Locale was updated correctly
            expect(editEmployeePage.getSelectedLocaleText()).toEqual('Locale' + newId);

            editEmployeePage.clickSaveButton();

            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id);

        });

        it('should go back to the employee page when cancel is clicked', function () {
            editEmployeePage.getPage(id);
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id + '/edit');

            editEmployeePage.clickCancelButton();
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id);

        });

        it('should pop an alert box on failed update and stay on page', function () {
            editEmployeePage.getPage(id);
            var EC = protractor.ExpectedConditions;

            var firstName = editEmployeePage.getFirstNameInput();
            editEmployeePage.updateInputValue(firstName, 'Fail');
            editEmployeePage.clickSaveButton();

            browser.wait(EC.alertIsPresent(), 5000);
            expect(browser.switchTo().alert().getText()).toEqual('Error while saving employee');
            browser.switchTo().alert().dismiss();
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id + '/edit');

        });

    });

    describe('View Employee 3', function () {
        var id = 3;
        var newId = 6;

        beforeAll(function () {
            editEmployeePage.getPage(id);
        });

        it('should have expected breadcrumb', function () {
            checkBreadCrumb(id);
        });

        it('should have current employee data loaded', function () {
            checkCurrentDataNoImage(id);
        });

        it('should have the expected locale options', function () {
            checkLocaleOptions();
        });

        it('should update data as expected and post it correctly', function () {
            updateData(newId);

            //need to check the image scr as it should have updated when the url text field is updated
            expect(editEmployeePage.getImageUrlPreviewSrc()).toMatch('/image/' + newId + '.jpg');

            //Need to check that the Locale was updated correctly
            expect(editEmployeePage.getSelectedLocaleText()).toEqual('Locale' + newId);

            editEmployeePage.clickSaveButton();

            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id);

        });

        it('should go back to the employee page when cancel is clicked', function () {
            editEmployeePage.getPage(id);
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id + '/edit');

            editEmployeePage.clickCancelButton();
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id);

        });

        it('should pop an alert box on failed update and stay on page', function () {
            editEmployeePage.getPage(id);
            var EC = protractor.ExpectedConditions;

            var firstName = editEmployeePage.getFirstNameInput();
            editEmployeePage.updateInputValue(firstName, 'Fail');
            editEmployeePage.clickSaveButton();

            browser.wait(EC.alertIsPresent(), 5000);
            expect(browser.switchTo().alert().getText()).toEqual('Error while saving employee');
            browser.switchTo().alert().dismiss();
            expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id + '/edit');

        });

    });

    function updateData(newId) {

        var item = editEmployeePage.getFirstNameInput();
        editEmployeePage.updateInputValue(item, 'First' + newId);

        item = editEmployeePage.getLastNameInput();
        editEmployeePage.updateInputValue(item, 'Last' + newId);

        item = editEmployeePage.getTitleInput();
        editEmployeePage.updateInputValue(item, 'Title' + newId);

        item = editEmployeePage.getBiographyInput();
        editEmployeePage.updateInputValue(item, 'Bio' + newId);

        editEmployeePage.selectLocaleWithIndex(newId);

        item = editEmployeePage.getEmailInput();
        editEmployeePage.updateInputValue(item, 'Email' + newId + '@xpanxion.com');

        item = editEmployeePage.getWorkPhoneInput();
        editEmployeePage.updateInputValue(item, 'Work Phone' + newId);

        item = editEmployeePage.getCellPhoneInput();
        editEmployeePage.updateInputValue(item, 'Cell Phone' + newId);

        item = editEmployeePage.getImageUrlInput();
        editEmployeePage.updateInputValue(item, 'http://127.0.0.1:8080/image/' + newId + '.jpg');
    }

    function checkLocaleOptions() {
        var options = editEmployeePage.getLocaleOptions();
        for (var option in options) {
            if (true) {
                var id = option + 1;
                expect(options[option].label).toEqual('Locale' + id);
                expect(options[option].value).
                    toEqual('http://127.0.0.1:8080/api/data/locales/' + id);
            }
        }
    }

    function checkCurrentData(id) {
        var item = editEmployeePage.getFirstNameInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('First' + id);

        item = editEmployeePage.getLastNameInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Last' + id);

        item = editEmployeePage.getTitleInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Title' + id);

        item = editEmployeePage.getBiographyInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Bio' + id);
        expect(editEmployeePage.getSelectedLocaleText()).toEqual('Locale' + id);

        item = editEmployeePage.getEmailInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Email' + id + '@Xpanxion.com');

        item = editEmployeePage.getWorkPhoneInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Work Phone' + id);

        item = editEmployeePage.getCellPhoneInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Cell Phone' + id);

        item = editEmployeePage.getImageUrlInput();
        expect(editEmployeePage.getInputValue(item))
            .toEqual('http://127.0.0.1:8080/image/' + id + '.jpg');
        expect(editEmployeePage.getImageUrlPreviewSrc())
            .toMatch('http://127.0.0.1:8080/image/' + id + '.jpg');
    }

    function checkCurrentDataNoImage(id) {
        var item = editEmployeePage.getFirstNameInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('First' + id);

        item = editEmployeePage.getLastNameInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Last' + id);

        item = editEmployeePage.getTitleInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Title' + id);

        item = editEmployeePage.getBiographyInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Bio' + id);
        expect(editEmployeePage.getSelectedLocaleText()).toEqual('Locale' + id);

        item = editEmployeePage.getEmailInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Email' + id + '@Xpanxion.com');

        item = editEmployeePage.getWorkPhoneInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Work Phone' + id);

        item = editEmployeePage.getCellPhoneInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('Cell Phone' + id);

        item = editEmployeePage.getImageUrlInput();
        expect(editEmployeePage.getInputValue(item)).toEqual('');
        expect(editEmployeePage.getImageUrlPreviewSrc()).toBeNull();
    }

    function checkBreadCrumb(id) {

        var employeesCrumb = editEmployeePage.getBreadCrumbLink(0);
        expect(employeesCrumb.getText()).toEqual('Employees');
        expect(employeesCrumb.getAttribute('href')).toMatch('#/employee');

        var employeeCrumb = editEmployeePage.getBreadCrumbLink(1);
        expect(employeeCrumb.getText()).toEqual('First' + id + ' Last' + id);
        expect(employeeCrumb.getAttribute('href')).toMatch('#/employee/' + id);

        var currentCrumb = editEmployeePage.getCurrentCrumb();
        expect(currentCrumb.getAttribute('class')).toMatch('active');
        expect(currentCrumb.getText()).toEqual('Edit');

    }
});
