(function () {

    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController)

        function EditWidgetController($location, WidgetService, $routeParams) {


            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["widgetid"];
            vm.deleteWidget = deleteWidget;
            vm.updateWidget = updateWidget;
            vm.searchFlickr = searchFlickr;

            function init() {
                var promise = WidgetService.findWidgetById(vm.widgetId);
                promise.success(onFindWidgetByIdSuccess);
                promise.error(onFindWidgetByIdError);
            }

            init();

            function updateWidget() {

                var promise = WidgetService.updateWidget(vm.w._id, vm.w);
                promise.success(onUpdateWidgetSuccess);
                promise.error(onUpdateWidgetError);
             }

            function deleteWidget() {
                var promise = WidgetService.deleteWidget(vm.w._id);

                promise.success(onDeleteWidgetSuccess);
                promise.error(onDeleteWidgetError);
            }

            
            function searchFlickr() {
                console.log("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId + "/flickr");
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId + "/flickr");
            }
            vm.headingSizes = [1,2,3,4,5];


            // promise functions.
            function onFindWidgetByIdSuccess(response) {
                vm.w = response;
            }

            function onFindWidgetByIdError(response) {
                vm.w = null;
            }


            function onUpdateWidgetSuccess(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }

            function onUpdateWidgetError(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }


            function onDeleteWidgetSuccess(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }

            function onDeleteWidgetError(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
        }



})();