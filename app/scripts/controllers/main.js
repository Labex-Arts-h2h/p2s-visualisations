angular.module('p2sAppApp').controller('MainCtrl', ['$scope', 'uiGmapGoogleMapApi', 'uiGmapIsReady',
  function($scope, GoogleMapApi, IsReady) {

	$scope.map = {center: {latitude: 48.865374, longitude: 2.342758 }, zoom: 15, control: {}, markerControl: {} };
	$scope.options = { streetViewControl: false, panControl: false, maxZoom: 20, minZoom: 3};
	var appleStyle = [{"featureType": "transit.station.rail", "stylers": [{"visibility": "off"}] }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#a2daf2"}] }, {"featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{"color": "#f7f1df"}] }, {"featureType": "landscape.natural", "elementType": "geometry", "stylers": [{"color": "#d0e3b4"}] }, {"featureType": "landscape.natural.terrain", "elementType": "geometry", "stylers": [{"visibility": "off"}] }, {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#bde6ab"}] }, {"featureType": "poi", "elementType": "labels", "stylers": [{"visibility": "off"}] }, {"featureType": "poi.medical", "elementType": "geometry", "stylers": [{"color": "#fbd3da"}] }, {"featureType": "poi.business", "stylers": [{"visibility": "off"}] }, {"featureType": "road", "elementType": "geometry.stroke", "stylers": [{"visibility": "off"}] }, {"featureType": "road", "elementType": "labels", "stylers": [{"visibility": "off"}] }, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffe15f"}] }, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#efd151"}] }, {"featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}] }, {"featureType": "road.local", "elementType": "geometry.fill", "stylers": [{"color": "black"}] }, {"featureType": "transit.station.airport", "elementType": "geometry.fill", "stylers": [{"color": "#cfb2db"}] }];
	$scope.styles = appleStyle;
 	$scope.hidden = false;
 	$scope.infoPanelShow = false;
	// GOOGLE API THEN
    GoogleMapApi.then(function(maps) {

    	// Google Direction
		// IsReady.promise().then(function (maps) {
		//     var map = maps[0].map;
		//     console.log(map);
		//     $scope.getDirection(map);
		// });




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
	}

	$scope.addMarkerGeoloc = function(pos) {
		$scope.markers.push(new google.maps.Marker({
			id: 0,
		  	icon: {
		      path: google.maps.SymbolPath.CIRCLE,
		      scale: 10,
		      strokeColor: '#393',
		      strokeWeight : 6,
		      strokeOpacity : 0.8
		    },      	   	
		    latitude:  pos.lat(),
		    longitude : pos.lng()
		}));
	};

	$scope.changePosition = function (pos) {
	     $scope.map.center = {
	     	latitude : pos.lat(),
	     	longitude : pos.lng()
	     };
	}

	$scope.displayInfoPanel = function (marker, event) {
		$scope.infoPanelShow = true;
		$scope.changePosition(marker.position);
		$scope.markerInfo = marker;
	}


	$scope.clickEventsObject = {
		mouseover: markerMouseOver,
		mouseout: markerMouseOut,
		click : $scope.displayInfoPanel
	};
	function clickclick () {
		console.log("clickclick");
	}
	function markerMouseOver( mousedmarker, event ) {
		//console.log('markerMouseOver ?? #'+ mousedmarker.key);
		//console.log(mousedmarker, event);
	}
	function markerMouseOut( mousedmarker, event ) {
		//console.log('?? markerMouseOut #'+ mousedmarker.key);
		//console.log(mousedmarker);
	}

    $scope.getDirection = function(position) {
    	var gmapd = $scope.map.control.getGMap();

		var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers : true});
		var directionsService = new google.maps.DirectionsService();
		var request = {
		    origin: $scope.posFake,
		    destination:position,
		    travelMode: google.maps.TravelMode.WALKING
		};

		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
		    directionsDisplay.setDirections(response);
		  }
		});
		directionsDisplay.setMap(gmapd);
    }


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


  	//var latadrress = $scope.getLocation(maps, '135, boulevard de menilmontant 75011 paris');
    $scope.getLocation = function(maps, address) {
      console.log(address);
      geocoder = new maps.Geocoder();
      geocoder.geocode({
        'address': address
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results[0].geometry.location);
          return results[0].geometry.location;
        } else {
          return false;
        }
      });
    }

  }
]);