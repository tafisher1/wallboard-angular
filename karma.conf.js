    module.exports = function(config) {
        config.set({

            basePath : './',

            files : [
                'app/bower_components/angular/angular.js',
                'app/bower_components/angular-route/angular-route.js',
                'app/bower_components/angular-mocks/angular-mocks.js',
                'app/bower_components/angular-resource/angular-resource.js',
                
                'app/wallboard/wallboard.module.js',
                'app/wallboard/components/**/*.js',
                'app/wallboard/views/**/*.module.js',
                'app/wallboard/views/**/*.js',
                'app/wallboard/*.js',
                
                'app/everest-admin/components/**/*.js',
                'app/everest-admin/views/**/*.module.js',
                'app/everest-admin/views/**/*.js',
                'app/everest-admin/*.js'
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
