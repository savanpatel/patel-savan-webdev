(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)


        function WebsiteListController($location, $routeParams, WebsiteService) {

            var vm =  this;
            vm.userId = $routeParams["uid"];
            function init() {

                vm.websitelist = WebsiteService.findWebsitesByUser(vm.userId);
            }

            init();

        }


})();