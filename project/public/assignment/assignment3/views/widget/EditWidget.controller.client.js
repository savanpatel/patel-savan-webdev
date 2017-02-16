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

            function init() {


                vm.w = WidgetService.findWidgetById(vm.widgetId);
            }

            init();

            function updateWidget() {

                console.log("Updating widget with id : " + vm.w._id)
                WidgetService.updateWidget(vm.w._id, vm.w);

                vm.w = WidgetService.findWidgetById(vm.widgetId);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                vm.widgetlist = WidgetService.findWidgetsByPageId(vm.pageId);
            }

            function deleteWidget() {
                console.log("Returned : " + WidgetService.deleteWidget(vm.widgetId));
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                vm.widgetlist = WidgetService.findWidgetsByPageId(vm.pageId);
                console.log("Widget list size : " + vm.widgetlist.length);
            }

            vm.headingSizes = [1,2,3,4,5];

        }



})();