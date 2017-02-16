(function () {

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)

        function WidgetListController($sce, $location, WidgetService, $routeParams) {

            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetlist = null;
            vm.widgetlist = WidgetService.findWidgetsByPageId(vm.pageId);
            vm.getWidgetHTML = getWidgetHTML;
            vm.checkSafeURL = checkSafeURL;
            vm.getSafeHTML = getSafeHTML;
            function init() {
                vm.widgetlist = WidgetService.findWidgetsByPageId(vm.pageId);
                console.log("Widget list size : " + vm.widgetlist.length);
            }

            init();

            function getWidgetHTML(w) {

                switch (w.widgetType) {
                    case "HEADER":
                        return generateHeader(w.size, w);
                    case "IMAGE" :
                        return generateImageTag(w);
                    case "HTML"  :
                        return w.text;
                    case "YOUTUBE":
                        return generateYouTubeTag(w);
                    default :
                        return "<p> " + w.text + " </p>";
                }
            }

            function generateHeader(size, w) {

                switch (size) {

                    case 5:
                        return "<h5 class=\"pull-left\">" + w.text + "</h5>";
                    case 4:
                        return "<h4 class=\"pull-left\">" + w.text + "</h4>";
                    case 3:
                        return "<h3 class=\"pull-left\">" + w.text + "</h3>";
                    case 2:
                        return "<h2 class=\"pull-left\">" + w.text + "</h2>";
                    case 1:
                        return "<h1 class=\"pull-left\">" + w.text + "</h1>";
                    default:
                        return "<h2 class=\"pull-left\">" + w.text + "</h2>";

                }
            }


            function generateImageTag(w) {

                return "<img src=\"" + w.url + "\"class=\"img-responsive\" alt=\"Minion\" width=\"100%\" height=\"236\"/>";
            }


            function generateYouTubeTag(w) {

                console.log("returning " + "<iframe class=\"col-sm-12\" height=\"333\" width=\"100%\" frameborder=\"0\" wmode=\"Opaque\" allowfullscreen=\"\" ng-src=\"{{w.url}}\"></iframe>");
                return "<iframe class=\"col-sm-12\" height=\"333\" width=\"100%\" frameborder=\"0\" wmode=\"Opaque\" allowfullscreen=\"\" ng-src=\"" + w.url + "\"></iframe>";

            }

            function checkSafeURL(widgetUrl) {

                var parts = widgetUrl.split('/');
                var id = parts[parts.length - 1];
                var url = "https://www.youtube.com/embed/" + id;
                return $sce.trustAsResourceUrl(url);
            }

            function getSafeHTML(text) {
                return $sce.trustAsHtml(text);
            }
        }
})();