'use strict';

angular
    .module('bamboo.banner')
    .config(config);

function config($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    /*$mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');*/

    $urlRouterProvider.when('/banner/', '/banner').when('/banner', '/banner/categories');

    $stateProvider
        .state('banner', {
            url: '/banner',
            controller: 'BannerBambooController',
            controllerAs: 'vm',
            templateUrl: '/banner/start/start.html',
            title: 'bamboo/banner'
        })
        .state('banner.categories', {
            url: '/categories',
            controller: 'BannerCategoriesController',
            controllerAs: 'vm',
            templateUrl: '/banner/menu/categories.html',
            title: 'bamboo/banner/categories',
            resolve: {
                categories: resolveCategories
            }
        })
        .state('banner.dish', {
            url: '/:categoryId/dishes',
            controller: 'BannerDishesController',
            controllerAs: 'vm',
            templateUrl: '/banner/menu/dishes.html',
            title: 'bamboo/banner/dishes',
            resolve: {
                dishes: resolveDishes
            }
        })
        .state('banner.cart', {
            url: '/cart',
            controller: 'BannerCartController',
            controllerAs: 'vm',
            templateUrl: '/banner/cart/cart.html',
            title: 'bamboo/banner/cart'
        });

    resolveCategories.$inject = ['BambooService'];
    function resolveCategories(BambooService){
        return BambooService.getCategories().then(function(resp){
            return resp.data.categories;
        });
    }
    resolveDishes.$inject = ['$stateParams', 'BambooService'];
    function resolveDishes($stateParams, BambooService){
        return BambooService.getDishes($stateParams.categoryId).then(function(resp){
            return resp.data.dishes;
        });
    }
}
