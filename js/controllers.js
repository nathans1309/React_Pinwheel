var artistControllers = angular.module('artistControllers',[]);

artistControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.artists = data;
    $scope.artistOrder='name';
  });

  $('.nav').on('click','img',function(e){
    var theName=$(this).attr('name');
    var currArtist

    currArtist= $.grep($scope.artists,function(n){
      return n.name===theName;
    })[0];

    $('#mainImg').fadeOut(1000,function(){
        $('#mainImg').attr("src","images/"+currArtist.shortname+"_tn.jpg");
      })
      .fadeIn(1000);
  });

}]);