(function()
{
  "use strict";

  var app = angular.module("app", ["ngRoute"]); //array zijn uw dependencies

  app.config(function($routeProvider) //$ toont aan dat het een angular var is
  {
    $routeProvider.when("/search",
                  {
                    templateUrl: "ImagesOverview/search.html"
                  })
                  .when("/details/:id",
                  {
                      templateUrl: "ImagesDetails/details.html",
                      controller: "imagesDetailsController"
                  })
                  .otherwise(
                  {
                    redirectTo: "/search"
                  });
  });

  app.directive("flickrimage", function()
  {
    return{
      restrict: "E",
      templateUrl: "directives/flickrimage.html"
    };
  });

})();
