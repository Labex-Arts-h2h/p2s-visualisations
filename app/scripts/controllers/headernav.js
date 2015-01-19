'use strict';

/**
 * @ngdoc function
 * @name p2sAppApp.controller:HeadernavCtrl
 * @description
 * # HeadernavCtrl
 * Controller of the p2sAppApp
 */
angular.module('p2sAppApp')
  .controller('HeadernavCtrl', function ($scope, $location) {
	  $scope.isActive = function(viewLocation) {
	    return viewLocation === $location.path();
	  };
  });
