'use strict';

angular.module('p2sAppApp').controller('MapCtrl', ['$scope',
  function($scope) {
    
    $scope.myMarkers = [];
    // STYLE MAP
    var appleStyle = [{"featureType": "transit.station.rail", "stylers": [{"visibility": "off"}] }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#a2daf2"}] }, {"featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{"color": "#f7f1df"}] }, {"featureType": "landscape.natural", "elementType": "geometry", "stylers": [{"color": "#d0e3b4"}] }, {"featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [{"visibility": "off"}] }, {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#bde6ab"}] }, {"featureType": "poi", "elementType": "labels", "stylers": [{"visibility": "off"}] }, {"featureType": "poi.medical", "elementType": "geometry", "stylers": [{"color": "#fbd3da"}] }, {"featureType": "poi.business", "stylers": [{"visibility": "off"}] }, {"featureType": "road", "elementType": "geometry.stroke", "stylers": [{"visibility": "off"}] }, {"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "off"}] }, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffe15f"}] }, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#efd151"}] }, {"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}] }, {"featureType": "road.local", "elementType": "geometry.fill", "stylers": [{"color": "black"}] }, {"featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [{"color": "#cfb2db"}] }];
    // OPTION STYLE
    $scope.map = {
       center: new google.maps.LatLng(48.865374, 2.342758),
       zoom: 15,
       options: {
         streetViewControl: false,
         panControl: false,
         maxZoom: 20,
         minZoom: 3,
         styles: appleStyle
       }
    };
    // MARKERS
    $scope.markers = [{
      id: 1,
      icon: 'images/blue_marker.png',
      latitude: 48.866133,
      longitude: 2.337598,
      showWindow: false,
      title: 'Théâtre du Palais Royal',
      options: {
        labelContent: 'Théâtre du Palais Royal',
        labelAnchor: "22 0",
        labelClass: "marker-labels"
      }
    }, {
      id: 2,
      icon: 'images/blue_marker.png',
      latitude: 48.868418,
      longitude: 2.337260,
      showWindow: false,
      title: 'Théâtre Louvois',
      options: {
        labelContent: 'Théâtre Louvois',
        labelAnchor: "22 0",
        labelClass: "marker-labels"
      }
    }, {
      id: 3,
      icon: 'images/blue_marker.png',
      latitude: 48.864174,
      longitude: 2.345526,
      showWindow: false,
      title: 'Théâtre de Variétés',
      options: {
        labelContent: 'Théâtre de Variétés',
        labelAnchor: "22 0",
        labelClass: "marker-labels"
      }
    }]



	var initialize = function() {
		console.log("load");
	}
	google.maps.event.addDomListener(window, 'tilesloaded', initialize);


	$scope.$watch('myMap', function(map) {
	  if (map) {

		$scope.addMarkers(map);
		//$scope.getDirection(map);
	  }
	});

    $scope.addMarkers = function(map) {
	  	// MARKER EACH
		angular.forEach($scope.markers, function(value, key) {
			var marker = new google.maps.Marker({
		    	map: $scope.myMap,
		    	icon : value.icon,
		    	title : value.title,
		    	position: new google.maps.LatLng(value.latitude, value.longitude)
		    });
		    var infowindow = new google.maps.InfoWindow({ content : value.title});
		    google.maps.event.addListener(marker, 'click', function() {
				$scope.markerInfo = value.title;
			  infowindow.open($scope.myMap,marker);
			});
		    $scope.myMarkers.push(marker);
		});
    }

    $scope.getDirection = function(map) {

		// DIRECTION
		var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers : true});
		var directionsService = new google.maps.DirectionsService();
		var request = {
		    origin:new google.maps.LatLng(48.865374, 2.342758),
		    destination:new google.maps.LatLng(48.864174, 2.345526),
		    travelMode: google.maps.TravelMode.WALKING
		};

		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
		    directionsDisplay.setDirections(response);
		  }
		});
		directionsDisplay.setMap(map);
    }


    $scope.addMarkerGeoloc = function(pos) {
		var marker = new google.maps.Marker({
			map: $scope.myMap,
		  	icon: {
		      path: google.maps.SymbolPath.CIRCLE,
		      scale: 10,
		      strokeColor: '#393',
		      strokeWeight : 6,
		      strokeOpacity : 0.8
		    },      	   	
		    position:  pos
		});
    };
    $scope.getCurrentPosition = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var posFake = new google.maps.LatLng(48.866625, 2.343695);
          $scope.addMarkerGeoloc(posFake);
          $scope.myMap.setCenter(posFake);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
    }
  }
]);