module.exports = function (app, mongoose) {


    var q = require('q');

    var widgetSchema = require('./widget.schema.server')(app, mongoose);
    var widgetModel= mongoose.model('Widget', widgetSchema);

    var api = {

        createWidget:createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        deleteMultiWidgets:deleteMultiWidgets,
        insertMulti:insertMulti
    };

    return api;

  
    function createWidget(pageId, widget) {
        widget._page = pageId;

        var deferred = q.defer();

        widgetModel.create(widget, function (err, res) {
            if(err){
                console.log("Error [createWidget]: " + err);
                deferred.abort(err);
            } else{
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }
    

    function findAllWidgetsForPage(pageId) {

        var deferred = q.defer();

        widgetModel.find({pageId: pageId}, function (err, res) {
            if(err) {
                console.log("Error [findAllWidgetsForPage]: " + err);
                deferred.abort(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }



    function findWidgetById(widgetId) {
        var deferred = q.defer();
        widgetModel.findById(widgetId, function (err, widget) {
            if(err) {
                console.log("ERROR: [findWidgetById]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(widget);
            }
        });

        return deferred.promise;

    }



    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        widgetModel.update({_id:widgetId},{$set:widget}, function (err, doc) {
            if(err) {
                console.log("ERROR: [updateWidget]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }




    function deleteWidget(widgetId) {
        var deferred = q.defer();
        widgetModel.remove({_id:widgetId}, function (err) {
            if(err) {
                console.log("ERROR: [deleteWidget]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }

    function deleteMultiWidgets(widgetIdList) {
        var deferred = q.defer();
        widgetModel.remove({_id: {$in: widgetIdList}},function (err) {
            if(err) {
                console.log("ERROR: [deleteMultiWidgets]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }


    function insertMulti(widgets) {
        var deferred = q.defer();

        widgetModel.insertMany(widgets, function (err, docs) {
            if(err) {
                console.log("ERROR: [insertMulti]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }
};