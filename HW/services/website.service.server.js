module.exports = function (app, mongooseAPI) {


    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);



    var userModel = mongooseAPI.userModelAPI;
    var websiteModel = mongooseAPI.websiteModelAPI;


    /*-----------------------------------------------------------------------*/

    function createWebsite(req, res){

        var newWebsite = req.body;
        var userId = req.params.userId;

        if(null == newWebsite || null == userId){

            res.send(500);

        }
        else{

           createWebsiteHelper(userId, newWebsite, res);
        }
    }




    function findAllWebsitesForUser(req, res) {

        var userId = req.params.userId;

        if(null == userId){
            res.send(404);

        }
        else{
             websiteModel.findAllWebsitesForUser(userId)
                 .then(function (websites) {
                     res.send(websites);
                 }, function (err) {

                     res.sendStatus(500).send(err);
                 });
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
           websiteModel.findWebsiteById(websiteId)
               .then(function (website) {
                   res.send(website);
               }, function (err) {
                   res.sendStatus(500).send(err);
               });

        }

    }



    function updateWebsite(req, res) {

        var websiteId = req.params.websiteId;
        var website = req.body;
        if(null == websiteId || null == website){

            res.send(404);

        }
        else{
            websiteModel.updateWebsite(websiteId, website)
                .then(function (resp) {
                    res.send(website);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

    }




    function deleteWebsite(req, res) {

        var websiteId = req.params.websiteId;

        if(null == websiteId) {
            res.send(404);
        }
        else {

            websiteModel.deleteWebsite(websiteId)
                .then(function (status) {
                    res.sendStatus(status);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

    }




    function createWebsiteHelper(userId, website, res)
    {
        websiteModel.createWebsiteForUser(userId, website)
            .then(function (dbWebsite) {
                if(null == dbWebsite){
                    res.sendStatus(500);
                } else {
                    // update user.
                    updateUserForNewWebsite(userId, dbWebsite, res);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }




    function updateUserForNewWebsite(userId, website, res) {

        userModel.findUserById(userId)
            .then(function (user) {

                user.websites.push(website._id);
                userModel.updateUser(userId, user)
                    .then(function (user) {
                        res.send(website);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });


            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}