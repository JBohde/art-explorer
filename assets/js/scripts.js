$( document ).ready(function() {
  $("#art-display").hide();

  var config = {
  apiKey: "AIzaSyDyB-QLzbbYtDMixJ9eqppkC83aOjlNag0",
  authDomain: "artgalleryproject-92ef9.firebaseapp.com",
  databaseURL: "https://artgalleryproject-92ef9.firebaseio.com",
  projectId: "artgalleryproject-92ef9",
  storageBucket: "",
  messagingSenderId: "308927903962"
  };
  firebase.initializeApp(config);

  const dbRef = firebase.database().ref("BucketList");
  var bucketList = [];
  var myBucketModal = $("#myBucketListModal");

  var artImage;
  var participants;
  var artTitle;
  var personName;
  var roleCode;
  var imageSource;
  var acquired;
  var medium;
  var info;
  var infoCard;

  var myModal = $("#myModal");
  var modalImage;
  var isModalShowing = false;



  
    $("#resultsTable").on("click", function(event) {
    $("#art-display").fadeIn();
    event.preventDefault();
    const token = "2e2316873bca66e99bd915dbcb769c56";
    var artist = "Picasso";
    let queryURL = "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.people.getObjects&access_token=" + token + "&person=" + artist;

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After the data from the AJAX request comes back
    .then(function(response) {
      // var random;
      // function randomArtGenerator(j) {
      //   random = response.objects[Math.floor(Math.random()*response.objects.length)];
      // }
      
      function totalDisplay(i) {
        var artHeading = $("<h4 class=media-heading>");
        var artInfo = $("<div class=media-body>");
        artInfo.attr("id", "artInfo");
        var artDiv = $("<div class='item'>");
  
        participants = response.objects[i].participants;
        imgSource = response.objects[i].images[0].b.url
        artTitle = response.objects[i].title;
  
        for (var j = 0; j < participants.length; j++) {
          personName = participants[j].person_name;
          roleCode = participants[j].role_id;
          roleDisplay = participants[j].role_display_name;
          roleName = participants[j].role_name;
          if (roleCode === "35236655") {
            // console.log(roleName); //Designer
            designer = roleDisplay + " " + personName;
          }
          else if (roleCode === "35236565") {
            // console.log(roleName);  //Artist
            artist = roleName + ": " + personName;
          }
          else if (roleCode === "35236685") {
            // console.log(roleName); //Maker
            maker = roleName + ": " + personName;
          }
        }
  
        acquired = "Year acquired: " + response.objects[i].year_acquired;
        medium = "Medium: " +response.objects[i].medium;
        info = "Information: " + response.objects[i].description;
        infoCard = artist + "<br>" + 
                  acquired + "<br>" + 
                  medium + "<br>" +
                  info + "</p>";
  
        artImage = $("<img>");
        artImage.attr("class", "art");
        artImage.attr("name", artTitle);
        artImage.attr("data-toggle", "modal");
        artImage.attr("data-target", "#myModal>");
        artImage.attr("src", imgSource);
        artImage.attr("id", "image-" + [i]);
        modalImage = $("<img>");
        modalImage.attr("id", "modal-image");
  
        artDiv.append(artImage);
        $('#slide-' + i).append(artDiv[0]);
        artHeading.append(artTitle);
        artInfo.append(infoCard);
        
        // $("#artist-input").val('');
        $(".art").on("click", function(event){
          if(isModalShowing) return;
          isModalShowing = true;
          thisArt = event.currentTarget.name;
          thisSource = event.currentTarget.src
          modalImage.attr("src", thisSource);
          $(".header-content").append(artHeading);
          $(".modal-body").append(modalImage);
          $(".modal-body").append(artInfo);
          myModal.attr("class", "modal fade in");
          myModal.attr("style", "display: block");
        });
      }
  
      for (var i = 0; i < response.objects.length; i++) {
        // randomArtGenerator(i);
        // console.log(random);
        totalDisplay(i);
      }
    });
  });

  // Sets a listener for closing the modal and resetting parameters
  $(".close").on("click", function(event){
      myModal.attr("class", "modal fade out");
      myModal.attr("style", "display: none");
      isModalShowing = false;
      $(".header-content").empty();
      $(".modal-body").empty();
  });

  // Sets a event listnener for a new artist
  $("#search-input").on("click", function(event) {
    event.preventDefault();
    $("#showcase").empty();
    $(".header-content").empty();
    $(".modal-body").empty();

    const token = "2e2316873bca66e99bd915dbcb769c56";
    var artist = $("#artist-input").val().trim();
    let queryURL = "https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=" + token + "&query=" + artist;
    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data from the AJAX request comes back
    .then(function(response) {
      // dbRef.set(response);
    });
  });

  $("#addToBucketList").on("click", function(event) {
    console.log("hello!");
    // Capture user inputs and store them into variables
    if(isModalShowing) return;
    isModalShowing = true;
    modalImage.attr("src", thisSource);
    // $(".header-content").append(artHeading);
    // $(".modal-body").append(modalImage);
    // $(".modal-body").append(artInfo);
    myBucketModal.attr("class", "modal fade in");
    myBucketModal.attr("style", "display: block");

    // Console log each of the user inputs to confirm we are receiving them
    // console.log(name);
    // console.log(address);
    // console.log(phone);
    // console.log(website);

    // Replaces the content in the "recent-member" div with the new info
    // $("#name-display").text(name);
    // $("#email-display").text(email);
    // $("#age-display").text(age);
    // $("#comment-display").text(comment);

    // Clear sessionStorage
    // dbref.clear();

    // Store all content into dbref
    // dbref.setItem("name", name);
    // dbref.setItem("email", email);
    // dbref.setItem("age", age);
    // dbref.setItem("comment", comment);
    });

    // By default display the content from sessionStorage
    // $("#name-display").text(dbref.getItem("name"));
    // $("#email-display").text(dbref.getItem("email"));
    // $("#age-display").text(dbref.getItem("age"));
    // $("#comment-display").text(dbref.getItem("comment"));
});

    // This example uses the autocomplete feature of the Google Places API.
    // It allows the user to find all museums in a given place, within a given
    // country. It then displays markers for all the museums returned,
    // with on-click details for each museum.

    var map;
    var places;
    var infoWindow;
    var marker;
    var markers = [];
    var userMarker;
    var autocomplete;
    var countryRestrict = {'country': 'us'};
    var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
    var hostnameRegexp = new RegExp('^https?://.+?/');
        
    var countries = {
      'au': {
        center: {lat: -25.3, lng: 133.8},
        zoom: 4
      },
      'br': {
        center: {lat: -14.2, lng: -51.9},
        zoom: 3
      },
      'ca': {
        center: {lat: 62, lng: -110.0},
        zoom: 3
      },
      'fr': {
        center: {lat: 46.2, lng: 2.2},
        zoom: 5
      },
      'de': {
        center: {lat: 51.2, lng: 10.4},
        zoom: 5
      },
      'mx': {
        center: {lat: 23.6, lng: -102.5},
        zoom: 4
      },
      'nz': {
        center: {lat: -40.9, lng: 174.9},
        zoom: 5
      },
      'it': {
        center: {lat: 41.9, lng: 12.6},
        zoom: 5
      },
      'za': {
        center: {lat: -30.6, lng: 22.9},
        zoom: 5
      },
      'es': {
        center: {lat: 40.5, lng: -3.7},
        zoom: 5
      },
      'pt': {
        center: {lat: 39.4, lng: -8.2},
        zoom: 6
      },
      'us': {
        center: {lat: 37.1, lng: -95.7},
        zoom: 3
      },
      'uk': {
        center: {lat: 54.8, lng: -4.6},
        zoom: 5
      }
    };
        
    var request = {
      placeId: 'ChIJsT8qSaJYwokR-m20OGJUKCA'
    };
    var cooperHewitt;
    var googleResults = [];
    var bucketList = [];
    var myBucketModal = $("#myBucketListModal");
    var isBucketModalShowing = false;
      
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        cooperHewitt = place;
      }
    }
    var directionsService;
    var directionsDisplay;           
      
    function initMap() {
      $(".google-map").show();
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: countries['us'].zoom,
        center: countries['us'].center,
        mapTypeControl: false,
        panControl: false,
        zoom: 4,
        streetViewControl: false
      });
      infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('info-content')
        });
      // Create the autocomplete object and associate it with the UI input control.
      // Restrict the search to the default country, and to place type "cities".
      autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
              document.getElementById('autocomplete')), {
                  types: ['(regions)'],
                  componentRestrictions: countryRestrict
              });
      places = new google.maps.places.PlacesService(map);
      places.getDetails(request, callback);
      directionsDisplay = new google.maps.DirectionsRenderer;
      directionsService = new google.maps.DirectionsService;
      autocomplete.addListener('place_changed', onPlaceChanged);
        
      // Add a DOM event listener to react when the user selects a country.
      document.getElementById('country').addEventListener(
          'change', setAutocompleteCountry);
    }
        
      // When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(11);
          search();
        } else {
          document.getElementById('autocomplete').placeholder = 'Enter a city';
        }
      }
  
      // Search for museums in the selected city, within the viewport of the map.
      function search() {
        var search = {
          bounds: map.getBounds(),
          types: ['museum']
        };
        
        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            googleResults = results;
            googleResults.unshift(cooperHewitt);
            console.log(googleResults);
            $(".carousel-one").fadeOut();
            $(".results-table").fadeIn();
            $("#art-display").hide();
            $("#resultsTable").fadeIn();
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
              var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              var markerIcon = MARKER_PATH + markerLetter + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
              });
              // If the user clicks a hotel marker, show the details of that hotel
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow); //,getCurrentPosition, calculateAndDisplayRoute);
              setTimeout(dropMarker(i), i * 100);
              addResult(results[i], i);
            }
          }
        });
      }
  
    function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
          markers[i].setMap(null);
        }
      }
      markers = [];
    }
        
    // Set the country restriction based on user input.
    // Also center and zoom the map on the given country.
    function setAutocompleteCountry() {
      var country = document.getElementById('country').value;
      if (country == 'all') {
        autocomplete.setComponentRestrictions({'country': []});
        map.setCenter({lat: 15, lng: 0});
        map.setZoom(2);
      } else {
        autocomplete.setComponentRestrictions({'country': country});
        map.setCenter(countries[country].center);
        map.setZoom(countries[country].zoom);
      }
      clearResults();
      clearMarkers();
    }
        
    function dropMarker(i) {
      return function() {
        markers[i].setMap(map);
      };
    }
        
    function addResult(result, i) {
      var results = document.getElementById('results');
      var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
      var markerIcon = MARKER_PATH + markerLetter + '.png';
  
      var tr = document.createElement('tr');
      tr.setAttribute('id', "museum-" + i);
      tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
      tr.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
      };
  
      var btn = document.createElement('button');
      btn.onclick = function() {
        google.maps.event.trigger(markers[i], 'click');
      }; 
  
      var iconTd = document.createElement('td');
      var nameTd = document.createElement('td');
      var icon = document.createElement('img');
      icon.src = markerIcon;
      btn.setAttribute('class', 'list-group-item dropdown-toggle');
      icon.setAttribute('class', 'placeIcon');
      icon.setAttribute('className', 'placeIcon');
      var name = document.createTextNode(result.name);
      iconTd.appendChild(icon);
      nameTd.appendChild(name);
      btn.appendChild(iconTd);
      btn.appendChild(nameTd);
      results.appendChild(btn);
    }
        
    function clearResults() {
      var results = document.getElementById('results');
      while (results.childNodes[0]) {
        results.removeChild(results.childNodes[0]);
      }
    }
        
    // Get the place details for a museum. Show the information in an info window,
    // anchored on the marker for the museum that the user selected.
    function showInfoWindow() {
      var marker = this;
      places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        infoWindow.open(map, marker);
        buildIWContent(place);
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var userMarkerIcon = MARKER_PATH + '.png';
            userMarker = new google.maps.Marker({
              position: pos,
              animation: google.maps.Animation.DROP,
              icon: userMarkerIcon
            });
            userMarker.setPosition(pos);
            // infoWindow.setContent('Current location.');
            map.setCenter(marker.position.latitude, marker.position.longitude);        
            function calculateAndDisplayRoute(directionsService, directionsDisplay) {
              var selectedMode = document.getElementById('mode').value;
              places = new google.maps.places.PlacesService(map);
              places.getDetails(request, callback);
              directionsService.route({
                origin: pos,
                destination: marker.placeResult.vicinity,
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
         // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
          }
          directionsDisplay.setMap(map);
      });
    }
      
    // Load the place information into the HTML elements used by the info window.
    function buildIWContent(place) {
      document.getElementById('iw-icon').innerHTML = '<img class="museumIcon" ' +
          'src="' + place.icon + '"/>';
      document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
          '">' + place.name + '</a></b>';
      document.getElementById('iw-address').textContent = place.vicinity;
      //store the index of the place ID
      var bucketListIndex = bucketList.indexOf(place.id);
      // if the place ID's idex is not in array it will be -1
      if ( bucketListIndex < 0) {
      // if place.id is negative this code runs
      document.getElementById('iw-bucketList-button').innerHTML = "<button type='button' name='button' class='btn btn-success' id='addToBucketList'>Add to list</button>";
      //set on click event for add to list button
      document.getElementById('addToBucketList').onclick = function() {
        // this.remove();
        console.log("hello!");
        // Capture user inputs and store them into variables
        if(isBucketModalShowing) return;
          isBucketModalShowing = true;
          myBucketModal.attr("class", "modal fade in");
          myBucketModal.attr("style", "display: block");
          document.getElementById('iw-bucketList-button').innerHTML = '<div class="alert alert-success" role="alert">Added!</div>';
          console.log(place.name);
          bucketList.push(place.id);
          console.log(bucketList);
          alreadyAdded = true;
        }
      } else {
          document.getElementById('iw-bucketList-button').innerHTML = '<div class="alert alert-success" role="alert">Added!</div>';
          console.log('already added');
      }
  
      document.getElementById('btnPhotos').onclick = function (){
        console.log('clicked');
        document.getElementById('img-repo').innerHTML =
        "<h1>Hello World!</h1>"
        + "<div class='item' id='image-1'>"
        +   "<img class='thumbnail img-responsive' title='Image 11' src='http://dummyimage.com/600x350/ccc/969696'>"
        + "</div>";
      }
        
      if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
      } else {
        document.getElementById('iw-phone-row').style.display = 'none';
      }
        
      // Assign a five-star rating to the museum, using a black star ('&#10029;')
      // to indicate the rating the museum has earned, and a white star ('&#10025;')
      // for the rating points not achieved.
      if (place.rating) {
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
          if (place.rating < (i + 0.5)) {
            ratingHtml += '&#10025;';
          } else {
            ratingHtml += '&#10029;';
          }
        document.getElementById('iw-rating-row').style.display = '';
        document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
      } else {
        document.getElementById('iw-rating-row').style.display = 'none';
      }
        
      // The regexp isolates the first part of the URL (domain plus subdomain)
      // to give a short URL for displaying in the info window.
      if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website === null) {
          website = 'http://' + place.website + '/';
          fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').textContent = website;
      } else {
        document.getElementById('iw-website-row').style.display = 'none';
      }
    }