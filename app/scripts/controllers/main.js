'use strict';
angular.module('p2sAppApp').controller('MainCtrl', function($scope, Api) {
    $scope.personnes = Api.Personnes.query();
	$scope.theatres = Api.Theatres.query();
	$scope.pieces = Api.Pieces.query();
    
})
.filter('isAfter', function() {
  return function(items, dateAfter) {
    // Using ES6 filter method
    return items.filter(function(item){
      return moment(item.date).isAfter(dateAfter);
    })
  }
});