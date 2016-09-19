'use strict';

angular
    .module('bamboo')
    .config(config);

var HEADER_NAME = 'Front-Handle-Errors-Generically';
var specificallyHandleInProgress = false;

function config($stateProvider, $urlRouterProvider, $locationProvider) {

     $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
     });

    $urlRouterProvider.when('', '/').when('/', '/site');

    $stateProvider
        .state('main', {
            url: '/',
            controller:'BambooController',
            controllerAs: 'vm',
            title: 'bamboo/main'
        });

   /* $urlRouterProvider.otherwise('/main');*/

    /*resolveBanners.$inject = ['FrontService'];
    function resolveBanners(FrontService){
        return FrontService.getBanners().then(function(resp){
            return resp.Offers;
        });
    }*/
}
