(function()
{
  "use strict";

  var FlickrController = function($scope, flickrService) //alle params hier ook beneden schrijven
  {
    //scopes
    $scope.searchQuery = "dog";
    $scope.images = [];
    $scope.searchImages = function()
    {
      $scope.images = null; //voor wachten ding

      //private var, elke dag een nieuwe api key https://www.flickr.com/services/api/explore/flickr.photos.search
      //var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e587331c2d4dcbbcb513da68d2556ba3&tags=" + $scope.searchQuery + "&format=json&nojsoncallback=1";

      //$http.get(url).then(onImagesDownloaded, onImagesDownloadError); //gelukt downloaded, mislukt onerror

      flickrService.search($scope.searchQuery).then(onImagesDownloaded, onImagesDownloadError); //weer een promise met gelukte en mislukte
    };

    $scope.sortProperty = "title";
    $scope.filterQuery = "";

    $scope.checkandStyleTitle = function(i)
    {
      if(!i.title || i.title === "")
      {
        return "flickrNoTitle";
      }
    }

    $scope.filterImages = function(i)
    {
      if($scope.filterQuery === "")
      {
        return true;
      }

      if(i.title.toLowerCase().indexOf($scope.filterQuery.toLowerCase()) >= 0)
      {
        return true;
      }

      return false;

    };

    var onImagesDownloaded = function(response)
    {
      //https://www.flickr.com/services/api/explore/flickr.photos.search

      /*
      $scope.images = [];
      angular.forEach(response.data.photos.photo, function(photo)
      {
        var newFlickrImg = new FlickrImage(photo.id, photo.owner, photo.secret, photo.server, photo.farm, photo.title); //is async

        $scope.images.push(newFlickrImg);

      }); //angular forloop
      */

      $scope.images = response;

    };
    var onImagesDownloadError = function(err){};
    /*
    var searchImages = function()
    {
      $http.get(url).then(onImagesDownloaded, onImagesDownloadError); //gelukt downloaded, mislukt onerror
    };
    */

  };

  angular.module("app").controller("FlickrController", ["$scope", "flickrService", FlickrController]); //$http is een get/post/put/delete uit te voeren, om de zoveel tijd iets ophalen

})();
