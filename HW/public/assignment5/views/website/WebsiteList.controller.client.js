(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)


        function WebsiteListController($location, $routeParams, WebsiteService) {

            var vm =  this;
            vm.userId = $routeParams["uid"];
            function init() {

                var promise = WebsiteService.findWebsitesByUser(vm.userId);

                promise.success(onFindWebsiteSuccess);
                promise.error(onFindWebsiteError);
            }

            init();


            function onFindWebsiteSuccess(response) {
                vm.websitelist = response;
            }


            function onFindWebsiteError(response) {
                vm.websitelist = [];
            }
        }
})();