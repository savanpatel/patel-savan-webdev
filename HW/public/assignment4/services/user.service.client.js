(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var USER_SERVICE_URL = "/api/user";


    function UserService($http) {


        var api = {
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
            var createUserUrl = USER_SERVICE_URL;
            return $http.post(createUserUrl, user);
        }



        /*
         * Finds user by userid, returns null on failure.
         *
         */
        function findUserById(id) {

            var findUserByIdUrl = USER_SERVICE_URL + "/" + id;
            return $http.get(findUserByIdUrl);
        }



        /*
         * Finds user by username, returns null on failure.
         *
         */
        function findUserByUsername(username){
            var findUserUrl = USER_SERVICE_URL + "?username="+username;
            return $http.get(findUserUrl);
        }


        /*
         * returns user if username and password matches, null otherwise.
         *
         */
        function findUserByCredentials(username, password){

            var getRequestUrl =
                USER_SERVICE_URL + "?username=" + username + "&password="+password;
            return $http.get(getRequestUrl);
        }


        /*
         * Updates the user with the new user information provided.
         * Returns true on success, false on failure.
         */
        function updateUser(userId, user) {
            var putRequestUrl = USER_SERVICE_URL + "/" + user._id;
            return $http.put(putRequestUrl, user);
        }




        /*
         *
         *  Deletes the user from the list.
         *  returns true on success, false on failure.
         */
        function deleteUser(userId) {

            var deleteUserUrl = USER_SERVICE_URL + "/" + userId;
            return $http.delete(deleteUserUrl);
        }

    }
})();