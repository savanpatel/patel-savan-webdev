(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", UserService);

    function UserService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" },
            { "_id": "790", "name": "Self Help",   "developerId": "234", "description": "Lorem" }
        ];

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
            var newWebsite = {_id:websites.length + 1,
                              name: website.name,
                              developerId:userId,
                              description:website.description};

            websites.push(newWebsite);

            return newWebsite;
        }



        /*
         * Finds website list for user.
         *
         */
        function findWebsitesByUser(userId) {

            var userWebSites = [];
            for(var w in websites) {

                if(websites[w].developerId == userId) {
                    userWebSites.push(websites[w]);
                }
            }

            return userWebSites;
        }



        /*
         * Finds website by id.
         *
         */
        function findWebsiteById(websiteId){

            for(var w in websites) {

                if(websites[w]._id == websiteId) {
                    return angular.copy(websites[w]);
                }
            }

            return null;
        }


        /*
         * Updates the website information of found and returns true. returns false on failure.
         *
         */
        function updateWebsite(websiteId, website){
            for(var w in websites) {

                if(websites[w]._id == websiteId) {
                    websites[w].description = website.description;
                    websites[w].name = website.name;

                    return true;
                }
            }
            return false;
        }


        /*
         * Deletes website.
         */
        function deleteWebsite(websiteId) {
            for(var w in websites) {

                if(websites[w]._id == websiteId) {

                    websites.splice(w, 1);
                    return true;
                }

            }

            return false;
        }

    }
})();
