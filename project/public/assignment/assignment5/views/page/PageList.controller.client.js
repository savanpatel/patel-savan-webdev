(function () {

    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)

        function PageListController(PageService, $routeParams) {

             var vm = this;
             vm.userId = $routeParams["uid"];
             vm.websiteId = $routeParams["wid"];
             function init() {

                    var promise = PageService.findPageByWebsiteId(vm.websiteId);
                    promise.success(onFindPageByWebsiteIdSuccess);
                    promise.error(onFindPageByWebsiteIdError)
             }

             init();

             function onFindPageByWebsiteIdSuccess(response) {
                 vm.pagelist = response;
             }

            function onFindPageByWebsiteIdError(response) {
                vm.pagelist = null;
            }

        }




})();