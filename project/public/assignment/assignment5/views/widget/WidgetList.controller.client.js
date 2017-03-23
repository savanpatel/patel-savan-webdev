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
            vm.checkSafeURL = checkSafeURL;
            vm.checkSafeURLImage = checkSafeURLImage;
            vm.getSafeHTML = getSafeHTML;

            function init() {
                var promise = WidgetService.findWidgetsByPageId(vm.pageId);

                promise.success(onFindWidgetsByPageIdSuccess);
                promise.error(onFindWidgetsByPageIdError);
            }

            init();

            function checkSafeURL(widgetUrl) {

                var parts = widgetUrl.split('/');
                var id = parts[parts.length - 1];
                var url = "https://www.youtube.com/embed/" + id;
                return $sce.trustAsResourceUrl(url);
            }


            function checkSafeURLImage(widgetUrl, isUploaded) {

                var url = widgetUrl;

                if(isUploaded != undefined && isUploaded == true){

                    var parts = widgetUrl.split('/');
                    var id = parts[parts.length - 1];
                    url = "http://ec2-54-218-218-127.us-west-2.compute.amazonaws.com/uploads/"+ id;
                }

                return $sce.trustAsResourceUrl(url);
            }


            function getSafeHTML(text) {
                return $sce.trustAsHtml(text);
            }


            // promise functions.
            function onFindWidgetsByPageIdSuccess(response){
                vm.widgetlist = response;
            }


            function onFindWidgetsByPageIdError(response){
                vm.widgetlist = null;
            }

        }
})();