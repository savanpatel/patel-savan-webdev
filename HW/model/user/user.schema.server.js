/*
*
*   User schema for the database.
*
**/
module.exports = function (app, mongoose) {


    var userSchema = mongoose.Schema({
        username:{type:String, required: true},
        password:{type:String, required:true},
        firstName:{type:String},
        lastName:{type:String},
        email:{type:String},
        phone:{type:Number},
        websites: [{type:mongoose.Schema.Types.ObjectId, ref:'Website'}],
        dateCreated: {type: Date, default: Date.now}
    });

    return userSchema;

};