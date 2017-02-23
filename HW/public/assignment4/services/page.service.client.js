(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", UserService);

    function UserService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
                { "_id": "322", "name": "About", "websiteId": "789", "description": "Lorem" },
                { "_id": "323", "name": "Careers", "websiteId": "789", "description": "Lorem" },
                { "_id": "324", "name": "Work life balance", "websiteId": "790", "description": "Lorem" },
                { "_id": "325", "name": "Time management", "websiteId": "790", "description": "Lorem" }
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

            return angular.copy(newPage);
        }



        /*
         * Finds pages list for website id.
         *
         */
        function findPageByWebsiteId(websiteId) {

            var userPages = [];
            for(var p in pages) {
                console.log(p.websiteId);
                if(pages[p].websiteId == websiteId) {
                    userPages.push(angular.copy(pages[p]));
                }
            }
            return userPages;
        }



        /*
         * Finds pages list for page id.
         *
         */
        function findPageById(pageId)  {

            for(var p in pages) {

                if(pages[p]._id == pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }


        /*
         * Updates the page information if found and returns true. returns false on failure.
         *
         */
        function updatePage(pageId, page){
            for(var p in pages) {

                if(pages[p]._id == pageId) {
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

                if(pages[p]._id == pageId) {

                    pages.splice(p, 1);
                    return true;
                }

            }

            return false;
        }

    }
})();
