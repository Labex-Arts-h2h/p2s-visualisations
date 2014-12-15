'use strict';
angular.module('p2sAppApp').factory('Api', ['$resource',
 function($resource) {
  var serviceBase = 'http://37.187.43.239:5000'
  return {
    Theatres: $resource(serviceBase+'/theatres/:id', {id: '@id'},
    {
      update: { method: 'PUT', params: {id: '@id'} }
    }),
    Pieces: $resource(serviceBase+'/pieces/:id', {id: '@id'},
    {
      update: { method: 'PUT', params: {id: '@id'} }
    }),
    Links: $resource(serviceBase+'/links/:id', {id: '@id'},
    {
      update: { method: 'PUT', params: {id: '@id'} }
    }),
    Personnes:  $resource(serviceBase+'/personnes/:id', {id: '@id'},
          {
      update: { method: 'PUT', params: {id: '@id'} }
    }),
    Ressources:  $resource(serviceBase+'/ressources/:id', {id: '@id'},
          {
      update: { method: 'PUT', params: {id: '@id'} }
    }),
    Events:  $resource(serviceBase+'/events/:id', {id: '@id'},
          {
      update: { method: 'PUT', params: {id: '@id'} }
    }),
    Lieux:  $resource(serviceBase+'/lieux/:id', {id: '@id'},
          {
      update: { method: 'PUT', params: {id: '@id'} }
    })
  };
}]);
