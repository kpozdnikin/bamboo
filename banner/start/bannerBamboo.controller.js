(function () {
    'use strict';

    angular
        .module('bamboo.banner')
        .controller('BannerBambooController', BannerBambooController);

    BannerBambooController.$inject = ['$scope', '$state'];

    function BannerBambooController($scope, $state) {

        var vm = this;

        //functions
        vm.activate = activate;

        //variables
        $scope.showBackButton = false;
        vm.showBanner = true;

        activate();

        function activate(){
            $scope.showBackButton = ($state.current.name != 'banner.categories');
        }

        $scope.$on('$stateChangeStart', function (event, next) {
            $scope.showBackButton = (next.name != 'banner.categories');
        });
    }
})();

