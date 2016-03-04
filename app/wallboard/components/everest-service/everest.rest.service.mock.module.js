(function () {
    'use strict';

    var $log;
    angular
        .module('everest.rest.service.mock', [
            'everest.admin', 'ngMockE2E',
        ]).run(function ($httpBackend, _$log_) {
        $log = _$log_;
        var error = [500, 'error'];

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
        $httpBackend.whenGET(/\/api\/data\/locales/
        ).respond(200, getLocaleListResponse());

        $httpBackend.whenPUT(/\/api\/data\/employees\/1/)
            .respond(function (method, url, data) {
                var obj = JSON.parse(data);

                if (autoFail(obj)) {
                    return error;
                }

                if (checkValidEmployeePutForErrors(obj, 4)) {
                    return error;
                }

                return [200, data];
            });

        $httpBackend.whenPUT(/\/api\/data\/employees\/2/)
                .respond(function (method, url, data) {
                    var obj = JSON.parse(data);

                    if (autoFail(obj)) {
                        return error;
                    }

                    if (checkValidEmployeePutForErrors(obj, 5)) {
                        return error;
                    }

                    return [200, data];
                });

        $httpBackend.whenPUT(/\/api\/data\/employees\/3/)
                    .respond(function (method, url, data) {
                        var obj = JSON.parse(data);

                        if (autoFail(obj)) {
                            return error;
                        }

                        if (checkValidEmployeePutForErrors(obj, 6)) {
                            return error;
                        }

                        return [200, data];
                    });

        $httpBackend.whenPOST(/\/api\/data\/employees/)
                    .respond(function (method, url, data) {
                        var obj = JSON.parse(data);

                        if (autoFail(obj)) {
                            return error;
                        }

                        if (checkValidEmployeePutForErrors(obj, 1)) {
                            return error;
                        }

                        return [200, getIndividualEmployeeResponse(1)];
                    });

        $httpBackend.whenDELETE(/\/api\/data\/employees\/1/)
            .respond(function () {
                $log.warn('DELETE EMPLOYEE 1');
                return [200, {}];
            });

        $httpBackend.whenDELETE(/\/api\/data\/employees\/2/)
        .respond(function () {
            $log.warn('DELETE EMPLOYEE 2');
            return [200, {}];
        });
        $httpBackend.whenDELETE(/\/api\/data\/employees\/3/)
        .respond(function () {
            $log.warn('DELETE EMPLOYEE 3');
            return error;
        });
        $httpBackend.whenGET(/views/).passThrough();
    });

    function autoFail(dataObj) {
        return dataObj.firstName === 'Fail';
    }

    function checkValidEmployeePutForErrors(dataObj, id) {

        return checkFieldValid(dataObj.firstName, 'First' + id, 'First Name') ||
            checkFieldValid(dataObj.lastName, 'Last' + id, 'Last Name') ||
            checkFieldValid(dataObj.title, 'Title' + id, 'Title') ||
            checkFieldValid(dataObj.emailAddress, 'Email' + id + '@xpanxion.com', 'Email') ||
            checkFieldValid(dataObj.workPhone, 'Work Phone' + id, 'Work Phone') ||
            checkFieldValid(dataObj.cellPhone, 'Cell Phone' + id, 'Cell Phone') ||
            checkFieldValid(dataObj.biography, 'Bio' + id, 'Biography') ||
            checkFieldValid(dataObj.profileImageUrl, 'http://127.0.0.1:8080/image/' +
                id  + '.jpg', 'Image Url') ||
            checkFieldValid(dataObj.locale, 'http://127.0.0.1:8080/api/data/locales/' +
                id, 'Locale');

    }

    function checkFieldValid(field, expected, fieldName) {
        if (field !== expected) {
            $log.warn('expected ' + fieldName + ' to be ' + expected + ' but was ' + field);
            return true;
        }

        return false;
    }

    function getLocaleListResponse() {
        return {
            _embedded:{
                locales: [
                    {
                        name:'Locale1',
                        _links:{
                            self:{
                                href:'http://127.0.0.1:8080/api/data/locales/1',
                            },
                        },
                    },
                    {
                        name:'Locale2',
                        _links:{
                            self:{
                                href:'http://127.0.0.1:8080/api/data/locales/2',
                            },
                        },
                    },
                    {
                        name:'Locale3',
                        _links:{
                            self:{
                                href:'http://127.0.0.1:8080/api/data/locales/3',
                            },
                        },
                    },
                    {
                        name:'Locale4',
                        _links:{
                            self:{
                                href:'http://127.0.0.1:8080/api/data/locales/4',
                            },
                        },
                    },
                    {
                        name:'Locale5',
                        _links:{
                            self:{
                                href:'http://127.0.0.1:8080/api/data/locales/5',
                            },
                        },
                    },
                    {
                        name:'Locale6',
                        _links:{
                            self:{
                                href:'http://127.0.0.1:8080/api/data/locales/6',
                            },
                        },
                    },
                ],
            },
        };
    }

    function getIndividualEmployeeResponse(id) {
        return {
            firstName: 'First' + id,
            lastName: 'Last' + id,
            title: 'Title' + id,
            emailAddress: 'Email' + id + '@Xpanxion.com',
            workPhone: 'Work Phone' + id,
            cellPhone: 'Cell Phone' + id,
            biography: 'Bio' + id,
            profileImageUrl: 'http://127.0.0.1:8080/image/' + id + '.jpg',
            _links:{
                self:{
                    href: 'http://127.0.0.1:8080/api/data/employees/1',
                },
            },
        };
    }

    function getIndividualEmployeeLocale(id) {
        return {
            name: 'Locale' + id,
            _links:{
                self:{
                    href:'http://127.0.0.1:8080/api/data/locales/' + id,
                },
            },
        };
    }

    function getEmployeeResponse() {
        return {
            _embedded: {
            employees: [
              {
                  firstName: 'First1',
                  lastName: 'Last1',
                  title: 'Title1',
                  emailAddress: 'email1@xpanxion.com',
                  _links: {
                self: {
                    href: 'http://127.0.0.1:8080/api/data/employees/1',
                },
                locale: {
                    href: 'http://127.0.0.1:8080/api/data/employees/1/locale',
                },
            },
              },
              {
                  firstName: 'First2',
                  lastName: 'Last2',
                  title: 'Title2',
                  emailAddress: 'email2@xpanxion.com',
                  _links: {
                      self: {
                          href: 'http://127.0.0.1:8080/api/data/employees/2',
                      },
                      locale: {
                          href: 'http://127.0.0.1:8080/api/data/employees/2/locale',
                      },
                  },
              },
              {
                  firstName: 'First3',
                  lastName: 'Last3',
                  title: 'Title3',
                  emailAddress: 'email3@xpanxion.com',
                  _links: {
                      self: {
                          href: 'http://127.0.0.1:8080/api/data/employees/3',
                      },
                      locale: {
                          href: 'http://127.0.0.1:8080/api/data/employees/3/locale',
                      },
                  },
              },
          ],
        },
        };
    }
})();
