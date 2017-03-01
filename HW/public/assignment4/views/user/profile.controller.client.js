(function () {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController)

        function ProfileController($routeParams, $location, UserService) {

            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.updateUser = updateUser;

            function init() {


                var promise = UserService.findUserById(vm.userId);

                promise.success(findUserByIdSuccess);
                promise.error(findUserByIdError);
            }
            init();


            function updateUser(user)
            {
                var promise = UserService.updateUser(vm.userId, user);

                promise.success(successfulUpdate);
                promise.error(failedUpdate);
            }


            //------- Promise functions.
            function successfulUpdate(response) {
                vm.user = response;
            }


            function failedUpdate(response) {
                init();
            }


            function findUserByIdSuccess(response) {

                vm.user = response;
                if(vm.user != undefined || vm.user != null){

                }else{

                    $location.url("/login");
                }
            }


            function findUserByIdError(response) {

                $location.url("/login");
            }
        }

})();