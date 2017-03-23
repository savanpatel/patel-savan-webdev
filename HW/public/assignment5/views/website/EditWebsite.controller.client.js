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

                var promise = WebsiteService.findWebsiteById(vm.websiteId);
                promise.success(onFindWebsiteByIdSuccess);
                promise.error(onFindWebsiteByIdError);

                //vm.websitelist = WebsiteService.findWebsitesByUser(vm.userId);
            }

            init();

            function updateWebsite(website) {

                var promise = WebsiteService.updateWebsite(vm.websiteId, website);

                promise.success(onUpdateWebsiteSuccess);
                promise.error(onUpdateWebsiteError);
            }


            function deleteWebsite() {

                var promise = WebsiteService.deleteWebsite(vm.websiteId);
                promise.success(onDeleteWebsiteSuccess);
                promise.error(onDeleteWebsiteError);
            }


            // Promise functions
            function onUpdateWebsiteSuccess(response) {

                $location.url("/user/" + vm.userId + "/website");
            }

            function onUpdateWebsiteError(response) {

                $location.url("/user/" + vm.userId + "/website");
            }


            function onDeleteWebsiteSuccess(response) {
                console.log(response);
                if(response != "OK"){
                    console.log("Failed to delete website");
                }
                $location.url("/user/" + vm.userId + "/website");
            }

            function onDeleteWebsiteError(response) {

                if(response != "OK"){
                    console.log("Failed to delete website");
                }

                $location.url("/user/" + vm.userId + "/website");
            }



            function onFindWebsiteByIdSuccess(response) {

                vm.website = response;
            }

            function onFindWebsiteByIdError(response) {
                vm.website = response;
            }

        }


})();