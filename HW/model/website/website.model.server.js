module.exports = function (app, mongoose) {

    var q = require('q');

    var websiteSchema = require('./website.schema.server')(app, mongoose);
    var websiteModel = mongoose.model('Website', websiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite
    };

    return api;


    function createWebsiteForUser(userId, website){
        website.developerId = userId;

        var deferred = q.defer();

        websiteModel.create(website, function (err, res) {
            if(err){
                console.log("Error [createWebsiteForUser]: " + err);
                deferred.abort(err);
            } else{
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }




    function findAllWebsitesForUser(userId) {

        var deferred = q.defer();

        websiteModel.find({developerId: userId}, function (err, res) {
            if(err) {
                console.log("Error [findAllWebsitesForUser]: " + err);
                deferred.abort(err);
            } else {
                deferred.resolve(res);
            }
        });

        return deferred.promise;
    }




    function findWebsiteById(websiteId) {

        var deferred = q.defer();
        websiteModel.findById(websiteId, function (err, website) {
            if(err) {
                console.log("ERROR: [findWebsiteById]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(website);
            }
        });

        return deferred.promise;
    }



    function updateWebsite(websiteId, website) {

        var deferred = q.defer();
        websiteModel.update({_id:websiteId},{$set:website}, function (err, website) {
            if(err) {
                console.log("ERROR: [updateWebsite]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(website);
            }
        });

        return deferred.promise;

    }




    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        websiteModel.remove({_id:websiteId}, function (err) {
            if(err) {
                console.log("ERROR: [deleteWebsite]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }
};