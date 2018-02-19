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
    var isModalShowing = false;

    $("#addToBucketList").on("click", function(event) {
        console.log("hello!");
    // Capture user inputs and store them into variables
        if(isModalShowing) return;
        isModalShowing = true;;
        myBucketModal.attr("class", "modal fade in");
        myBucketModal.attr("style", "display: block");

    // Console log each of the user inputs to confirm we are receiving them
    console.log(name);
    console.log(address);
    console.log(phone);
    console.log(website);

    // Replaces the content in the "recent-member" div with the new info
    // $("#name-display").text(name);
    // $("#email-display").text(email);
    // $("#age-display").text(age);
    // $("#comment-display").text(comment);

    // Clear sessionStorage
    dbref.clear();

    // Store all content into dbref
    dbref.setItem("name", name);
    dbref.setItem("email", email);
    dbref.setItem("age", age);
    dbref.setItem("comment", comment);
    });

    // By default display the content from sessionStorage
    // $("#name-display").text(dbref.getItem("name"));
    // $("#email-display").text(dbref.getItem("email"));
    // $("#age-display").text(dbref.getItem("age"));
    // $("#comment-display").text(dbref.getItem("comment"));
