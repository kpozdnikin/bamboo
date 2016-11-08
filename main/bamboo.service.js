(function () {
    'use strict';

    angular
        .module('bamboo')
        .service('BambooService', BambooService);

    BambooService.$inject = ['$http'];

    function BambooService($http) {

        var service = {
            getCategories       : getCategories,
            getDishes           : getDishes,
            calculateTotal      : calculateTotal,
            clearCart           : clearCart,
            sendContact         : sendContact
        };

        return service;

        function getCategories(){
            return $http.get('/main/json/categories.json').success(function(res){
                    return res.categories;
            });
        }

        function getDishes(categoryId){
            return $http.get('/main/json/' + categoryId + '.json').success(function(res){
                return res.dishes;
            });
        }

        function calculateTotal(cartStorage){
            var totalAmount = 0;
            if(cartStorage.dishes.length){
                cartStorage.dishes.forEach(function(dish){
                    totalAmount += dish.price * dish.count;
                })
            }
            cartStorage.totalAmount = totalAmount;
            if(cartStorage.totalAmount <= 1000){
                cartStorage.delivery = 100;
            }
            else{
                cartStorage.delivery = 0;
            }
            localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
        }

        function clearCart(cartStorage){
            cartStorage.dishes = [];
            cartStorage.lastOrder = {};
            cartStorage.clientId = null;
            cartStorage.lastOrderSum = null;
            cartStorage.lastOrderDate = null;
            cartStorage.totalAmount = 0;
            localStorage.removeItem('cartStorage');
            return cartStorage
        }

        function sendContact(cartStorage){
            return $http.post('/nodeapi/contact', {
                phone       : cartStorage.phone,
                dishes      : cartStorage.dishes,
                clientId    : cartStorage.clientId,
                totalAmount : cartStorage.totalAmount,
                referer     : cartStorage.referer,
                delivery    : cartStorage.delivery
            }).then(function(resp){
                if(resp && resp.data && resp.data != 'error')
                    return resp;
                else alert('Слишком много заказов, попробуйте позже!');
            }, function(err){
                alert('Слишком много заказов, попробуйте позже!');
            })
        }

    }

})();