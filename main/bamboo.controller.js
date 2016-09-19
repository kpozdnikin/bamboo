(function () {
    'use strict';

    angular
        .module('bamboo')
        .controller('BambooController', BambooController);

    BambooController.$inject = ['$scope'];

    function BambooController($scope) {

        //variables
        //localStorage.removeItem('cartStorage');
        $scope.categories = [];
        $scope.cartStorage = JSON.parse(localStorage.getItem('cartStorage')) || {
                dishes          : [],
                phone           : null,
                totalAmount     : 0,
                clientId        : null,
                referer         : null
        };


        $scope.activate = function () {

        };

        $scope.activate();

    }

})();