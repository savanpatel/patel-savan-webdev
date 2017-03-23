module.exports = function (app, mongooseAPI) {


    app.get("/api/user", findUserByCredentials);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId?", findUserById);
    app.put("/api/user/:userId?", updateUser);
    app.delete("/api/user/:userId?", deleteUser);



    // API for mongoose user model library.
    var userModel = mongooseAPI.userModelAPI;


    /*
     *  Find user by credentials. Returns user if found. Returns 404 if not found.
     *
     */
    function findUserByCredentials(req, res) {

        var queryParams = req.query;

        var username = queryParams.username;
        var password = queryParams.password;

        userModel
            .findUserByCreadentials(username, password)
            .then(function (user) {

                if(null == user) {
                    // user not found in db.
                    res.sendStatus(404);
                } else {
                    res.send(user);
                }

            }, function (err) {
                // error on database side.
                res.sendStatus(404).send(err);
            });

    }


    /*
     *   Creates user on post call.
     *
     */
     function createUser(req, res) {

         var user = req.body;

         if(null == user){
             res.sendStatus(500);
             return;
         }
         userModel.createUser(user)
             .then(function (dbUser) {

                 if(null == dbUser){
                     res.sendStatus(500);
                 } else {
                     res.send(dbUser);
                 }

             }, function (err) {
                 res.sendStatus(500).send(err);
             });
    }




    function findUserById(req, res) {
         var userId = req.params.userId;

         userModel.findUserById(userId)
             .then(function (user) {
                 if(null == user){
                     // user not found
                     res.send(404);
                 }else {
                     // user found.
                     res.send(user);
                 }

             }, function (err) {
                 res.sendStatus(500).send(err);
             });

    }


    function updateUser(req, res) {

        var user = req.body;
        var userId = req.params.userId;

        if(null == user){
            res.send(500);
            return;
        }

        userModel.updateUser(userId, user)
            .then(function (dbUser) {
                if(null == dbUser){
                    res.sendStatus(500);
                } else {
                    res.send(user);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }


    function deleteUser(req, res) {

        var userId = req.params.userId;

        if(null == userId){
            res.send(404);
            return;
        }

        userModel.deleteUser(userId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}