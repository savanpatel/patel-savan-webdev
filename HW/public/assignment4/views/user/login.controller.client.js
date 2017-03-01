(function () {

    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

        function LoginController($location, UserService) {

            var vm = this;

            vm.login = login;
            vm.error = null;


            /*
             *  Logs in the user if correct credentials are passed. Redirects to profile page if successful.
             */
            function login(user) {

                 if(null == user)
                 {
                     vm.error = "Invalid Credentials";
                     return;
                 }


                 var promise = UserService.findUserByCredentials(user.username, user.password);

                 promise.success(successfulLogin);
                 promise.error(failedLogin);
            }


            //-----------------Promise functions.

            function successfulLogin(response)
            {
                var user = response;
                if(user) {
                    $location.url("/user/" + user._id);
                }
                else {
                    vm.error = "Invalid Credentials";
                }
            }


            function failedLogin(response) {

                vm.error = "Could not find user.  [Error : " + response + "]";
            }
        }


})();