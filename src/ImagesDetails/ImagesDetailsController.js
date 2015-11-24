(function()
{
  "use strict";

  var imagesDetailsController = function($scope, $routeParams, flickrService)
  {
    //die twee losers erboven zetten anders roep je iets aan dat nog niet bestaat
    var onImageDownloaded = function(response)
    {
      $scope.image = response;
    };

    var onImageDownloadError = function(err){};

    //image ophalen via flickrService
    $scope.image = flickrService.byId($routeParams.id).then(onImageDownloaded, onImageDownloadError);

  };

  angular.module("app").controller("imagesDetailsController", ["$scope", "$routeParams", "flickrService", imagesDetailsController]);

})();
