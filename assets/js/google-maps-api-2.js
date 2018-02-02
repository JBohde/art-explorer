  // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
      var map;
      var places;
      var infoWindow;
      var pos;
      var directionsService;
      var request = {
        placeId: 'ChIJsT8qSaJYwokR-m20OGJUKCA'
      };
      var cooperHewitt;
      var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
      function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          cooperHewitt = place;
        }
      }
    
        function initMap() {
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;
            var map = new google.maps.Map(document.getElementById('map'), {
                // mapTypeControl: false,
                center: {lat:40.7844, lng:-73.9582},
                zoom: 12
            });
            places = new google.maps.places.PlacesService(map);
            places.getDetails(request, callback);
            infoWindow = new google.maps.InfoWindow;
            var markerIcon = MARKER_PATH + '.png';
            marker = new google.maps.Marker({
              animation: google.maps.Animation.DROP,
              icon: markerIcon
            });
            
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                marker.setPosition(pos);
                // infoWindow.setContent('Current location.');
                infoWindow.open(map);
                map.setCenter(pos);        
                function calculateAndDisplayRoute(directionsService, directionsDisplay) {
                    var selectedMode = document.getElementById('mode').value;
                    console.log(pos);
                    console.log(cooperHewitt);
                    directionsService.route({
                      origin: pos,
                      destination: {lat:40.7844, lng:-73.9582},  // Cooper Hewitt
                      // Note that Javascript allows us to access the constant
                      // using square brackets and a string value as its
                      // "property."
                      travelMode: google.maps.TravelMode[selectedMode]
                    }, function(response, status) {
                      if (status == 'OK') {
                        directionsDisplay.setDirections(response);
                      } else {
                        window.alert('Directions request failed due to ' + status);
                      }
                    });
                }
                calculateAndDisplayRoute(directionsService, directionsDisplay);
                document.getElementById('mode').addEventListener('change', function() {
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            });
              }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
              });
            } else {
            //   // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, map.getCenter());
            }
            directionsDisplay.setMap(map);
        }
    
        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }