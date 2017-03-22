(function () {

    angular
        .module("WebAppMaker")
        .controller("FlickrController", FlickrController)

        function FlickrController($location, FlickrService, WidgetService, $routeParams) {

            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["widgetid"];
            vm.searchPhotos = searchPhotos;
            vm.selectPhoto = selectPhoto;

            function init() {
                /*   var promise = WidgetService.findWidgetById(vm.widgetId);
                   promise.success(onFindWidgetByIdSuccess);
                   promise.error(onFindWidgetByIdError);*/
            }

            init();



            function searchPhotos(searchTerm) {
                FlickrService
                    .searchPhotos(searchTerm)
                    .then(function(response) {
                        console.log(response);
                        data = response.data.replace("jsonFlickrApi(","").replace("%20","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    });
            }



            function selectPhoto(photo) {
                var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
                url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

                var redirectUrl = "/user/" + vm.userId + "/website/" + vm.websiteId +
                                  "/page/" + vm.pageId + "/widget/" + vm.widgetId;

                var promise = WidgetService.findWidgetById(vm.widgetId);

                promise.success(function (response) {

                    console.log(response);
                    var w = response;
                    w.url = url;
                    var p = WidgetService.updateWidget(w._id, w);

                    p.success(function (response) {
                        $location.url(redirectUrl);
                    });

                    p.error(function (err) {
                        $location.url(redirectUrl);
                    })

                });


                promise.error(function (err) {
                    $location.url(redirectUrl);
                });
            }


        }



})();