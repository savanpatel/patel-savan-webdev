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
                    var u = UserService.createUser(newUser);
                    console.log(u._id);

                    if(u) {
                               $location.url("/user/" + u._id);
                    }
                    else {
                        vm.error = "Server Error! Failed to create user.";
                    }
                }
                else {
                    vm.error = "Passwords do not match!";
                }
            }
        }
})();