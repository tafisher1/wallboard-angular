describe('wallboard.routes', function() {
    beforeEach(module('wallboard'));

    it('should redirect to home by default', inject(function($route) {
        expect($route.routes[null].redirectTo).toEqual('/');
    }));
    
    it('should have the template set to home.html for /home', inject(function($route) {
        expect($route.routes['/'].templateUrl).toEqual('views/home/home.html');
    }));

    it('should have the template set to wall.html for /wall/:localeName/home', inject(function($route) {
        var route = $route.routes['/wall/:localeName/home'];
    	expect(route.templateUrl).toEqual('views/wall/wall.html');
    	expect(route.controller).toEqual('WallController');
    	expect(route.controllerAs).toEqual('vm');
    }));

});