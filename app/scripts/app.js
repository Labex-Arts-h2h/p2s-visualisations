'use strict';

angular
  .module('p2sAppApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'uiGmapgoogle-maps',
    'ui.map'
  ])
  .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
    GoogleMapApi.configure({
      //    key: 'your api key',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  }])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('map', {
        url:'/map',
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      });
      $urlRouterProvider.otherwise('/');
  });