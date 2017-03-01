module.exports = function (app) {


    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    /*-----------------------------------------------------------------------*/
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" },
        { "_id": "790", "name": "Self Help",   "developerId": "234", "description": "Lorem" }
    ];



    /*-----------------------------------------------------------------------*/

    function createWebsite(req, res){

        var newWebsite = req.body;
        var userId = req.params.userId;

        if(null == newWebsite || null == userId){

            res.send(500);

        }
        else{

            var website = createWebsiteHelper(userId, newWebsite);
            res.send(website);

        }
    }




    function findAllWebsitesForUser(req, res) {

        var userId = req.params.userId;

        if(null == userId){
            res.send(404);
        }
        else{

              websiteList = findAllWebsitesForUserHelper(userId);

              res.send(websiteList);
        }
    }




    function findWebsiteById(req, res) {

        var websiteId = req.params.websiteId;

        if(null == websiteId)
        {
            res.send(404);
        }
        else
        {
            var website = findWebsiteByIdHelper(websiteId);
            if(null == website){
                res.send(404);
            }else{
                res.send(website);
            }

        }

    }



    function updateWebsite(req, res) {

        var websiteId = req.params.websiteId;
        var website = req.body;
        if(null == websiteId || null == website){

            res.send(404);

        }
        else{
                var updatedWebsite = updateWebsiteHelper(websiteId, website);
                res.send(updatedWebsite);
        }

    }


    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

        if(null == websiteId) {
            res.send(404);
        }
        else {

            if(deleteWebsiteHelper(websiteId)) {

                res.send(200);

            }else{

                res.send(503);
            }
        }

    }
    /*-----------------------------------------------------------------------*/

    function createWebsiteHelper(userId, website)
    {
        var newWebsite = {_id:websites.length + 1,
            name: website.name,
            developerId:userId,
            description:website.description};

        websites.push(newWebsite);

        return newWebsite;
    }



    function findAllWebsitesForUserHelper(userId) {
        var userWebSites = [];
        for(var w in websites) {

            if(websites[w].developerId == userId) {
                userWebSites.push(websites[w]);
            }
        }

        return userWebSites;

    }




    function findWebsiteByIdHelper(websiteId){

        for(var w in websites) {

            if(websites[w]._id == websiteId) {
                return websites[w];
            }
        }

        return null;
    }



    function updateWebsiteHelper(websiteId, website){
        for(var w in websites) {

            if(websites[w]._id == websiteId) {
                websites[w].description = website.description;
                websites[w].name = website.name;

                return websites[w];
            }
        }
        return null;
    }


    function deleteWebsiteHelper(websiteId) {
        for(var w in websites) {

            if(websites[w]._id == websiteId) {

                websites.splice(w, 1);
                return true;
            }

        }

        return false;
    }
}