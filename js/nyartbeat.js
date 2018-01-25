$( document ).ready(function() {
  // $("#add-artist").on("click", function(event) {
  //   event.preventDefault();
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUxNzQ0MDcwMiwiaWF0IjoxNTE2ODM1OTAyLCJhdWQiOiI1YTY4ZWQxN2IyMDJhMzRmZGQ4NWE0NGUiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWE2OTE0M2VjOWRjMjQ0YTIyOGJiNGY0In0.R4htGaBOXbQF9pwefOhzzQxNFCtfnr36ntQVg3HoPJw'";
    var artist = "andy warhol";
    // const id = "9939f186d349cb48c3c091e3f0ae8e6c";
    let queryURL = "https://eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUxNzQ4NjQxMSwiaWF0IjoxNTE2ODgxNjExLCJhdWQiOiI1YTY4ZWQxN2IyMDJhMzRmZGQ4NWE0NGUiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWE2OWM2Y2JiMjAyYTM1MTcwZWQ2NmQ2In0.NplZRaG1iIia4DBfBYPQc_uLv1tz4EJVJqso_SRZK7c@api.artsy.net/api/artists/";

      // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After the data from the AJAX request comes back
    .then(function(response) {
      console.log(response);
      // // var results = response.data;
      // console.log(response.objects[0].images[0].b.url);
      // for (var i = 0; i < 3; i++) {
      //   var artDiv = $("<div class='item'>");
      //   // // Creating and storing an image tag
      //   var artImage = $("<img>");
      //   artImage.attr("src", response.objects[i].images[0].b.url);
      //   artImage.attr("class", "art");
      //   var galleryLink = $("<a href= 'artGallarySearchResult.html'>");
        
      //   galleryLink.append(artImage);
      //   artDiv.prepend(galleryLink);
      //   // artDiv.prepent(info);
      //   $("#pieces").prepend(artDiv);
      // }
    });
  // });
});