describe('root.controller', function() {
    beforeEach(module('everest.admin'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('RootController', function() {
        var controller;

        beforeEach(function() {
            controller = $controller('RootController');
        });

        describe('options', function() {
            it('To have expected options', function() {
                expect(controller.options).toBeDefined();
                expect(controller.options.length).toEqual(3);
                expect(controller.options[0].name).toEqual('Home');
                expect(controller.options[0].active).toEqual('active');
                expect(controller.options[0].url).toEqual('#/home');
                expect(controller.options[1].name).toEqual('Employees');
                expect(controller.options[1].active).toEqual('');
                expect(controller.options[1].url).toEqual('#/employee');
                expect(controller.options[2].name).toEqual('Locales');
                expect(controller.options[2].active).toEqual('');
                expect(controller.options[2].url).toEqual('#/locales');

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

                controller.changeUrl('#/locales');
                checkActive('#/locales', controller);
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
