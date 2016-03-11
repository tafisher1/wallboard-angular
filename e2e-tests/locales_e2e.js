var Locales = function () {
    var table = element(by.className('table'));

    this.get = function () {
        browser.get('#/locales');
    };

    this.findTableHeaderText = function(index) {
        return this.findTableHeader(index).getText();
    };

    this.findTableHeader = function (index) {
        return table.all(by.tagName('th')).get(index);
    };

    this.findTableCell = function (row, col) {
        return table.element(by.tagName('tbody')).all(by.tagName('tr')).get(row)
            .all(by.tagName('td')).get(col);
    };

};

describe('locales page', function () {
    var locales = new Locales();

    beforeEach(function () {
        browser.addMockModule('everest.rest.service.mock', function () {
            angular.module('everest.rest.service.mock');
        });
    });

    beforeEach(function () {
        locales.get();
    });

    describe ('header', function() {
        it('should have the expected header fields', function() {
            expect(locales.findTableHeaderText(0)).toEqual('Name');
            expect(locales.findTableHeaderText(1)).toEqual('Code');
            var addButtonHeader = locales.findTableHeader(2);
            expect(addButtonHeader.element(by.tagName('a')).getText()).toEqual('New Locale');
        });
    });

    describe ('locale 1', function() {
        it('should have expected data and buttons', function() {
            validateTableRow(0);
        });
    });

    describe ('locale 2', function() {
        it('should have expected data and buttons', function() {
            validateTableRow(1);
        });
    });

    describe ('locale 3', function() {
        it('should have expected data and buttons', function() {
            validateTableRow(2);
        });
    });

    describe ('locale 4', function() {
        it('should have expected data and buttons', function() {
            validateTableRow(3);
        });
    });

    describe ('locale 5', function() {
        it('should have expected data and buttons', function() {
            validateTableRow(4);
        });
    });

    describe ('locale 6', function() {
        it('should have expected data and buttons', function() {
            validateTableRow(5);
        });
    });

    function validateTableRow(row) {
        var id = row + 1;
        expect(locales.findTableCell(row, 0).getText()).toEqual('Locale' + id);
        expect(locales.findTableCell(row, 1).getText()).toEqual('' + id);

        var buttonCells = locales.findTableCell(row, 2).all(by.tagName('a'));
        expect(buttonCells.get(0).getText()).toEqual('View/Edit');
        expect(buttonCells.get(1).getText()).toEqual('Delete');
    }
});
