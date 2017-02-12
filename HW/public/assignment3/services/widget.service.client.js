(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", UserService);

    function UserService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };

        return api;


        /*
         * creates new page, returns true on success.
         *
         */

        function createWidget(pageId, widget)
        {
            var newWidget = {_id:widgets.length + 1,
                             widgetType:widget.widgetType,
                             pageId: pageId};

            switch (widget.widgetType) {

                case "HEADER": newWidget.size = widget.size;
                               newWidget.text = widget.text;
                               break;

                case "IMAGE": newWidget.width = widget.width;
                              newWidget.url = widget.url;
                              break;

                case "HTML": newWidget.text = widget.text;
                             break;

                case "YOUTUBE": newWidget.width = widget.width;
                                newWidget.url = widget.url;
                                break;
                default:
                    break;
            }

            widgets.push(newWidget);

            return true;
        }



        /*
         * Finds widget list for page id.
         *
         */
        function findWidgetsByPageId(pageId) {

            var widgetList = [];
            for(var w in widgets) {

                if(widgets[w].pageId === pageId) {
                    widgetList.push(widgets[w]);
                }
            }
            return widgetList;
        }



        /*
         * Finds widget by id.
         *
         */
        function findWidgetById(widgetId) {

           for(var w in widgets) {

                if(widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }



        /*
         * Updates the widget information if found and returns true. returns false on failure.
         */
        function updateWidget(widgetId, widget) {

            for(var w in widgets) {

                 if(widgets[w]._id === widgetId) {

                    switch (widget.widgetType) {

                        case "HEADER": widgets[w].size = widget.size;
                                       widgets[w].text = widget.text;
                                       break;

                        case "IMAGE": widgets[w].width = widget.width;
                                      widgets[w].url = widget.url;
                                      break;

                        case "HTML": widgets[w].text = widget.text;
                                     break;

                        case "YOUTUBE": widgets[w].width = widget.width;
                                        widgets[w].url = widget.url;
                                        break;
                        default:
                            break;
                    }
                    return true;
                }
            }

            return false;
        }




        /*
         * deletes page from list based on pageId.
         */
        function deleteWidget(widgetId) {
            for(var w in widgets) {

                if(widgets[w]._id === widgetId) {
                    widgets.splice(p, 1);
                    return true;
                }

            }

            return false;
        }

    }
})();
