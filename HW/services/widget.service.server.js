module.exports = function (app, mongooseAPI) {

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


    var pageModel = mongooseAPI.pageModelAPI;
    var widgetModel = mongooseAPI.widgetModelAPI;


    function createWidget(req, res) {

        var pageId = req.params.pageId;
        var widget = req.body;
        if(null == pageId || null == widget){
            res.send(500);
        }
        else{
            createWidgetHelper(pageId, widget, res);
        }

    }



    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;
        if(null == pageId){

            res.send(500);
        }else{

            widgetModel.findAllWidgetsForPage(pageId)
                .then(function (widgets) {
                    res.send(widgets);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    }



    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;

        if(null == widgetId){
            res.send(500);
        }
        else{
            widgetModel.findWidgetById(widgetId)
                .then(function (widget) {
                    res.send(widget);
                },function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    }



    function updateWidget(req, res) {

        var widgetId = req.params.widgetId;
        var widget = req.body;

        if(null == widgetId || null == widget){
            res.send(500);
        }
        else{

            widgetModel.updateWidget(widgetId, widget)
                .then(function (resp) {
                    res.send(widget);
                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }

    }




    function deleteWidget(req, res) {

        var widgetId = req.params.widgetId;

        if(null == widgetId){
            res.send(500);
        }
        else{

            widgetModel.deleteWidget(widgetId)
                .then(function (status) {
                    res.sendStatus(status);
                }, function (err) {
                    res.sendStatus(err).send(err);
                });
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

      //  var widgetList = findAllWidgetsForPageHelper(pageId);

        var widgetList = [];

        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                var widgetList = widgets;
                var widgetListIds = [];

                for(var w in widgetList){

                    widgetListIds.push(widgetList[w]._id);

                }

                widgetModel.deleteMultiWidgets(widgetListIds)
                    .then(function (status) {

                        var tempWidget = JSON.parse(JSON.stringify(widgetList[widgetIndexInfo.initial]));
                        widgetList.splice(widgetIndexInfo.initial, 1);

                        widgetList.splice(widgetIndexInfo.final, 0, tempWidget);

                        widgetModel.insertMulti(widgetList)
                            .then(function (status) {
                                res.sendStatus(200);

                            }, function (err) {
                                res.sendStatus(200).send(err);
                            });

                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });

            }, function (err) {
                // do nothing.
            });



        /*widgets = widgets.filter( function( w ) {
            return widgetList.indexOf( w ) < 0;
        } );


        var tempWidget = JSON.parse(JSON.stringify(widgetList[widgetIndexInfo.initial]));
        widgetList.splice(widgetIndexInfo.initial, 1);

        widgetList.splice(widgetIndexInfo.final, 0, tempWidget);

        for(var w in widgetList){
            widgets.push(widgetList[w]);
        }*/
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


        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {

                widget.url = "localhost:3000/uploads/" + filename;
                widget.isUploaded = true;

                widgetModel.updateWidget(widget._id, widget)
                    .then(function (resp) {
                        res.redirect("/assignment4/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
                    }, function (err) {
                        res.redirect("/assignment4/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
                    });
            }, function (err) {
                res.redirect("/assignment4/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
            });

    }
    /*-----------------------------------------------------------------------*/

    function createWidgetHelper(pageId, widget, res)
    {
        var newWidget = widget;

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

        newWidget.pageId = pageId;

        widgetModel.createWidget(pageId, newWidget)
            .then(function (widget) {
                updatePageForNewWidget(pageId, widget, res);
            }, function (err) {
                res.sendStatus(500).send(widget);
            });
    }



    function updatePageForNewWidget(pageId, widget, res) {

        pageModel.findPageById(pageId)
            .then(function (dbPage) {
                 dbPage.widgets.push(widget._id);

                pageModel.updatePage(pageId, dbPage)
                    .then(function (resp) {
                        res.send(widget);
                    }, function (err) {
                        res.sendStatus(500).send(err);
                    });
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }



    /**//****/
    function findAllWidgetsForPageHelper(pageId) {

        var widgetList = [];

        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                widgetList = widgets;
            }, function (err) {
               // do nothing.
            });



        /*for(var w in widgets) {
            if(widgets[w].pageId == pageId) {
                widgetList.push(widgets[w]);
            }
        }*/
        return widgetList;
    }

}