/*
*
*   User schema for the database.
*
**/
module.exports = function (app, mongoose) {


    var widgetSchema = mongoose.Schema({
        pageId:{type: mongoose.Schema.Types.ObjectId, ref:'Page'},
        widgetType:{type:String, enum:['HEADER', 'IMAGE', 'YOUTUBE', 'INPUT', 'HTML', 'TEXT'], default: 'HEADING'},
        name:{type:String},
        size:{type:Number},
        text:{type:String},
        placeholder:{type:String},
        description:{type:String},
        url:{type:String},
        width:{type:String},
        height:{type:String},
        rows: {type:Number},
        class:{type:String},
        icon:{type:String},
        deletable:{type:Boolean},
        formatted:{type:Boolean},
        isUploaded:{type:Boolean, default:false},
        dateCreated: {type: Date, default: Date.now}
    });

    return widgetSchema;

};