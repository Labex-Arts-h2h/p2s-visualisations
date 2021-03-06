'use strict';
angular.module('p2sAppApp').controller('MapCtrl', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapIsReady',
  function($scope, GoogleMapApi, IsReady) {
    $scope.map = {center: {latitude: 48.865374, longitude: 2.342758 }, zoom: 16, control: {}, markerControl: {} };
    $scope.options = {streetViewControl: false, panControl: false, mapTypeControl: false, maxZoom: 17, minZoom: 14 }; //$scope.infoWindows = { options : { maxWidth: 200 }, control : {}};
    $scope.infoWindows = {options: {visible: false }, control: {} };
    var appleStyle = [{'featureType': 'transit.station.rail', 'stylers': [{'visibility': 'off'}] }, {'featureType': 'water', 'elementType': 'geometry', 'stylers': [{'color': '#a2daf2'}] }, {'featureType': 'landscape.man_made', 'elementType': 'geometry', 'stylers': [{'color': '#f7f1df'}] }, {'featureType': 'landscape.natural', 'elementType': 'geometry', 'stylers': [{'color': '#d0e3b4'}] }, {'featureType': 'landscape.natural.terrain', 'elementType': 'geometry', 'stylers': [{'visibility': 'off'}] }, {'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{'color': '#bde6ab'}] }, {'featureType': 'poi', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}] }, {'featureType': 'poi.medical', 'elementType': 'geometry', 'stylers': [{'color': '#fbd3da'}] }, {'featureType': 'poi.business', 'stylers': [{'visibility': 'off'}] }, {'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{'visibility': 'off'}] }, {'featureType': 'road', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}] }, {'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffe15f'}] }, {'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{'color': '#efd151'}] }, {'featureType': 'road.arterial', 'elementType': 'geometry.fill', 'stylers': [{'color': '#ffffff'}] }, {'featureType': 'road.local', 'elementType': 'geometry.fill', 'stylers': [{'color': 'black'}] }, {'featureType': 'transit.station.airport', 'elementType': 'geometry.fill', 'stylers': [{'color': '#cfb2db'}] }];
    $scope.styles = appleStyle;
    $scope.infoPanelShow = false;
    $scope.directionPanelShow = false;
    $scope.markers = [];
    $scope.markerActifPosition = '';
    // GOOGLE API THEN
    GoogleMapApi.then(function(maps) {
      // Google Direction
      // IsReady.promise().then(function (maps) {
      //     var map = maps[0].map;
      //     console.log(map);
      //     $scope.getDirection(map);
      // });
      $scope.directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      }); // preserveViewport: true
      $scope.directionsService = new google.maps.DirectionsService();
      $scope.getCurrentPosition();
    });
    // END GOOGLE API THEN 
    $scope.getCurrentPosition = function() {
      $scope.posFake = new google.maps.LatLng(48.866625, 2.343695);
      $scope.changePosition($scope.posFake);
      $scope.addMarkerGeoloc($scope.posFake);
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     var pos = new maps.LatLng(position.coords.latitude, position.coords.longitude);         
      //   }, function() {
      //     handleNoGeolocation(true);
      //   });
      // } else {
      //   // Browser doesn't support Geolocation
      //   handleNoGeolocation(false);
      // }
    };
    $scope.addMarkerGeoloc = function(pos) {
      $scope.markers.push({
        id: 0,
        //icon: 'images/blue_marker.png',
        icon: 'images/phone-marker.png',
        // icon: new google.maps.MarkerImage(
        //     'images/phone-marker.png',
        //     new google.maps.Size(220,220), /* size is determined at runtime */
        //     new google.maps.Point(0, 0), /* origin is 0,0 */
        //     new google.maps.Point(110, 110), /* anchor is bottom center of the scaled image */
        //     null
        // ),
        // icon: {
        //   path: google.maps.SymbolPath.CIRCLE,
        //   scale: 10,
        //   strokeColor: '#393',
        //   strokeWeight : 6,
        //   strokeOpacity : 0.8
        // },
        latitude: pos.lat(),
        longitude: pos.lng(),
        showWindow: false,
        title: 'Ma Position',
        options: {
          // labelContent: 'Ma Position',
          labelAnchor: '22 0',
          labelClass: 'marker-labels'
        }
      });
    };
    $scope.changePosition = function(pos) {
      $scope.map.center = {
        latitude: pos.lat(),
        longitude: pos.lng()
      };
    };
    $scope.displayInfoPanel = function(marker, event) {
      $scope.infoPanelShow = false;
      $scope.markerActifPosition = marker.position;
      //$scope.changePosition(marker.position);
      $scope.markerInfo = marker;
    };
    $scope.displayInfoPanelMarker = function(marker, event) {
      $scope.infoPanelShow = true;
      $scope.directionPanelShow = false;
      $scope.closeAllWindows();
      //$scope.changePosition($scope.markerInfo.position);
      offsetCenter($scope.markerInfo.position);
    };
    $scope.closeAllWindows = function() {
      angular.forEach($scope.infoWindows.control.getGWindows(), function(value, key) {
        value.close();
      });
    };
    function clickclick(mousclickmarker, event) {
      console.log($scope.infoWindows);
      $scope.infoWindows = false;
    }
    function markerMouseOver(mousedmarker, event) {}
    function markerMouseOut(mousedmarker, event) {}
    $scope.clickEventsObject = {
      mouseover: markerMouseOver,
      mouseout: markerMouseOut,
      click: $scope.displayInfoPanel
      //click : clickclick
    };
    function offsetCenter(latlng) {
      // latlng is the apparent centre-point
      // offsetx is the distance you want that point to move to the right, in pixels
      // offsety is the distance you want that point to move upwards, in pixels
      // offset can be negative
      // offsetx and offsety are both optional
      var w = window.innerWidth;
      var h = window.innerHeight;
      var pointMapX = (w - (w * (33.33333333333333 / 100))) / 2;
      var pointMapY = h / 2;
      var centerX = w / 2;
      var centerY = h / 2;
      var offsetx = pointMapX - centerX;
      var offsety = centerY - pointMapY;
      var gmapd = $scope.map.control.getGMap();
      var scale = Math.pow(2, gmapd.getZoom());
      var nw = new google.maps.LatLng(gmapd.getBounds().getNorthEast().lat(), gmapd.getBounds().getSouthWest().lng());
      var worldCoordinateCenter = gmapd.getProjection().fromLatLngToPoint(latlng);
      var pixelOffset = new google.maps.Point((offsetx / scale) || 0, (offsety / scale) || 0);
      var worldCoordinateNewCenter = new google.maps.Point(worldCoordinateCenter.x - pixelOffset.x, worldCoordinateCenter.y + pixelOffset.y);
      var newCenter = gmapd.getProjection().fromPointToLatLng(worldCoordinateNewCenter);
      gmapd.setCenter(newCenter);
    }
    $scope.getDirection = function(position) {
      var gmapd = $scope.map.control.getGMap();
      var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true
      });
      var directionsService = new google.maps.DirectionsService();
      var request = {
        origin: $scope.posFake,
        destination: position,
        travelMode: google.maps.TravelMode.WALKING
      };
      directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
      directionsDisplay.setMap(gmapd);
    };
    $scope.getDirectionActif = function() {
      $scope.directionPanelShow = true;
      $scope.infoPanelShow = false;
      $scope.closeAllWindows();
      var gmapd = $scope.map.control.getGMap();
      var request = {
        origin: $scope.posFake,
        destination: $scope.markerActifPosition,
        travelMode: google.maps.TravelMode.WALKING
      };
      $scope.directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          $scope.directionSteps = response.routes[0].legs[0].steps;
          $scope.directionsDisplay.setDirections(response);
        }
      });
      $scope.directionsDisplay.setMap(gmapd);
    };
    //var latadrress = $scope.getLocation(maps, '135, boulevard de menilmontant 75011 paris');
    $scope.getLocation = function(maps, address) {
      console.log(address);
      geocoder = new maps.Geocoder();
      geocoder.geocode({
        'address': address
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          console.log(results[0].geometry.location);
          return results[0].geometry.location;
        } else {
          return false;
        }
      });
    };
    $scope.markers = [{
      id: 1,
      icon: 'images/theatre-marker.png',
      latitude: 48.866133,
      longitude: 2.337598,
      showWindow: false,
      title: 'Théâtre du Palais Royal',
      pieces: [{
        title: 'Le Chapeau de Paille',
        image: 'images/pieces/chapeau-small.jpg'
      }],
      options: {
        labelContent: 'Théâtre du Palais Royal',
        labelAnchor: '55 0',
        labelClass: 'marker-labels',
        content: {
          imageHtmlSmall: 'images/theatre-royal-small.png',
          imageHtml: 'images/theatre-royal.jpg',
          descriptionHtml: 'Le théâtre du Palais-Royal est une salle de spectacles parisienne située 38, rue de Montpensier (1er arr.) et donnant sur les jardins du Palais-Royal. L\'extérieur du bâtiment (façades et toiture) fait l\'objet d\'un classement au titre des monuments historiques depuis le 16 mars 1930, le théâtre en totalité fait l\'objet d\'une inscription depuis le 3 août 19931.'
        }
      }
    }, {
      id: 2,
      icon: 'images/theatre-marker.png',
      latitude: 48.868418,
      longitude: 2.337260,
      showWindow: false,
      title: 'Théâtre Louvois',
      pieces: [{
        title: 'ma piece',
        image: 'images/theatre-louvois.jpg'
      }],
      options: {
        labelContent: 'Théâtre Louvois',
        labelAnchor: '45 0',
        labelClass: 'marker-labels',
        content: {
          imageHtmlSmall: 'images/theatre-louvois-small.png',
          imageHtml: 'images/theatre-louvois.jpg',
          descriptionHtml: 'Le théâtre Louvois est une ancienne salle de spectacles parisienne située au 6, rue de Louvois, dans le 2e arrondissement. Inaugurée en 1791 et fermée en 1825, elle servit de salle d\'opéra de février 1820 à août 1821.'
        }
      }
    }, {
      id: 3,
      icon: 'images/theatre-marker.png',
      latitude: 48.864174,
      longitude: 2.345526,
      showWindow: false,
      title: 'Théâtre de Variétés',
      pieces: [{
        title: 'La Dame Au Camélias',
        image: 'images/pieces/dame-small.jpg'
      }],
      options: {
        labelContent: 'Théâtre de Variétés',
        labelAnchor: '45 0',
        labelClass: 'marker-labels',
        content: {
          imageHtmlSmall: 'images/theatre-varietes-small.png',
          imageHtml: 'images/theatre-varietes.jpg',
          descriptionHtml: 'Le théâtre des Variétés est une salle de spectacles située au 7, boulevard Montmartre dans le 2ᵉ arrondissement de Paris. Inauguré en 1807, c\'est l\'un des plus anciens théâtres parisiens encore en activité.'
        }
      }
    }, {
      id: 4,
      icon: 'images/theatre-marker.png',
      latitude: 48.863585,
      longitude: 2.335938,
      showWindow: false,
      title: 'Comédie Française',
      pieces: [{
        title: 'La Dame Au Camélias',
        image: 'images/pieces/dame-small.jpg'
      }],
      options: {
        labelContent: 'Comédie Française',
        labelAnchor: '40 0',
        labelClass: 'marker-labels',
        content: {
          imageHtmlSmall: 'images/comedie-small.jpg',
          imageHtml: 'images/comedie.jpg',
          descriptionHtml: 'La Comédie-Française ou Théâtre-Français, est une institution culturelle française fondée en 1680 et résidant depuis 1799 salle Richelieu au cœur du Palais-Royal dans le 1ᵉʳ arrondissement de Paris'
        }
      }
    }, {
      id: 5,
      icon: 'images/rotonde-marker.png',
      latitude: 48.867664,
      longitude: 2.338940,
      showWindow: false,
      title: 'La Rotonde',
      pieces: [{}],
      options: {
        labelContent: 'La Rotonde',
        labelAnchor: '30 0',
        labelClass: 'marker-labels',
        content: {
          imageHtmlSmall: 'images/rotonde-small.jpg',
          imageHtml: 'images/rotonde.jpg',
          descriptionHtml: 'La Comédie-Française ou Théâtre-Français, est une institution culturelle française fondée en 1680 et résidant depuis 1799 salle Richelieu au cœur du Palais-Royal dans le 1ᵉʳ arrondissement de Paris'
        }
      }
    }]
  }
]);