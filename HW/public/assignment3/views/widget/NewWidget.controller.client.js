(function () {

    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController)

        function NewWidgetController($location, WidgetService, $routeParams) {


            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["wid"];

            vm.addWidget = addWidget;
            function init() {

            }

            init();

            function addWidget(widgetType)
            {
                switch (widgetType){
                    case "HEADER":
                        var widget = {size:1, text:"hello"};
                        break;

                    case "IMAGE":
                        var widget = {width:100, url:"http://lorempixel.com/400/200/"};
                        break;

                    case "HTML":
                        var widget = {size:1, text:"<p> Hello </p>"};
                        break;

                    case "YOUTUBE":
                        var widget = {width:"100%", url:"https://youtu.be/AM2Ivdi9c4E"};
                        break;
                }
                widget.widgetType = widgetType;
                var newWidget = WidgetService.createWidget(vm.pageId, widget );

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);

            }
        }



})();