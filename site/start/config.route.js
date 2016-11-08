'use strict';

angular
    .module('bamboo.site')
    .config(config);

function config($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

    $mdThemingProvider
        .theme('default')
        .primaryPalette('light-green')
        .accentPalette('brown');

    $urlRouterProvider.when('/site/', '/site').when('/site', '/site/menu');

    $stateProvider
        .state('site', {
            url: '/site',
            controller: 'SiteBambooController',
            controllerAs: 'vm',
            templateUrl: '/site/start/start.html',
            title: 'bamboo/site',
            resolve: {
                categories: resolveCategories
            }
        })
        .state('site.menu', {
            url: '/menu',
            controller: 'SiteMenuController',
            controllerAs: 'vm',
            templateUrl: '/site/menu/menu.html',
            title: 'bamboo/site/menu',
            resolve: {
                categories: resolveCategories
            }
        })
        .state('site.cart', {
            url: '/cart',
            controller: 'SiteCartController',
            controllerAs: 'vm',
            templateUrl: '/site/cart/cart.html',
            title: 'bamboo/site/cart'
        });

    resolveCategories.$inject = ['BambooService'];
    function resolveCategories(BambooService){
        return BambooService.getCategories().then(function(resp){
            return resp.data.categories;
        });
    }
}