'use strict';

angular
    .module('bamboo.site')
    .config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider) {

   /* $urlRouterProvider
     .when('/site/', '/site');*/

    $stateProvider
        .state('site', {
            url: '/site',
            controller: 'SiteBambooController',
            controllerAs: 'vm',
            templateUrl: 'site/start/start.html',
            title: 'bamboo/site'
        });

    /* $urlRouterProvider.otherwise('/main');*/
}
