module.exports = function (app) {


    app.get("/api/user", findUserByCredentials);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId?", findUserById);
    app.put("/api/user/:userId?", updateUser);
    app.delete("/api/user/:userId?", deleteUser);


    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email:"alice@wonderland.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email:"bob@marley.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charley@gmail.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email:"jannunzi@gmail.com"}
    ];





    /*
     *  Find user by credentials. Returns user if found. Returns 404 if not found.
     *
     */
    function findUserByCredentials(req, res) {

        var queryParams = req.query;

        var username = queryParams.username;
        var password = queryParams.password;

        var user = null;

        if(null == password)
        {
            user = findUserByUsernameHelper(username);
        }
        else {

            user = findUserByCredentialsHelper(username, password);
        }


        if(null == user) {

            res.send(404);

        }
        else{

            res.send(user);
        }

    }


    /*
     *   Creates user on post call.
     *
     */
     function createUser(req, res) {

         var user = req.body;
         if(null == user)
         {
             res.send(500);
         }

         var newUser = createUserHelper(user);
         if(null == newUser)
         {
             //internal server error.
             res.send(500);
         }
         else
         {
             res.send(newUser);
         }
    }




    function findUserById(req, res) {

         var user = findUserByIdHelper(req.params.userId);

         if(null == user){
             res.send(403);
         }else {

             res.send(user);
         }
    }


    function updateUser(req, res) {

        var user = req.body;

        if(null == user){
            res.send(500);
        }

        user = updateUserHelper(user);

        if(null == user){

            res.send(500);

        }else{

            res.send(user);
        }

    }


    function deleteUser(req, res) {

        var userId = req.params.userId;

        if(null == userId){
            res.send(404);
        }

        if(deleteUserHelper(userId)) {
            res.send(200);
        }
        else{
            res.send(500);
        }

    }

    //-------------------------------------------------------------------------
    //                         HELPER FUNCTIONS

    /*Internal function to find user by username*/
    function findUserByUsernameHelper(username) {

        for(var u in users) {
            if(users[u].username == username) {
                return (users[u]);
            }

        }
        return null;
    }




    /* Internal helper function to find the user by credentials.*/
    function findUserByCredentialsHelper(username, password) {
        for(var u in users) {
            if(users[u].username == username && users[u].password == password) {
                return (users[u]);
            }

        }
        return null;
    }



    /* Internal helper function to find the user by id.*/
    function findUserByIdHelper(userId){
        for(var u in users) {
            if(users[u]._id == userId) {
                return (users[u]);
            }

        }
        return null;
    }



    /*Internal function to create new user.*/
    function createUserHelper(user) {
        var newUser = {_id:users.length + 1,
            username:user.username,
            password: user.password,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email};

        users.push(newUser);

        return newUser;
    }




    function updateUserHelper(user) {

        for (var u in users) {
            if (users[u]._id == user._id) {
                users[u].username = user.username;
                users[u].firstName = user.firstName;
                users[u].lastName = user.lastName;
                users[u].password = user.password;
                users[u].email = user.email;

                return users[u];
            }
        }

        return null;
    }




    function deleteUserHelper(userId) {

        for(var u in users) {
            if(users[u]._id == userId) {
                users.splice(u,1);
                return true;
            }
        }

        return false;
    }
}