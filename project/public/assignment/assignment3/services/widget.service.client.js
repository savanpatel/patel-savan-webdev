(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);



    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name":"Heading1"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum" , "name":"Heading11"},
            { "_id": "345", "widgetType": "IMAGE", "name":"name text","text":"image text",  "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "name":"Heading2"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "1234", "widgetType": "HEADER", "pageId": "322", "size": 2, "text": "GIZMODO", "name":"Heading13e"},
            { "_id": "2344", "widgetType": "HEADER", "pageId": "322", "size": 4, "text": "Heade of size 4" , "name":"Heading54"},
            { "_id": "3453", "widgetType": "IMAGE", "name":"name text", "text":"image text", "pageId": "322", "width": "100%", "url": "http://lorempixel.com/400/200/"},
            { "_id": "4564", "widgetType": "HTML", "pageId": "322", "text": "<p>Some html</p>"},
            { "_id": "5673", "widgetType": "HEADER", "pageId": "322", "size": 4, "text": "Another header of size 4", "name":"Heading675"},
            { "_id": "6785", "widgetType": "YOUTUBE", "pageId": "322", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "7895", "widgetType": "HTML", "pageId": "322", "text": "<p>Lorem ipsum</p>"}
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

            return newWidget;
        }



        /*
         * Finds widget list for page id.
         *
         */
        function findWidgetsByPageId(pageId) {

            var widgetList = [];
            for(var w in widgets) {

                if(widgets[w].pageId == pageId) {
                    widgetList.push(angular.copy(widgets[w]));
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

                if(widgets[w]._id == widgetId) {
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

                 if(widgets[w]._id == widgetId) {

                    switch (widget.widgetType) {

                        case "HEADER": widgets[w].name = widget.name;
                                       widgets[w].size = widget.size;
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

                if(widgets[w]._id == widgetId) {
                    widgets.splice(w, 1);
                    return true;
                }

            }

            return false;
        }

    }
})();
