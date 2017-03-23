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
                        var widget = {size:1, text:""};
                        break;

                    case "YOUTUBE":
                        var widget = {width:"100%", url:"https://youtu.be/AM2Ivdi9c4E"};
                        break;
                    case "TEXT":
                        var widget = {text:"Hello World"};
                        break;
                }
                widget.widgetType = widgetType;
                var promise = WidgetService.createWidget(vm.pageId, widget );

                promise.success(onAddWidgetSuccess);
                promise.error(onAddWidgetError);
            }


            // promise functions.
            function onAddWidgetSuccess(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + response._id);
            }

            function onAddWidgetError(response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
            }
        }



})();