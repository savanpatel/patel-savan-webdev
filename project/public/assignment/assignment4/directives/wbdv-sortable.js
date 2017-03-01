(function () {

    angular
        .module("WebAppMaker")
        .directive("sortableItem", sortableItemDir);

    function sortableItemDir(WidgetService, $location) {


        function linkFunction(scope, element) {

            element.sortable({
                axis: 'y',
                start: sortStart,
                stop: sortEnd
            });

            var startIndex = null;
            var endIndex = null;
            var widgetId = null;
            function sortStart(event, ui) {
                startIndex = ui.item.index();
                widgetId = scope.model.widgetlist[startIndex]._id;
            }

            function sortEnd(event, ui) {
                endIndex = ui.item.index();
                var promise = WidgetService.reorderWidget(startIndex, endIndex, scope.model.pageId, widgetId);

                promise.success(onWidgetReorderSuccess);
                promise.error(onWidgetReorderError);
            }


            function onWidgetReorderSuccess(response) {
                $location.url("/user/" + scope.model.userId + "/website/" + scope.model.websiteId + "/page/" + scope.model.pageId + "/widget");
            }

            function onWidgetReorderError(response) {
                $location.url("/user/" + scope.model.userId + "/website/" + scope.model.websiteId + "/page/" + scope.model.pageId + "/widget");
            }
        }



        return {
            link: linkFunction
        }
    }

})();