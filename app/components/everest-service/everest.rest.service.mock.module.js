(function() {
    'use strict';

    angular
        .module('everest.rest.service.mock', [
            'everest.admin','ngMockE2E'
        ]).run(function ($httpBackend) {
        console.log($httpBackend);
        $httpBackend.whenGET(/\/api\/data\/employees/
        ).respond(200, employeeResponse);

        $httpBackend.whenGET(/views/).passThrough();
    });

    var employeeResponse = {
        '_embedded': {
            'employees': [
              {
                  'firstName': 'First1',
                  'lastName': 'Last1',
                  'title': 'Title1',
                  'emailAddress': 'email1',
                  '_links': {
                'self': {
                    'href': 'http://127.0.0.1:8080/api/data/employees/1'
                },
                'locale': {
                    'href': 'http://127.0.0.1:8080/api/data/employees/1/locale'
                }
            }
              },
              {
                  'firstName': 'First2',
                  'lastName': 'Last2',
                  'title': 'Title2',
                  'emailAddress': 'email2',
                  '_links': {
                      'self': {
                          'href': 'http://127.0.0.1:8080/api/data/employees/2'
                      },
                      'locale': {
                          'href': 'http://127.0.0.1:8080/api/data/employees/2/locale'
                      }
                  }
              },
              {
                  'firstName': 'First3',
                  'lastName': 'Last3',
                  'title': 'Title3',
                  'emailAddress': 'email3',
                  '_links': {
                      'self': {
                          'href': 'http://127.0.0.1:8080/api/data/employees/3'
                      },
                      'locale': {
                          'href': 'http://127.0.0.1:8080/api/data/employees/3/locale'
                      }
                  }
              }
            ]
        },
        '_links': {
            'self': {
                'href': 'http://127.0.0.1:8080/api/data/employees'
            },
            'profile': {
                'href': 'http://127.0.0.1:8080/api/data/profile/employees'
            },
            'search': {
                'href': 'http://127.0.0.1:8080/api/data/employees/search'
            }
        }
    };
})();
