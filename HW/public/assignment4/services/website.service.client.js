(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);


    function WebsiteService($http) {

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };

        return api;


        /*
         * creates new website, returns true on success.
         *
         */

        function createWebsite(userId, website)
        {
            var createWebsiteUrl = "/api/user/" + userId + "/website";
            return $http.post(createWebsiteUrl, website);
        }



        /*
         * Finds website list for user.
         *
         */
        function findWebsitesByUser(userId) {

            var findWebsiteUrl = "/api/user/" + userId + "/website";
            return $http.get(findWebsiteUrl);
        }



        /*
         * Finds website by id.
         *
         */
        function findWebsiteById(websiteId){
            var findWebsiteUrl = "/api/website/" + websiteId;
            return $http.get(findWebsiteUrl);
        }


        /*
         * Updates the website information of found and returns true. returns false on failure.
         *
         */
        function updateWebsite(websiteId, website){

            console.log(website);
            var updateWebsiteUrl = "/api/website/" + websiteId;
            return $http.put(updateWebsiteUrl, website);
        }


        /*
         * Deletes website.
         */
        function deleteWebsite(websiteId) {

            var deleteWebsiteUrl = "/api/website/" + websiteId;
            return $http.delete(deleteWebsiteUrl);
        }

    }
})();
