/*
*
*   User schema for the database.
*
**/
module.exports = function (app, mongoose) {


    var pageSchema = mongoose.Schema({
        websiteId:{type: mongoose.Schema.Types.ObjectId, ref:'Website'},
        name:{type:String, required: true},
        title:{type:String},
        description:{type:String},
        widgets: [{type:mongoose.Schema.Types.ObjectId, ref:'Widget'}],
        dateCreated: {type: Date, default: Date.now}
    });

    return pageSchema;

};