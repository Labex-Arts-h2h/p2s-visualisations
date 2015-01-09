'use strict';
angular.module('p2sAppApp').controller('MainCtrl', function($scope, DateRanges, Api, ngDialog) {
  $scope.personnes = Api.Personnes.query();
  $scope.theatres = Api.Theatres.query();
  $scope.pieces = Api.Pieces.query();
  $scope.links = Api.Links.query();
  console.log($scope.links);

    $scope.dateRanges = DateRanges;
    $scope.datePeriode = $scope.dateRanges[0];


	
})
.filter('isAfter', function() {
  return function(items, datePeriode, type) {
    // Using ES6 filter method
    return items.filter(function(item){
	    return moment(item.dates[0].date).isAfter(datePeriode.dateBegin) && moment(item.dates[0].date).isBefore(datePeriode.dateEnd);
    })
  }
})
.value('DateRanges', [
  {name:'De tout temps', dateBegin:moment("01-01-0001", "MM-DD-YYYY"), dateEnd: new Date()},
  {name:'1750-1800', dateBegin:moment("01-01-1750", "MM-DD-YYYY"), dateEnd:moment("01-01-1800", "MM-DD-YYYY")},
  {name:'1800-1850', dateBegin:moment("01-01-1800", "MM-DD-YYYY"), dateEnd:moment("01-01-1850", "MM-DD-YYYY")}
]);