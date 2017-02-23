module.exports = function (app) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    /*--------------------------------------------------------------------------------*/
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        { "_id": "322", "name": "About", "websiteId": "789", "description": "Lorem" },
        { "_id": "323", "name": "Careers", "websiteId": "789", "description": "Lorem" },
        { "_id": "324", "name": "Work life balance", "websiteId": "790", "description": "Lorem" },
        { "_id": "325", "name": "Time management", "websiteId": "790", "description": "Lorem" }
    ];


    /*-------------------------------------------------------------------------------*/

    function createPage(req, res) {

        var websiteId = req.params.websiteId;
        var newPage = req.body;

        if(null == newPage || null == websiteId){
            res.send(500);
        }else{

            var page = createPageHelper(websiteId, newPage);
            res.send(page);
        }
    }




    function findAllPagesForWebsite(req, res) {

        var websiteId = req.params.websiteId;

        if(null == websiteId){

            res.send(503);
        }else{

            websiteList = findAllPagesForWebsiteHelper(websiteId);
            res.send(websiteList);
        }
    }



    function findPageById(req, res) {
        var pageId = req.params.pageId;

        if(null == pageId){
            res.send(500);
        }else{

            var newpage =  findPageByIdHelper(pageId);
            if(null == newpage){
                res.send(404);
            }else{
                res.send(newpage);
            }

        }
    }



    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var page = req.body;

        if(null == pageId || null == page){
            res.send(503);
        }else{

            var updatedPage =  updatePageHelper(pageId, page);
            res.send(updatedPage);
        }

    }



    function deletePage(req, res) {

        var pageId = req.params.pageId;
        if(null == pageId){

            res.send(404);
        }else{

            if(deletePageHelper(pageId)){
                res.send(200);
            }else{
                res.send(500);
            }
        }
    }


    /*-------------------------------------------------------------------------------*/

    function createPageHelper(websiteId, page)
    {
        var newPage = {_id:pages.length + 1,
            name: page.name,
            websiteId: websiteId,
            description:page.description};

        pages.push(newPage);

        return newPage;
    }




    function findAllPagesForWebsiteHelper(websiteId) {

        var userPages = [];
        for(var p in pages) {
            console.log(p.websiteId);
            if(pages[p].websiteId == websiteId) {
                userPages.push(pages[p]);
            }
        }
        return userPages;
    }



    function findPageByIdHelper(pageId)  {

        for(var p in pages) {

            if(pages[p]._id == pageId) {
                return pages[p];
            }
        }
        return null;
    }



    function updatePageHelper(pageId, page){
        for(var p in pages) {

            if(pages[p]._id == pageId) {
                pages[p].name= page.name;
                pages[p].description = page.description;
                pages[p].websiteId = page.websiteId;

                return pages[p];
            }
        }

        return null;
    }



    function deletePageHelper(pageId) {
        for(var p in pages) {

            if(pages[p]._id == pageId) {

                pages.splice(p, 1);
                return true;
            }

        }

        return false;
    }

}