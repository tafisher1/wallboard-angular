(function() {
    'use strict';

    angular
        .module('everest.rest.service.mock', [
            'everest.admin','ngMockE2E'
        ]).run(function ($httpBackend) {
        console.log($httpBackend);

        //employee locale calls
        $httpBackend.whenGET(/\/api\/data\/employees\/1\/locale/)
            .respond(200, getIndividualEmployeeLocale(1));
        $httpBackend.whenGET(/\/api\/data\/employees\/2\/locale/)
            .respond(200, getIndividualEmployeeLocale(2));
        $httpBackend.whenGET(/\/api\/data\/employees\/3\/locale/)
            .respond(200, getIndividualEmployeeLocale(3));

        //employee service calls
        $httpBackend.whenGET(/\/api\/data\/employees\/1/)
            .respond(200, getIndividualEmployeeResponse(1));
        $httpBackend.whenGET(/\/api\/data\/employees\/2/)
            .respond(200, getIndividualEmployeeResponse(2));

        var employee3 = getIndividualEmployeeResponse(3);
        employee3.profileImageUrl = undefined;
        $httpBackend.whenGET(/\/api\/data\/employees\/3/)
            .respond(200, employee3);

        $httpBackend.whenGET(/\/api\/data\/employees/
            ).respond(200, getEmployeeResponse());

        $httpBackend.whenGET(/views/).passThrough();
    });

    function getIndividualEmployeeResponse(id) {
        return {
            firstName: 'First' + id,
            lastName: 'Last' + id,
            title: 'Title' + id,
            emailAddress: 'Email' + id,
            workPhone: 'Work Phone' + id,
            cellPhone: 'Cell Phone' + id,
            biography: 'Bio' + id,
            profileImageUrl: '/image/' + id + '.jpg',
        };
    }

    function getIndividualEmployeeLocale(id) {
        return {name: 'Locale' + id};
    }

    function getEmployeeResponse() {
        return {
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
    }
})();
