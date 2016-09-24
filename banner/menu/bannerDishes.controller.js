(function () {
    'use strict';

    angular
        .module('bamboo.banner')
        .controller('BannerDishesController', BannerDishesController);

    BannerDishesController.$inject = ['$scope', '$timeout', '$stateParams', '$animateCss', 'BambooService', 'dishes'];

    function BannerDishesController($scope, $timeout, $stateParams, $animateCss, BambooService, dishes) {

        var vm = this;

        //functions
        vm.activate = activate;
        vm.showToCart = showToCart;
        vm.hideToCart = hideToCart;
        vm.moveToCart = moveToCart;

        //variables
        vm.dishes = dishes;
        vm.categoryId = $stateParams.categoryId;

        activate();

        function activate(){

        }

        function showToCart(index){
            dishes[index].display = true;
        }

        function hideToCart(index){
            dishes[index].display = false;
        }

        function moveToCart(index, event){
            var elem = angular.element(document.querySelector('#dish-' + index));
            var parent = elem.parent();
            var elem2 = elem.clone();
            parent.prepend(elem2);
            var offset = elem.prop('y') || event.pageY;

            console.log('offset = ' + offset);
            console.log('elem = ' + elem);
            console.log(elem);

            elem2.css({ 'width':'100px', 'z-index':'100',
                'position':'absolute',
                'top':'-' + offset + 'px',
                'left':'200px',
                '-webkit-transition':'500ms linear all',
                '-moz-transition': '500ms linear all',
                '-ms-transition': '500ms linear all',
                '-o-transition': '500ms linear all',
                'transition': '500ms linear all'});

            $timeout(function(){
                elem2.remove();
                vm.dishes[index].count = 1;
                $scope.cartStorage.dishes.push(angular.copy(vm.dishes[index]));
                BambooService.calculateTotal($scope.cartStorage);
            }, 500);
        }
    }
})();

