(function () {

    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)

        function NewWebsiteController($location, $routeParams, WebsiteService) {

            var vm =  this;
            vm.userId = $routeParams["uid"];

            vm.website = null;

            vm.addWebsite = addWebsite;

            function init() {

                vm.websitelist = WebsiteService.findWebsitesByUser(vm.userId);
            }

            init();
            
            
            function addWebsite(website) {

                   if(website != null && website.name != null && website.description != null &&
                       website.name != "" && website.description != "") {

                       var promise = WebsiteService.createWebsite(vm.userId, website);

                       promise.success(onCreateWebsiteSuccess);
                       promise.error(onCreateWebsiteError);
                   }
            }


            // Promise functions.
            function onCreateWebsiteSuccess(response) {
                var newWebsite = response;
                if(newWebsite){
                    vm.websitelist = WebsiteService.findWebsitesByUser(vm.userId);
                }

                vm.website = null;
                $location.url("/user/" + vm.userId + "/website");
            }

            function onCreateWebsiteError(response) {
                $location.url("/user/" + vm.userId + "/website");
            }

        }


})();