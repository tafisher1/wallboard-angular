exports.config = {
    allScriptsTimeout: 11000,

    specs: [
    '*.js',
    '**/*.js'
  ],

    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {
            browser: 'INFO'
        }
    },

    baseUrl: 'http://localhost:8000/app/everest-admin/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
    },
};
