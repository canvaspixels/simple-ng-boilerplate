// My advice is to read every line of this file and you will be an angular pro in no time!

angular.module('theApp', ['ngRoute']) //note data-ng-app="theApp" has been added to the html tag to initialise angular on that DOM
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        //ALL OUR ROUTES
        $routeProvider
            .when('/', {
                templateUrl: '/home.html',
                controller: 'HomeController',
                title: 'My homepage'
            })
            .when('/my-page', {
                templateUrl: '/page1.html',
                controller: 'Page1Controller',
                title: 'My page 1 title',
                reloadOnSearch: false
            })
            .when('/page-not-found', {
                templateUrl: '/404.html',
                title: 'Oops! This page has not been found'
            })
            .otherwise({
                redirectTo: '/page-not-found'
            });

        //JUST IGNORE FROM HERE...

        //THIS $httpProvider STUFF BASICALLY MAKES THE $http POSTs AND PUTs WORK THE SAME AS JQUERY'S AJAX METHOD AS THAT'S WHAT THE BACKEND WAS EXPECTING WHEN WE WERE USING JQUERY
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        // Angular does not set X-Requested-With by default, unlike jQuery
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        //this is required for serialising your parameters, used across the board for overriding $http service's default transformRequest
        angular.param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
            for(name in obj){
                value = obj[name];
                if(value instanceof Array){
                    for(i=0; i<value.length; ++i){
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += angular.param(innerObj) + '&';
                    }
                }
                else if(value instanceof Object){
                    for(subName in value){
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += angular.param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null){
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            // The workhorse; converts an object to x-www-form-urlencoded serialization.
            return angular.isObject(data) && String(data) !== '[object File]' ? angular.param(data) : data;
        }];
        //... TO HERE
    })


    // add a bunch of dependencies in any order here as parameters
    // e.g. built in ones like $http, $window, $timeout
    // OR our custom service called appService that we have defined below
    .run(function ($rootScope, $location, appService) {
        var rs = $rootScope;
        //this is the starting point for the entire app
        //note scope here is the root scope
        rs.heading = appService.convertThirdLetterToUpper('Welcome to angular bootstrap');
        rs.isSidePanelOpen = true;
        rs.$watch('isSidePanelOpen', function(isSidePanelOpen) {
            console.log('isSidePanelOpen', isSidePanelOpen);
        });
        rs.$on('$routeChangeStart', function(e, newRoute){
			rs.title = newRoute.title;
        });
    });

angular.module('theApp') //note this has no second argument, this retrieves the dependencies of where it is first declared on line 1, this can then be placed in another file to organise your code when the app starts to get larger
    .service('appService', function ($http, $q, $location, $rootScope) {
        return {
            convertThirdLetterToUpper: function (txt) {
                return txt.substr(0,2) + txt[2].toUpperCase() + txt.substr(3, txt.length);
            }
        };
    })
    .controller('HomeController', function ($scope) { //a page specific controller. You can have as many as you like nested inside each other
		//note every level of $scope can access the root scope through a reference called $root on the $scope object
		$scope.$root.currentPage = 'home';
    })
    .controller('Page1Controller', function ($scope) { //notice that I am not using the array notation for dependencies, keep it simples, if you want to minify your JS, use ng-min before you minify
        $scope.$root.currentPage = 'page1';
    })
    .filter('crazyCase', function () {
        return function (txt) {
            var tmp = '';
            for (var i = 0; i < txt.length; i++) {
                tmp += Math.random() < .5 ? txt[i].toLowerCase() : txt[i].toUpperCase();
            };
            return tmp;
        };
    });


