var ViewEmployeePage = function () {

    this.getPage = function (id) {
        browser.get('#/employee/' + id);
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

    this.getPersonalInfoSection = function () {
        return element(by.id('personalInfo'));
    };

    this.getPersonalInfoHeader = function () {
        return this.getPersonalInfoSection().element(by.tagName('H2'));
    };

    this.getTitleField = function () {
        return this.getPersonalInfoSection().element(by.id('title'));
    };

    this.getBiographyField = function () {
        return this.getPersonalInfoSection().element(by.id('biography'));
    };

    this.getContactInfoSection = function () {
        return element(by.id('contactInfo'));
    };

    this.getContactInfoHeader = function () {
        return this.getContactInfoSection().element(by.tagName('H2'));
    };

    this.getLocationField = function () {
        return this.getContactInfoSection().element(by.id('location'));
    };

    this.getEmailField = function () {
        return this.getContactInfoSection().element(by.id('email'));
    };

    this.getWorkPhoneField = function () {
        return this.getContactInfoSection().element(by.id('workPhone'));
    };

    this.getCellPhoneField = function () {
        return this.getContactInfoSection().element(by.id('cellPhone'));
    };

    this.getImageSection = function () {
        return element(by.id('imageSection'));
    };

    this.getEmployeeImage = function () {
        return this.getImageSection().element(by.tagName('img'));
    };

    this.getImageUrlField = function () {
        return this.getImageSection().element(by.id('imageUrl'));
    };

    this.getImageUrlFieldLink = function () {
        return this.getImageUrlField().element(by.tagName('a'));
    };

    this.clickEditButton = function () {
        this.clickHeaderButton();
        this.getPageHeaderDropDownEditButton().click();
    };

};

var viewEmployeePage = new ViewEmployeePage();

describe('View Employee Page', function () {
    beforeAll(function () {
        browser.addMockModule('everest.rest.service.mock', function () {
            angular.module('everest.rest.service.mock');
        });
    });

    describe('View Employee 1', function () {
        beforeAll(function () {
            viewEmployeePage.getPage(1);
        });

        it('has a breadcrumb as expected', function () {
            checkBreadCrumb(1);
        });

        it('has the expected page header', function () {
            checkPageHeader(1);
        });

        it('has the expected persional info section', function () {
            checkPersonalInfoSection(1);
        });

        it('has the expected contact info section', function () {
            checkContactInfoSection(1);
        });

        it('has the expected image section', function () {
            checkImageSectionWithUrl(1);
        });

        it('goes to the edit page when edit button is clicked', function () {
            checkNavigationToEdit(1);
        });
    });

    describe('View Employee 2', function () {
        beforeAll(function () {
            viewEmployeePage.getPage(2);
        });

        it('has a breadcrumb as expected', function () {
            checkBreadCrumb(2);
        });

        it('has the expected page header', function () {
            checkPageHeader(2);
        });

        it('has the expected persional info section', function () {
            checkPersonalInfoSection(2);
        });

        it('has the expected contact info section', function () {
            checkContactInfoSection(2);
        });

        it('has the expected image section', function () {
            checkImageSectionWithUrl(2);
        });

        it('goes to the edit page when edit button is clicked', function () {
            checkNavigationToEdit(2);
        });

    });

    describe('View Employee 3', function () {
        beforeAll(function () {
            viewEmployeePage.getPage(3);
        });

        it('has a breadcrumb as expected', function () {
            checkBreadCrumb(3);
        });

        it('has the expected page header', function () {
            checkPageHeader(3);
        });

        it('has the expected persional info section', function () {
            checkPersonalInfoSection(3);
        });

        it('has the expected contact info section', function () {
            checkContactInfoSection(3);
        });

        it('has the expected image section', function () {
            checkImageSectionWithOutUrl();
        });

        it('goes to the edit page when edit button is clicked', function () {
            checkNavigationToEdit(3);
        });

    });

    function checkImageSectionWithOutUrl() {
        expect(viewEmployeePage.getEmployeeImage().getAttribute('src'))
            .toMatch('/images/person.jpg');
        expect(viewEmployeePage.getImageUrlField().getText())
            .toEqual('Image Url :');
        expect(viewEmployeePage.getImageUrlFieldLink().isPresent()).toEqual(false);
    }

    function checkImageSectionWithUrl(id) {
        expect(viewEmployeePage.getEmployeeImage().getAttribute('src'))
            .toMatch('/image/' + id + '.jpg');
        expect(viewEmployeePage.getImageUrlField().getText())
            .toEqual('Image Url : http://127.0.0.1:8080/image/' + id + '.jpg');
        expect(viewEmployeePage.getImageUrlFieldLink().getAttribute('href'))
            .toMatch('/image/' + id + '.jpg');
    }

    function checkContactInfoSection(id) {
        expect(viewEmployeePage.getContactInfoHeader().getText()).toEqual('Contact Info');
        expect(viewEmployeePage.getLocationField().getText()).toEqual('Location : Locale' + id);
        expect(viewEmployeePage.getEmailField().getText())
            .toEqual('Email : Email' + id + '@Xpanxion.com');
        expect(viewEmployeePage.getWorkPhoneField().getText())
            .toEqual('Work Phone : Work Phone' + id);
        expect(viewEmployeePage.getCellPhoneField().getText())
            .toEqual('Cell Phone : Cell Phone' + id);
    }

    function checkPersonalInfoSection(id) {
        expect(viewEmployeePage.getPersonalInfoHeader().getText()).toEqual('Personal Info');
        expect(viewEmployeePage.getTitleField().getText()).toEqual('Title : Title' + id);
        expect(viewEmployeePage.getBiographyField().getText()).toEqual('Biography : Bio' + id);
    }

    function checkPageHeader(id) {
        expect(viewEmployeePage.getHeaderButton().getText()).toEqual('First' + id + ' Last' + id);

        //On page Load we expect that the drop down items are not shown.
        expect(viewEmployeePage.getPageHeaderDropDownEditButton().isDisplayed()).toEqual(false);
        expect(viewEmployeePage.getPageHeaderDropDownDeleteButton().isDisplayed()).toEqual(false);

        //after clicking on the user's name we expect that the drop down will be shown;
        viewEmployeePage.clickHeaderButton();

        expect(viewEmployeePage.getPageHeaderDropDownEditButton().isDisplayed()).toEqual(true);
        expect(viewEmployeePage.getPageHeaderDropDownDeleteButton().isDisplayed()).toEqual(true);
        expect(viewEmployeePage.getPageHeaderDropDownEditButton().getText()).toEqual('Edit');
        expect(viewEmployeePage.getPageHeaderDropDownEditButton().getAttribute('href'))
            .toMatch('#/employee/' + id + '/edit');
        expect(viewEmployeePage.getPageHeaderDropDownDeleteButton().getText()).toEqual('Delete');

        //clicking the user's name again will close the drop down.
        viewEmployeePage.clickHeaderButton();
        expect(viewEmployeePage.getPageHeaderDropDownEditButton().isDisplayed()).toEqual(false);
        expect(viewEmployeePage.getPageHeaderDropDownDeleteButton().isDisplayed()).toEqual(false);

    }

    function checkNavigationToEdit(id) {
        viewEmployeePage.clickEditButton();
        expect(browser.getLocationAbsUrl()).toMatch('/employee/' + id + '/edit');
    }

    function checkBreadCrumb(id) {

        var employeeCrumb = viewEmployeePage.getBreadCrumbRootLink();
        expect(employeeCrumb.getText()).toEqual('Employee');
        expect(employeeCrumb.getAttribute('href')).toMatch('#/employee');

        var currentCrumb = viewEmployeePage.getCurrentCrumb();
        expect(currentCrumb.getAttribute('class')).toMatch('active');
        expect(currentCrumb.getText()).toEqual('First' + id + ' Last' + id);

    }
});
