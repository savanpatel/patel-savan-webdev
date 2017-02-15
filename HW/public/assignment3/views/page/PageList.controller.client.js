(function () {

    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)

        function PageListController($location, PageService, $routeParams) {

             var vm = this;
             vm.userId = $routeParams["uid"];
             vm.websiteId = $routeParams["wid"];
             function init() {

                    console.log(vm.websiteId);
                    vm.pagelist = PageService.findPageByWebsiteId(vm.websiteId);
                    console.log(vm.pagelist);
             }

             init();
        }


})();