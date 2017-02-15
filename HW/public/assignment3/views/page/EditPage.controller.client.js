(function () {

    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)

        function EditPageController($location, $routeParams, PageService) {

            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.page = null;

            vm.updatePage = updatePage;
            vm.deletePage = deletePage;

            function init() {

                console.log(vm.websiteId);
                vm.pagelist = PageService.findPageByWebsiteId(vm.websiteId);
                console.log(vm.pagelist);

                vm.page = PageService.findPageById(vm.pageId);
            }

            init();


            function updatePage() {
                if(null != vm.page) {
                    PageService.updatePage(vm.pageId, vm.page);
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }
            }


            function deletePage() {
                PageService.deletePage(vm.pageId);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }
})();