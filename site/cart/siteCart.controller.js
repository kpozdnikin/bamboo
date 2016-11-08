(function () {
    'use strict';

    angular
        .module('bamboo.site')
        .controller('SiteCartController', SiteCartController);

    SiteCartController.$inject = ['$rootScope', '$scope', '$timeout', '$state', 'BambooService'];

    function SiteCartController($rootScope, $scope, $timeout, $state, BambooService) {

        var vm = this;

        //functions
        vm.activate = activate;
        vm.clearCart = clearCart;
        vm.plusDish = plusDish;
        vm.minusDish = minusDish;
        vm.deleteDish = deleteDish;
        vm.sendContact = sendContact;
        vm.changeDish = changeDish;

        //variables

        activate();

        function activate(){
            var cart = document.querySelector('#cart-content');
            cart.style.width = 50 + '%';
            cart.style.margin = '0 auto';
            cart.style.height = parseInt(document.documentElement.clientHeight) - 170 + 'px';
            cart.style.overflow = 'scroll';
            cart.style.overflowX = 'hidden';

            try{
                $scope.cartStorage.referer = document.referrer || null;
            }
            catch(err){

            }
        }

        function clearCart(){
            $scope.cartStorage.clientPhone = null;
            BambooService.clearCart($scope.cartStorage);
            $state.go('site.menu');
        }

        function plusDish(index, itemId){
            $scope.cartStorage.dishes[index].count ++ ;
            BambooService.calculateTotal($scope.cartStorage);
        }

        function minusDish(index, itemId){
            if($scope.cartStorage.dishes[index].count > 1){
                $scope.cartStorage.dishes[index].count --;
                BambooService.calculateTotal($scope.cartStorage);
            }
            else{
                deleteDish(index, itemId);
            }
        }

        function deleteDish(index, itemId){
            var elem = angular.element(document.querySelector('#cart-item-' + index + '-' + $scope.cartStorage.dishes[index].id));
            elem.css({'overflow':'hidden'});
            elem.addClass('fa-cart-item-deleting');
            $timeout(function() {
                $scope.cartStorage.dishes.splice(index, 1);
                BambooService.calculateTotal($scope.cartStorage);
                elem.removeClass('fa-cart-item-deleting');
            }, 500);
        }

        function sendContact(){
            try{
                $scope.cartStorage.referer = document.referrer || null;
            }
            catch(err){

            }
            BambooService.sendContact($scope.cartStorage).then(function(resp){
                if(resp){
                    alert('Спасибо за заказ! С вами свяжутся!');
                    localStorage.setItem('lastOrder', JSON.stringify($scope.cartStorage));

                    localStorage.removeItem('cartStorage');
                    $scope.cartStorage.dishes = [];
                    $scope.cartStorage.phone = null;
                    $scope.cartStorage.totalAmount = 0;
                    $scope.cartStorage.clientId = null;
                    $scope.cartStorage.referer = null;
                    $scope.cartStorage.delivery = null;

                    $state.go('banner');
                }
            })

        }

        function changeDish(index){
            BambooService.calculateTotal($scope.cartStorage);
        }

        //событие удачной смены стейта
        $scope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            if(to.name === 'site.cart'){
                $rootScope.showBack = true;
            }
        });
    }
})();

