module.exports = function (app) {


    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    // user schema and model
    require('./user/user.schema.server')(app, mongoose);
    var userModelAPI = require('./user/user.model.server')(app, mongoose);


    //website schema and model
    require('./website/website.schema.server')(app, mongoose);
    var websiteModelAPI = require('./website/website.model.server')(app, mongoose);

    // page schema and model
    require('./page/page.schema.server')(app, mongoose);
    var pageModelAPI = require('./page/page.model.server')(app, mongoose);


    // widget schema and model
    require('./widget/widget.schema.server')(app, mongoose);
    var widgetModelAPI = require('./widget/widget.model.server')(app, mongoose);

    var api = {
        userModelAPI : userModelAPI,
        websiteModelAPI: websiteModelAPI,
        pageModelAPI: pageModelAPI,
        widgetModelAPI: widgetModelAPI
    };

    return api;
}
