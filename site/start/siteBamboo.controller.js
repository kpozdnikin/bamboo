(function () {
    'use strict';

    angular
        .module('bamboo.site')
        .controller('SiteBambooController', SiteBambooController);

    SiteBambooController.$inject = [];

    function SiteBambooController() {

        var vm = this;

        vm.activate = activate;

        activate();

        function activate(){
            console.log(222);
        }
    }
})();

