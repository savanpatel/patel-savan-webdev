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
            }

            init();


            function createPage(page) {
                if(null != page && null != page.name && null != page.description){
                    var promise = PageService.createPage(vm.websiteId, page);
                    promise.success(onCreatePageSuccess);
                    promise.error(onCreatePageError);
                }
            }


            // promise functions.

            function onCreatePageSuccess(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }

            function onCreatePageError(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }
})();