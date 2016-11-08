(function () {
    'use strict';

    angular
        .module('bamboo.site')
        .controller('SiteBambooController', SiteBambooController);

    SiteBambooController.$inject = ['$rootScope', '$scope', '$timeout', '$mdDialog', 'BambooService', 'categories'];

    function SiteBambooController($rootScope, $scope, $timeout, $mdDialog, BambooService, categories) {

        var vm = this;

        //functions
        vm.activate = activate;
        vm.showMore = showMore;
        vm.addToCart = addToCart;
        vm.getDishes = getDishes;
        vm.muvingToCart = muvingToCart;

        //variables
        vm.categories = categories;
        $scope.loading = true;
        $rootScope.showBack = false;


        activate();

        $scope.isOpen = false;

        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };

        $scope.colors = [
            "white",
            "green",
            "yellow",
            "blue",
            "red",
            "orange"
        ];

        $scope.lightColor = {
            selected : $scope.colors[0]
        };

        function activate(){
            vm.getDishes(vm.categories[0].id);
            $scope.index = 1;
            setInterval(function(){
                if($scope.index > 5){
                    $scope.index = 0;
                }
                $scope.lightColor.selected = $scope.colors[$scope.index];
                $scope.$apply();
                $scope.index++;
            }, 1000);
        }

        function getDishes(categoryId){
            BambooService.getDishes(categoryId).then(function(resp) {
                vm.dishes = resp.data.dishes;
            });
        }

        function showMore(ev, dish) {
            $mdDialog.show({
                controller: DishDialogController,
                templateUrl: '/site/item/dishDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                dish: dish,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        }


        function addToCart(event, index) {
            var elem = document.getElementById('dish-card-image-' + index);
            var cart = document.querySelector('#big-cart');

            var parent = elem.parentElement;
            var item = elem.cloneNode(true);
            parent.insertBefore(item, elem);

            vm.muvingToCart(item, cart);

            $timeout(function(){
                item.remove();
                vm.dishes[index].count = 1;
                $scope.cartStorage.dishes.push(angular.copy(vm.dishes[index]));
                BambooService.calculateTotal($scope.cartStorage);

            }, 400);
        }

        function DishDialogController($scope, $mdDialog, dish) {

            $scope.dish = dish;
            console.log($scope.dish);

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

        function muvingToCart(item, cart){

            var item_rect = item.getBoundingClientRect(),
                cart_rect = cart.getBoundingClientRect(),
                left = parseInt(item_rect.left),
                top = parseInt(item_rect.top),
                cartLeft = parseInt(cart_rect.left) + 150,
                cartTop = parseInt(cart_rect.top),
                leftTransfer = cartLeft - left,
                topTransfer = top - cartTop;

            item.style.position = 'fixed';
            item.style.zIndex = '100';
            item.style.left = left + 'px';
            item.style.top = top + 'px';
            item.style.width = 240 + 'px';

            var timerStart = 0;
            var timer = setInterval(function() {
                timerStart ++;
                if (timerStart >= 100) {
                    clearInterval(timer);
                    return;
                }
                draw(timerStart);
            }, 1);

            function draw(timerStart) {
                left += leftTransfer/100;
                top -= topTransfer/100;
                item.style.left = parseInt(left) + 'px';
                item.style.top =  parseInt(top) + 'px';
                item.style.width = parseInt(item.style.width) - 0.5 + 'px';
            }
        }
    }
})();

