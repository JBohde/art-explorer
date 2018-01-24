$( document ).ready(function() {
    console.log( "ready!" );

let queryURL = "http://www.nyartbeat.com/list/event_searchNear?latitude=40.719130&longitude=-73.980000&Schedule=upcoming&SortOrder=mostpopular";
// (Most popular upcoming events)

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .then(function(response) {

        // // Saving the image_original_url property
        //
        // // Creating and storing an image tag
        // var newImage = $("<img>");
        //
        // for ( j = 0; j < response.data.length; j++ ) {
        //   $(".images").append(
        //   "<img src='" + response.data[j].images.original_still.url + "'" +
        //   "alt='" + response.data[j].slug + "'" +
        //   "data-still='" + response.data[j].images.original.url + "'" +
        //   "data-animate='" + response.data[j].images.original_still.url + "'" +
        //   "data-state='animate'" +
        //   "class='animalImage'>");
        //   $(".images").append("<p>" + response.data[j].rating + "</p>");
        // }
        console.log(response);
      });
    });
