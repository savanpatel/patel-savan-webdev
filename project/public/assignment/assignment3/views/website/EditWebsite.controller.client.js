(function () {

    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)

        function EditWebsiteController($location, $routeParams, WebsiteService) {

            var vm =  this;
            vm.updateWebsite = updateWebsite;
            vm.deleteWebsite = deleteWebsite;

            function init() {

                vm.userId = $routeParams["uid"];
                vm.websiteId = $routeParams["wid"];

                vm.website = WebsiteService.findWebsiteById(vm.websiteId);
                vm.websitelist = WebsiteService.findWebsitesByUser(vm.userId);

                console.log("Website id is : " + vm.website);
            }

            init();

            function updateWebsite(website) {

                WebsiteService.updateWebsite(vm.websiteId, website);

                $location.url("/user/" + vm.userId + "/website");
            }


            function deleteWebsite() {

                if(WebsiteService.deleteWebsite(vm.websiteId)) {
                    console.log(true);
                    $location.url("/user/" + vm.userId + "/website");
                };

            }
        }


})();