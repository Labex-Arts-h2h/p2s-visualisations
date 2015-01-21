'use strict';
angular.module('p2sAppApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngAnimate', 'ui.router', 'uiGmapgoogle-maps', 'angularMoment', 'ngDialog', 'pippTimelineDirectives'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  }).state('map', {
    url: '/map',
    templateUrl: 'views/map.html',
    controller: 'MapCtrl'
  }).state('timeline', {
    url: '/timeline',
    templateUrl: 'views/timeline.html',
    controller: 'TimelineCtrl'
  });
  $urlRouterProvider.otherwise('/');
}).config(['uiGmapGoogleMapApiProvider',
  function(GoogleMapApi) {
    GoogleMapApi.configure({
      //    key: 'your api key',
      v: '3.17',
      language: 'fr',
      libraries: 'weather,geometry,visualization'
    });
  }
]);