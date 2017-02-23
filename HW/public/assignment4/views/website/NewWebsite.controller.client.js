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

                       var newWebsite = WebsiteService.createWebsite(vm.userId, website);
                       if(newWebsite){
                           vm.websitelist = WebsiteService.findWebsitesByUser(vm.userId);
                       }

                       vm.website = null;
                   }

                   $location.url("/user/" + vm.userId + "/website");

            }
        }


})();