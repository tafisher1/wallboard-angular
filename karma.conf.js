    module.exports = function(config) {
        config.set({

            basePath : './',

            files : [
                'app/bower_components/angular/angular.js',
                'app/bower_components/angular-route/angular-route.js',
                'app/bower_components/angular-mocks/angular-mocks.js',
                'app/bower_components/angular-resource/angular-resource.js',
                'app/components/**/*.js',
                'app/views/**/*.module.js',
                'app/views/**/*.js',
                'app/*.js',
            ],

            autoWatch : true,

            frameworks: ['jasmine'],

            browsers : ['Chrome', 'Firefox'],

            plugins : [
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-jasmine-html-reporter'
                ],

            reporters: ['html'],
            junitReporter : {
                outputFile: 'test_out/unit.xml',
                suite: 'unit'
            }

        });
    };
