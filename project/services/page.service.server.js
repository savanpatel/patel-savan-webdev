module.exports = function (app, mongooseAPI) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    var websiteModel = mongooseAPI.websiteModelAPI;
    var pageModel = mongooseAPI.pageModelAPI;


    function createPage(req, res) {

        var websiteId = req.params.websiteId;
        var newPage = req.body;

        if(null == newPage || null == websiteId){
            res.send(500);
        }else{
            newPage.websiteId = websiteId;
            createPageHelper(websiteId, newPage, res);
        }
    }




    function findAllPagesForWebsite(req, res) {

        var websiteId = req.params.websiteId;

        if(null == websiteId){

            res.send(503);
        }else{

            pageModel.findAllPagesForWebsite(websiteId)
                .then(function (websites) {
                    res.send(websites);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    }



    function findPageById(req, res) {
        var pageId = req.params.pageId;

        if(null == pageId){
            res.send(500);
        }else{

            pageModel.findPageById(pageId)
                .then(function (page) {
                    res.send(page);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    }



    function updatePage(req, res) {

        var pageId = req.params.pageId;
        var page = req.body;

        if(null == pageId || null == page){
            res.send(503);
        }else{

            pageModel.updatePage(pageId, page)
                .then(function (resp) {
                    res.send(page);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    }



    function deletePage(req, res) {

        var pageId = req.params.pageId;
        if(null == pageId){

            res.send(404);
        }else{
            pageModel.deletePage(pageId)
                .then(function (status) {
                    res.sendStatus(status);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    }



    function createPageHelper(websiteId, page ,res)
    {

        pageModel.createPage(websiteId, page)
            .then(function (dbPage) {

                updateWebsiteForNewPage(websiteId, dbPage, res);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateWebsiteForNewPage(websiteId, dbPage, res) {

        websiteModel.findWebsiteById(websiteId)
            .then(function (dbWebsite) {

                dbWebsite.pages.push(dbPage._id);
                websiteModel.updateWebsite(websiteId, dbWebsite)
                    .then(function (website) {
                        res.send(dbPage);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });


            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

}