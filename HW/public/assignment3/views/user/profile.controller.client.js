(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

        function ProfileController($routeParams, $location, UserService) {

            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.updateUser = updateUser;

            function init() {
                vm.user = UserService.findUserById(vm.userId);

                if(vm.user != undefined || vm.user != null){

                }else{

                    $location.url("/login");
                }
            }
            init();


            function updateUser(user)
            {
                UserService.updateUser(vm.userId, user);
            }
        }

})();