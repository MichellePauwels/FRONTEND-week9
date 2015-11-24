(function()
{
  "use strict";

  var flickrservice = function($http)
  {
    //private

    var search = function(tag)
    {
      var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e587331c2d4dcbbcb513da68d2556ba3&tags=" + tag + "&format=json&nojsoncallback=1";
      return $http.get(url).then(function(response)
      {
        var images = [];
        angular.forEach(response.data.photos.photo, function(photo)
        {
          var newFlickrImg = new FlickrImage(photo.id, photo.owner, photo.secret, photo.server, photo.farm, photo.title); //is async

          images.push(newFlickrImg);
        });

        return images;

      }); //geeft promise object uit, lukt of mislukt
    };

    var random = function(){};

    var byId = function(imageId)
    {
      var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=d9412673366d217893d67eef7edc0560&photo_id=" + imageId + "&format=json&nojsoncallback=1";

      return $http.get(url).then(function(response)
      {
        var flickrImg = new FlickrImage(response.data.photo.id, response.data.photo.owner, response.data.photo.secret, response.data.photo.server, response.data.photo.farm, response.data.photo.title); //is async

        return flickrImg;
      });
    };

    //public is t geen dat ge teruggeeft
    return{
      search: search,
      random: random,
      byId: byId
    };
  };

  //&http hier schrijven, belangrijk voor minifyen
  angular.module("app").factory("flickrService", ["$http", flickrservice]);
  //factory is een service da iets teruggeeft

})();
