(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    var key = "4cbe2f732947fafd1748669fc97f95d3";
    var secret = "a71530853cf8e71c";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


    function FlickrService($http) {


        var api = {
            "searchPhotos": searchPhotos
        };

        return api;


        /*
         * creates new user, returns true on success.
         *
         */

        function searchPhotos(searchTerm)
        {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();


/*
* Key:
 4cbe2f732947fafd1748669fc97f95d3

 Secret:
 a71530853cf8e71c
 */