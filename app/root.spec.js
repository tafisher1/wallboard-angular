describe('root.controller', function() {
    beforeEach(module('everest.admin'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('RootController', function() {
        var $scope;
        var controller;

        beforeEach(function() {
            controller = $controller('RootController');
        });

        describe('options', function() {
            it('To have a home and an employee options with employee set to active', function() {
                expect(controller.options).toBeDefined();
                expect(controller.options.length).toEqual(2);
                expect(controller.options[0].name).toEqual('Home');
                expect(controller.options[0].active).toEqual('active');
                expect(controller.options[1].name).toEqual('Employees');
                expect(controller.options[1].active).toEqual('');
            });
        });

        describe('version', function() {
            it('should be set to the expected version', function() {
                expect(controller.version).toEqual('1');
            });
        });

        describe('changeUrl', function() {
            it('Should set the active value to the url that is passed in', function() {
                checkActive('#/home', controller);

                controller.changeUrl('#/employee');
                checkActive('#/employee', controller);

                controller.changeUrl('#/home');
                checkActive('#/home', controller);
            });
        });

    });
});

function checkActive(url, controller) {
    for (var index in controller.options) {
        if (controller.options[index].url === url) {
            expect(controller.options[index].active).toEqual('active');
        } else {
            expect(controller.options[index].active).toEqual('');
        }
    }
}
