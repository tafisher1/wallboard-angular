var EmployeePage = function() {
    var table = element(by.className('table'));

    this.getPage = function() {
        browser.get('#/employee');
    };

    this.findTableHeader = function(index) {
        return table.all(by.tagName('th')).get(index).getText();
    };

    this.findTableCell = function (row, col) {
        return table.element(by.tagName('tbody')).all(by.tagName('tr')).get(row)
            .all(by.tagName('td')).get(col);
    };

    this.findTableCellText = function(row, col) {
        return this.findTableCell(row, col).getText();
    };

};

describe('employee page', function() {
    beforeEach(function() {
        browser.addMockModule('everest.rest.service.mock', function () {
            angular.module('everest.rest.service.mock');
        });
    });

    var employee = new EmployeePage();

    describe('summary table', function() {

        it('should have the expected table headers', function() {
            employee.getPage();

            expect(employee.findTableHeader(0)).toEqual('First Name');
            expect(employee.findTableHeader(1)).toEqual('Last Name');
            expect(employee.findTableHeader(2)).toEqual('Title');
            expect(employee.findTableHeader(3)).toEqual('Email');

        });

        it('row 1 should have the expected values', function() {
            employee.getPage();

            expect(employee.findTableCellText(0,0)).toEqual('First1');
            expect(employee.findTableCellText(0,1)).toEqual('Last1');
            expect(employee.findTableCellText(0,2)).toEqual('Title1');
            expect(employee.findTableCellText(0,3)).toEqual('email1');

            var buttonCell = employee.findTableCell(0,4);
            expect(buttonCell.all(by.tagName('button')).get(0).getText()).toEqual('View/Edit');
            expect(buttonCell.all(by.tagName('button')).get(1).getText()).toEqual('Delete');
        });

        it('row 2 should have the expected values', function() {
            employee.getPage();

            expect(employee.findTableCellText(1,0)).toEqual('First2');
            expect(employee.findTableCellText(1,1)).toEqual('Last2');
            expect(employee.findTableCellText(1,2)).toEqual('Title2');
            expect(employee.findTableCellText(1,3)).toEqual('email2');

            var buttonCell = employee.findTableCell(1,4);
            expect(buttonCell.all(by.tagName('button')).get(0).getText()).toEqual('View/Edit');
            expect(buttonCell.all(by.tagName('button')).get(1).getText()).toEqual('Delete');
        });

        it('row 3 should have the expected values', function() {
            employee.getPage();

            expect(employee.findTableCellText(2,0)).toEqual('First3');
            expect(employee.findTableCellText(2,1)).toEqual('Last3');
            expect(employee.findTableCellText(2,2)).toEqual('Title3');
            expect(employee.findTableCellText(2,3)).toEqual('email3');

            var buttonCell = employee.findTableCell(2,4);
            expect(buttonCell.all(by.tagName('button')).get(0).getText()).toEqual('View/Edit');
            expect(buttonCell.all(by.tagName('button')).get(1).getText()).toEqual('Delete');
        });

    });
});
