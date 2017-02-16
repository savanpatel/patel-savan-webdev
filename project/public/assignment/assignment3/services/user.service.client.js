(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email:"alice@wonderland.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email:"bob@marley.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charley@gmail.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email:"jannunzi@gmail.com"}
    ];


    function UserService() {


        var api = {
            "users":users,
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;


        /*
         * creates new user, returns true on success.
         *
         */

        function createUser(user)
        {
            var newUser = {_id:users.length + 1,
                           username:user.username,
                           password: user.password,
                           firstName:user.firstName,
                           lastName:user.lastName,
                           email:user.email};
            users.push(angular.copy(newUser));

            return newUser;
        }



        /*
         * Finds user by userid, returns null on failure.
         *
         */
        function findUserById(id) {
            for(var u in users) {
                if(users[u]._id == id) {
                    return angular.copy(users[u]);
                }
            }
            return null;
        }



        /*
         * Finds user by username, returns null on failure.
         *
         */
        function findUserByUsername(username){
            for(var u in users) {
                if(users[u].username == username) {
                    return angular.copy(users[u]);
                }
            }

            return null;
        }


        /*
         * returns user if username and password matches, null otherwise.
         *
         */
        function findUserByCredentials(username, password){
            for(var u in users) {
                if(users[u].username == username && users[u].password == password) {
                    return angular.copy(users[u]);
                }

            }
            return null;
        }


        /*
         * Updates the user with the new user information provided.
         * Returns true on success, false on failure.
         */
        function updateUser(userId, user) {

            for (var u in users) {
                if (users[u]._id == userId) {
                    users[u].username = user.username;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].password = user.password;
                    users[u].email = user.email;

                    return true;
                }
            }

            return false;
        }




        /*
         *
         *  Deletes the user from the list.
         *  returns true on success, false on failure.
         */
        function deleteUser(userId) {

            for(var u in users)
            {
                if(users[u]._id == userId) {
                    users.splice(u,1);
                    return true;
                }
            }

            return false;
        }

    }
})();
