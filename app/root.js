(function() {
'use strict';

angular.module('everest.admin')
	.controller('RootController',  RootController);

//defaults

function RootController() {

    //bindings
    var model = this;
    model.changeUrl = changeUrl;
    model.options = [];
    model.version = '1';

    activate();
    //functions
    function changeUrl(url) {
        for (var num in model.options) {
            if (model.options[num].url === url) {
                model.options[num].active = 'active';
            } else {
                model.options[num].active = '';
            }
        }
    }

    function activate() {
        model.options = [
            {name: 'Home', url: '#/home', active: 'active'},
            {name: 'Employees', url: '#/employee', active: ''}];
    }
}

})();
