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

                var promise = PageService.findPageById(vm.pageId);
                promise.success(onFindPageByIdSuccess);
                promise.error(onFindPageByIdError);
            }

            init();


            function updatePage() {
                if(null != vm.page) {
                    var promise = PageService.updatePage(vm.pageId, vm.page);

                    promise.success(onUpdatePageSuccess);
                    promise.error(onUpdatePageError);

                }
            }


            function deletePage() {
                var promise = PageService.deletePage(vm.pageId);
                promise.success(onDeletePageSuccess);
                promise.error(onDeletePageError);
            }



            // promise functions.
            function onUpdatePageSuccess(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }


            function onUpdatePageError(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }



            function onDeletePageSuccess(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }


            function onDeletePageError(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }

            function onFindPageByIdSuccess(response) {
                vm.page = response;
            }

            function onFindPageByIdError(response) {
                vm.page = null;
            }
        }
})();