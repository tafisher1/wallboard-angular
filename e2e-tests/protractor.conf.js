exports.config = {
    allScriptsTimeout: 11000,

    specs: [

    '*.js',
    '**/*.js',

  ],

    capabilities: {
        browserName: 'firefox',
    },

    baseUrl: 'http://localhost:8000/app/everest-admin/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
    },
};
