describe('everest.admin.routes', function() {
    beforeEach(module('everest.admin'));

    it('should redirect to home by default', inject(function($route) {
        expect($route.routes[null].redirectTo).toEqual('/home');
    }));

    it('Should have the template set to home.html for /home', inject(function($route) {
        expect($route.routes['/home'].templateUrl).toEqual('views/home/home.html');
    }));

});
