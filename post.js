(function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBl1ywf4QffizzLfdmxp5Bvij4fLOqDU8w",
    authDomain: "java-exercises-and-solutions.firebaseapp.com",
    databaseURL: "https://java-exercises-and-solutions.firebaseio.com",
    projectId: "java-exercises-and-solutions",
    storageBucket: "java-exercises-and-solutions.appspot.com",
    messagingSenderId: "1047670971207",
    appId: "1:1047670971207:web:7a4d80b1c9251203"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Get Elements
  const btnLifestyle = document.getElementById("btnLifestyle");
  const myName = document.getElementById("myName");
  const btnPost = document.getElementById("btnPost");
  const btnSendComment = document.getElementById("btnSendComment");
  const txtTitle = document.getElementById("txtTitle");
  const txtComment = document.getElementById("txtComment");
  const txtDescription = document.getElementById("txtDescription");
  const featuredTitle = document.getElementById("featuredTitle");
  const postParagraph = document.getElementById("postParagraph");
  let divComment = document.getElementById("divComment");

  const postID = localStorage.getItem("postID");

  //  const txtTitle = document.getElementById("txtTitle");
  //  const txtDescription = document.getElementById("txtDescription");

  //  //get current location
  //  var loc = window.location.pathname;
  //  var dir = loc.substring(0, loc.lastIndexOf("/"));
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf("/"));

  //Sign out event
  $("body").on("click", ".dropdown-item", function() {
    firebase.auth().signOut();
    console.log("signed Out");

    window.location.replace(dir + "/login.html");
  });

  btnSendComment.addEventListener("click", e => {
    ref = firebase
      .database()
      .ref("user_post/")
      .once("value", function(snapshot) {
        for (var key in snapshot.val()) {
          // firebase
          //   .database()
          //   .ref(snapshot.key)
          //   .child(postID)
          //   .once("value", snap => {
          //     console.log(snap.val());
          //   });
          if (snapshot.val()[key][postID] === undefined) {
            continue;
          }
          firebase
            .database()
            .ref("user_post/" + key + "/" + postID + "/comments")
            .push({
              commentator: myName.text,
              comment: txtComment.value
            });
        }
      });

    var str = `
    <img src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="John Doe" class="mr-3 mt-3 rounded-circle" style="width:60px;">
  <div class="media-body">
    <h4>${myName.text}</h4>
    <p>${txtComment.value}</p>
  </div>
  `;
    divComment.innerHTML += str;
  });

  btnPost.addEventListener("click", e => {
    var id = "";
    var ref = firebase
      .database()
      .ref("user_post/" + firebase.auth().currentUser.uid);
    var newRef = ref
      .push({
        author: myName.text,
        title: txtTitle.value,
        description: txtDescription.value
      })
      .then(snap => {
        id = snap.key;
      });
    console.log("id " + id);
  });
  //
  //  //write story to firebase
  //  btnPost.addEventListener("click", err => {
  //    console.log(firebase.auth().currentUser);
  ////    var str = `
  ////      <div class="col-12 mb-3">
  ////        <div class="card shadow" >
  ////          <div class="card-body">
  ////            <h4 class="card-title">${title.value}</h4>
  ////            <p class="card-text">${desc.value}</p>
  ////            <a href="#" class="card-link text-primary stretched-link">Read More</a>
  ////          </div>
  ////        </div>
  ////      </div>
  ////      </div>`;
  //    var ref = firebase
  //      .database()
  //      .ref()
  //      .child(firebase.auth().currentUser.uid + "/posts");
  //
  //    ref
  //      .push({
  //        title: txtTitle.value,
  //        description: txtDescription.value
  //      })
  //      .then((cardPopulate.innerHTML += str));
  //  });
  //
  ////
  //
  //Add a real time listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebase.auth().currentUser + "firebase.auth().currentuser");
      //is logged in user. show his posts to him
      var ref = firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid);

      ref.once("value", function(snapshot) {
        var name = snapshot.val() && snapshot.val().name;
        myName.innerHTML = name;
      });
      console.log("post id " + postID);
      var xxx;
      ref = firebase
        .database()
        .ref("user_post/")
        .once("value", function(snapshot) {
          for (var key in snapshot.val()) {
            // firebase
            //   .database()
            //   .ref(snapshot.key)
            //   .child(postID)
            //   .once("value", snap => {
            //     console.log(snap.val());
            //   });
            if (snapshot.val()[key][postID] === undefined) {
              continue;
            }
            featuredTitle.innerHTML = snapshot.val()[key][postID].title;
            postParagraph.innerHTML = snapshot.val()[key][postID].description;
            xxx = snapshot.val()[key][postID];
            console.log(snapshot.val()[key][postID].title);
          }

          for (var key in xxx["comments"]) {
            console.log();
            var comment = xxx["comments"][key].comment;
            var commentator = xxx["comments"][key].commentator;

            var str = `
    <img src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="John Doe" class="mr-3 mt-3 rounded-circle" style="width:60px;">
  <div class="media-body">
    <h4>${commentator}</h4>
    <p>${comment}</p>
  </div>
  `;
            divComment.innerHTML += str;
          }
        });

      //   window.location.replace(dir + "/passwords.html");
      //growSpinner.classList.add("hide");
      //btnLogout.style.display = 'block';
    } else {
      $("#logModel").modal("show");

      //btnLogout.style.display = 'none';
    }
  });
})();
