/*
*
*   User schema for the database.
*
**/
module.exports = function (app, mongoose) {


    var websiteSchema = mongoose.Schema({
        developerId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        name:{type:String, required:true},
        description:{type:String, required:true},
        pages: [{type:mongoose.Schema.Types.ObjectId, ref:'Page'}],
        dateCreated: {type: Date, default: Date.now}
    });

    return websiteSchema;

};