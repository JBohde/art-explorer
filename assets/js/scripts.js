$( document ).ready(function() {

  var config = {
  apiKey: "AIzaSyDyB-QLzbbYtDMixJ9eqppkC83aOjlNag0",
  authDomain: "artgalleryproject-92ef9.firebaseapp.com",
  databaseURL: "https://artgalleryproject-92ef9.firebaseio.com",
  projectId: "artgalleryproject-92ef9",
  storageBucket: "",
  messagingSenderId: "308927903962"
  };
  firebase.initializeApp(config);

  const dbRef = firebase.database().ref("Artist");
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
        artDiv.attr("width", "360");
        artDiv.attr("height", "360");
  
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
        artImage.attr("class", "img-responsive art");
        artImage.attr("name", artTitle);
        artImage.attr("data-toggle", "modal");
        artImage.attr("data-target", "#myModal>");
        artImage.attr("src", imgSource);
        artImage.attr("id", "image-" + [i]);
        // artImage.attr("width", "360");
        // artImage.attr("height", "360");
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
});