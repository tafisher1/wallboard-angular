var EmployeePage = function () {
    var table = element(by.className('table'));

    this.getPage = function () {
        browser.get('#/employee');
    };

    this.findTableHeader = function (index) {
        return table.all(by.tagName('th')).get(index).getText();
    };

    this.findTableCell = function (row, col) {
        return table.element(by.tagName('tbody')).all(by.tagName('tr')).get(row)
            .all(by.tagName('td')).get(col);
    };

    this.findTableCellText = function (row, col) {
        return this.findTableCell(row, col).getText();
    };

    this.getViewButtonInRow = function (row) {
        return this.findTableCell(row, 4).all(by.className('btn')).get(0);
    };

    this.getDeleteButtonInRow = function (row) {
        return this.findTableCell(row, 4).all(by.className('btn')).get(1);
    };

    this.clickAddEmployeeButton = function () {
        element(by.linkText('New Employee')).click();
    };

};

describe('employee page', function () {
    beforeAll(function () {
        browser.addMockModule('everest.rest.service.mock', function () {
            angular.module('everest.rest.service.mock');
        });
    });

    var employee = new EmployeePage();

    beforeAll(function () {
        employee.getPage();
    });

    describe('summary table', function () {

        it('should have the expected table headers', function () {

            expect(employee.findTableHeader(0)).toEqual('First Name');
            expect(employee.findTableHeader(1)).toEqual('Last Name');
            expect(employee.findTableHeader(2)).toEqual('Title');
            expect(employee.findTableHeader(3)).toEqual('Email');

        });

        it('row 1 should have the expected values', function () {
            checkTableRow(employee, 0);
        });

        it('row 2 should have the expected values', function () {
            checkTableRow(employee, 1);
        });

        it('row 3 should have the expected values', function () {
            checkTableRow(employee, 2);
        });

        it('should go to the add employee page when the add employee link is clicked', function () {
            employee.clickAddEmployeeButton();
            expect(browser.getLocationAbsUrl()).toMatch('/new/employee');
        });

        describe('View Edit Button Action', function () {
            beforeEach(function () {
                employee.getPage();
            });

            it('the first employee button should go to the first employee page', function () {
                employee.getViewButtonInRow(0).click();
                expect(browser.getLocationAbsUrl()).toMatch('/employee/1');
            });

            it('the second employee button should go to the second employee page', function () {
                employee.getViewButtonInRow(1).click();
                expect(browser.getLocationAbsUrl()).toMatch('/employee/2');
            });

            it('the thrid employee button should go to the third employee page', function () {
                employee.getViewButtonInRow(2).click();
                expect(browser.getLocationAbsUrl()).toMatch('/employee/3');
            });
        });

    });
});

function checkTableRow(employee, row) {

    var id = row + 1;
    expect(employee.findTableCellText(row, 0)).toEqual('First' + id);
    expect(employee.findTableCellText(row, 1)).toEqual('Last' + id);
    expect(employee.findTableCellText(row, 2)).toEqual('Title' + id);
    expect(employee.findTableCellText(row, 3)).toEqual('email' + id + '@xpanxion.com');

    expect(employee.getViewButtonInRow(row).getText()).toEqual('View/Edit');
    expect(employee.getViewButtonInRow(row).getAttribute('href')).toMatch(new RegExp('#/employee/' +
         id + '$'));
    expect(employee.getDeleteButtonInRow(row).getText()).toEqual('Delete');
}
