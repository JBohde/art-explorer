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

    const dbRef = firebase.database().ref();
    
    dbRef.on("child_added", function(snapshot) {

    // Employee Info
    const newData = snapshot.val();
    console.log(newData.objects[0].images[0].b.url);
    });
  
});