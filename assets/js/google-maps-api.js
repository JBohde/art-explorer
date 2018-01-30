 var map;
      var infowindow;
      var placesList = [];

      function initMap() {
        var NYC = {lat: 40.788895, lng: -73.97668};

        map = new google.maps.Map(document.getElementById('map'), {
          center: NYC,
          zoom: 13
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: NYC,
          radius: 2000,
          type: ['museum']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            console.log(results[i].name);
            placesList.push(results[i].name);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);

          infowindow.open(map, this);

          console.log(place.name);
        });
      }


      console.log(placesList[0]);