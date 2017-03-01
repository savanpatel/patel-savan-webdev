module.exports = function (app) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../public/uploads' });
    var path = require('path');


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", reorderWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    /*-----------------------------------------------------------------------*/
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

    /*-----------------------------------------------------------------------*/

    function createWidget(req, res) {

        var pageId = req.params.pageId;
        var widget = req.body;
        if(null == pageId || null == widget){
            res.send(500);
        }
        else{
            var newWidget = createWidgetHelper(pageId, widget);
            res.send(newWidget);
        }

    }



    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;
        if(null == pageId){

            res.send(500);
        }else{
            var pageList = findAllWidgetsForPageHelper(pageId);
            res.send(pageList);
        }
    }



    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;

        if(null == widgetId){
            res.send(500);
        }
        else{
            var widget = findWidgetByIdHelper(widgetId);
            if(null == widget){
                res.send(404);
            }else{
                res.send(widget);
            }
        }
    }



    function updateWidget(req, res) {

        var widgetId = req.params.widgetId;
        var widget = req.body;

        if(null == widgetId || null == widget){
            res.send(500);
        }
        else{
            var updatedWidget = updateWidgetHelper(widgetId, widget);
            res.send(updatedWidget);
        }

    }




    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        if(null == widgetId){
            res.send(500);
        }
        else{

            if(deleteWidgetHelper(widgetId)){
                res.send(200);
            }
            else{
                res.send(404);
            }
        }
    }

    function reorderWidget(req, res) {

        var widgetIndexInfo = req.body;

        if(widgetIndexInfo.initial == widgetIndexInfo.final)
        {
            res.send(200);
            return;
        }

        var pageId = req.params.pageId;

        var widgetList = findAllWidgetsForPageHelper(pageId);

        widgets = widgets.filter( function( w ) {
            return widgetList.indexOf( w ) < 0;
        } );


        var tempWidget = JSON.parse(JSON.stringify(widgetList[widgetIndexInfo.initial]));
        widgetList.splice(widgetIndexInfo.initial, 1);

        widgetList.splice(widgetIndexInfo.final, 0, tempWidget);

        for(var w in widgetList){
            widgets.push(widgetList[w]);
        }
        res.send(200);
    }
    
    
    
    function uploadImage(req, res) {

        console.log("In file upload");
        console.log(req.body);
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = findWidgetByIdHelper(widgetId);
        widget.url = "localhost:3000/uploads/" + filename;
        widget.isUploaded = true;
        res.redirect("/assignment4/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");



    }
    /*-----------------------------------------------------------------------*/

    function createWidgetHelper(pageId, widget)
    {
        var newWidget = {_id:widgets.length + 1,
            widgetType:widget.widgetType,
            pageId: pageId};

        switch (widget.widgetType) {

            case "HEADER":
                newWidget.size = widget.size;
                newWidget.text = widget.text;
                break;

            case "IMAGE":
                newWidget.width = widget.width;
                newWidget.url = widget.url;
                break;

            case "HTML":
                newWidget.text = widget.text;
                break;

            case "YOUTUBE":
                newWidget.width = widget.width;
                newWidget.url = widget.url;
                break;

            default:
                break;
        }

        widgets.push(newWidget);

        return newWidget;
    }




    function findAllWidgetsForPageHelper(pageId) {

        var widgetList = [];

        for(var w in widgets) {
            if(widgets[w].pageId == pageId) {
                widgetList.push(widgets[w]);
            }
        }
        return widgetList;
    }



    function findWidgetByIdHelper(widgetId) {

        for(var w in widgets) {

            if(widgets[w]._id == widgetId) {
                return widgets[w];
            }
        }
        return null;
    }



    function updateWidgetHelper(widgetId, widget) {

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
                return widgets[w];
            }
        }

        return null;
    }



    function deleteWidgetHelper(widgetId) {
        for(var w in widgets) {

            if(widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                return true;
            }

        }

        return false;
    }
}