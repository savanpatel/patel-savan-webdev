(function () {

    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

        function LoginController($location, UserService) {

            var vm = this;

            vm.login = login;


            /*
             *  Logs in the user if correct credentials are passed. Redirects to profile page if successful.
             */
            function login(user) {

                 console.log(user);
                 user = UserService.findUserByCredentials(user.username, user.password);

                 if(user) {
                     $location.url("/user/" + user._id);
                 }
                 else {
                     alert("Invalid Credentials");
                 }
            }


        }


})();