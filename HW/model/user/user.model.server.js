module.exports = function (app, mongoose) {

    var q = require('q');

    var userSchema = require('./user.schema.server')(app, mongoose);
    var userModel = mongoose.model('User', userSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCreadentials:findUserByCreadentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };


    return api;

    /*creates a new user*/
    function createUser(user) {

        var deferred = q.defer();
        userModel.create(user, function (err, doc) {
            if(err){
                deferred.abort(err);
            } else {
                //console.log("New user created is: " + doc);
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    /*finds user by id*/
    function findUserById(userId) {

        var deferred = q.defer();
        userModel.findById(userId, function (err, user) {
            if(err) {
                console.log("ERROR: [findUserById]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }


    /* find user by username*/
    function findUserByUsername(username) {

        var deferred = q.defer();

        userModel.findOne({username:username}, function (err, user) {

            if(err){
                console.log("ERROR: [findUserByUsername]: " + err);
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });


        return deferred.promise;
    }

    /*finds user by credentials*/
    function findUserByCreadentials(username, password) {

        var deferred = q.defer();

        userModel.findOne({username:username, password:password}, function (err, user) {

            if(err){
                console.log("ERROR: [findUserByCreadentials]: " + err);
                deferred.abort(err);
            } else {
                deferred.resolve(user);
            }
        });


        return deferred.promise;
    }


    function updateUser(userId, user) {

        var deferred = q.defer();
        userModel.update({_id:userId},{$set:user}, function (err, user) {
            if(err) {
                console.log("ERROR: [updateUser]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
    
    
    function deleteUser(userId) {

        var deferred = q.defer();
        userModel.remove({_id:userId}, function (err) {
            if(err) {
                console.log("ERROR: [updateUser]: " + err);
                deferred.abort(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }
};