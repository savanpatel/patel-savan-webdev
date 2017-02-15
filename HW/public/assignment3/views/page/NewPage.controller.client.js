(function () {

    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)

        function NewPageController($location, $routeParams, PageService) {

            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.page = null;

            vm.createPage = createPage;

            function init() {

                console.log(vm.websiteId);
                vm.pagelist = PageService.findPageByWebsiteId(vm.websiteId);
                console.log(vm.pagelist);
            }

            init();


            function createPage(page) {
                if(null != page && null != page.name && null != page.description){
                    var newPage = PageService.createPage(vm.websiteId, page);
                    vm.page = null;
                    vm.pagelist.push(newPage);
                }
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }


})();