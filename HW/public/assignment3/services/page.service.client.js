(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", UserService);

    function UserService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

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

        function createPage(websiteId, page)
        {
            var newPage = {_id:pages.length + 1,
                           name: page.name,
                           websiteId: websiteId,
                           description:page.description};

            pages.push(newPage);

            return true;
        }



        /*
         * Finds pages list for website id.
         *
         */
        function findPageByWebsiteId(websiteId) {

            var userPages = [];
            for(var p in pages) {

                if(pages[p].websiteId === websiteId) {
                    userPages.push(pages[p]);
                }
            }
            return userPages;
        }



        /*
         * Finds pages list for page id.
         *
         */
        function findPageById(pageId)  {

            var userPages = [];
            for(var p in pages) {

                if(pages[p]._id === pageId) {
                    userPages.push(pages[p]);
                }
            }
            return userPages;
        }


        /*
         * Updates the page information if found and returns true. returns false on failure.
         *
         */
        function updatePage(pageId, page){
            for(var p in pages) {

                if(pages[p]._id === pageId) {
                    pages[p].name= page.name;
                    pages[p].description = page.description;
                    pages[p].websiteId = page.websiteId;

                    return true;
                }
            }

            return false;
        }


        /*
         * deletes page from list based on pageId.
         */
        function deletePage(pageId) {
            for(var p in pages) {

                if(pages[p]._id === pageId) {

                    pages.splice(p, 1);
                    return true;
                }

            }

            return false;
        }

    }
})();
