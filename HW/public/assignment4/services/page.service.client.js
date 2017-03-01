(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;


        /*
         * creates new page, returns true on success.
         *
         */

        function createPage(websiteId, page) {
            var createPageUrl = "/api/website/" + websiteId + "/page";
            return $http.post(createPageUrl, page);
        }



        /*
         * Finds pages list for website id.
         *
         */
        function findPageByWebsiteId(websiteId) {

            var findPageByWebsiteIdUrl = "/api/website/" + websiteId + "/page";
            return $http.get(findPageByWebsiteIdUrl);
        }



        /*
         * Finds pages list for page id.
         *
         */
        function findPageById(pageId)  {

            var findPageByIdUrl = "/api/page/" + pageId;
            return $http.get(findPageByIdUrl);
        }


        /*
         * Updates the page information if found and returns true. returns false on failure.
         *
         */
        function updatePage(pageId, page){
            var updatePageUrl = "/api/page/" + pageId;
            return $http.put(updatePageUrl, page);
        }


        /*
         * deletes page from list based on pageId.
         */
        function deletePage(pageId) {
            var deletePageUrl = "/api/page/" + pageId;
            return $http.delete(deletePageUrl);
        }

    }
})();
