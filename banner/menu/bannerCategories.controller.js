(function () {
    'use strict';

    angular
        .module('bamboo.banner')
        .controller('BannerCategoriesController', BannerCategoriesController);

    BannerCategoriesController.$inject = ['$scope', 'categories'];

    function BannerCategoriesController($scope, categories) {

        var vm = this;

        //functions
        vm.activate = activate;

        //variables
        vm.categories = categories;

        activate();

        function activate(){

        }
    }
})();

