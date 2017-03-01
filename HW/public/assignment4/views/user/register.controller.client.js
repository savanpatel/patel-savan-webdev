(function () {

    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController)

        function RegisterController($location, UserService) {

            var vm = this;
            vm.register = register;

            function init() {
            }
            init();


            function register(user) {

                if(user.password === user.repassword)
                {
                    var newUser = {username: user.username,
                                   password: user.password,
                                   firstName:user.firstName,
                                   lastName: user.lastName,
                                   email: user.email};
                    var promise = UserService.createUser(newUser);

                    promise.success(onRegisterSuccess);
                    promise.error(onRegisterError);
                }
                else {
                    vm.error = "Passwords do not match!";
                }
            }


            // Promise functions.
            function onRegisterSuccess(response) {

                var u = response;
                if(u) {
                    $location.url("/user/" + u._id);
                }
                else {
                    vm.error = "Server Error! Failed to create user.";
                }
            }

            function onRegisterError(response) {
                vm.error = "Server Error! Failed to create user. Error : " + response;
            }
        }
})();