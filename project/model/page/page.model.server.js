module.exports = function (app, mongoose) {

    var q = require('q');

    var pageSchema = require('./page.schema.server')(app, mongoose);
    var pageModel = mongoose.model('Page', pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };

    return api;


    function createPage(websiteId, page) {

        page.websiteId = websiteId;

        var deferred = q.defer();

        pageModel.create(page, function (err, res) {
            if(err){
                console.log("Error [createPage]: " + err);
                deferred.reject(err);
            } else{
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }



    function findAllPagesForWebsite(websiteId) {
        var deferred = q.defer();
        pageModel.find({websiteId: websiteId}, function (err, res) {
            if(err) {
                console.log("Error [findAllPagesForWebsite]: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }


    function findPageById(pageId) {
        var deferred = q.defer();
        pageModel.findById(pageId, function (err, page) {
            if(err) {
                console.log("ERROR: [findPageById]: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(page);
            }
        });

        return deferred.promise;

    }



    function updatePage(pageId, page) {
        var deferred = q.defer();
        pageModel.update({_id:pageId},{$set:page}, function (err, doc) {
            if(err) {
                console.log("ERROR: [updatePage]: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    function deletePage(pageId) {
        var deferred = q.defer();
        pageModel.remove({_id:pageId}, function (err) {
            if(err) {
                console.log("ERROR: [deletePage]: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }

};