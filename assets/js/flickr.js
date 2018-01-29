$.ajax({
    // the URL for the request
    url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20has_geo%3D%22true%22%20and%20text%3D%22Miami%2C%20US%22%20and%20api_key%3D%2292bd0de55a63046155c09f1a06876875%22%3B&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    // code to run if the request succeeds;
    // the response is passed to the function
    success: function( json ) {
      document.write("<h2>Miami</h2>");
      var src;
      for (var i=0; i < 5; i++) {
        //Flickr URLs: https://www.flickr.com/services/api/misc.urls.html
        //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
        src = "https://farm" + json.query.results.photo[i].farm + ".staticflickr.com/" + json.query.results.photo[i].server + "/" + json.query.results.photo[i].id + "_" +json.query.results.photo[i].secret + "_m.jpg";
        document.write("<img src='" + src + "'>");

      }
    },
// code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    },
}
 );
