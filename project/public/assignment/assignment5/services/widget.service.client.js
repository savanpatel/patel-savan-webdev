(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);



    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "reorderWidget":reorderWidget
        };

        return api;


        /*
         * creates new page, returns true on success.
         *
         */
        function createWidget(pageId, widget) {

            var createWidgetUrl = "/api/page/" + pageId + "/widget";
            return $http.post(createWidgetUrl, widget);
        }


        /*
         * Finds widget list for page id.
         *
         */
        function findWidgetsByPageId(pageId) {

            var findWidgetsByPageIdUrl = "/api/page/" + pageId + "/widget";
            return $http.get(findWidgetsByPageIdUrl);
        }



        /*
         * Finds widget by id.
         *
         */
        function findWidgetById(widgetId) {

           var findWidgetByIdUrl = "/api/widget/" + widgetId;
           return $http.get(findWidgetByIdUrl);
        }



        /*
         * Updates the widget information if found and returns true. returns false on failure.
         */
        function updateWidget(widgetId, widget) {

            var updateWidgetUrl = "/api/widget/" + widgetId;
            return $http.put(updateWidgetUrl, widget);
        }


        /*
         * deletes page from list based on pageId.
         */
        function deleteWidget(widgetId) {

            var deleteWidgetUrl = "/api/widget/" + widgetId;
            return $http.delete(deleteWidgetUrl);
        }


        function reorderWidget(startIndex, endIndex, pageId, widgetId) {
            var reorderItemUrl =
                "/api/page/" + pageId + "/widget";

            var data = {
                initial:startIndex,
                final:endIndex,
                widgetId:widgetId
            };

            return $http.put(reorderItemUrl, data);
        }
    }
})();
