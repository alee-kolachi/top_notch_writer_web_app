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

  var postCards = document.getElementById("postCards");
  //  const txtTitle = document.getElementById("txtTitle");
  //  const txtDescription = document.getElementById("txtDescription");

  //get current location
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf("/"));

  //Sign out event
  $("body").on("click", ".dropdown-item", function() {
    firebase.auth().signOut();
    console.log("signed Out");

    window.location.replace(dir + "/login.html");
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
    var str = `<div class="col-sm-4" id="${id}">
                    <div class="card ">
                        <img class="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Card image" />
                        <div class="card-body">
                            <p class="card-title">${myName.text}</p>
                            <p class="card-text">${txtTitle.value}</p>
                        </div>
                    </div>
                </div>`;
    postCards.innerHTML += str;
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

      ref = firebase
        .database()
        .ref("user_post/" + firebase.auth().currentUser.uid)
        .once("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childKey);
            console.log(childData);
            var author = childData.author;
            var description = childData.description;
            var title = childData.title;

            var str = `<div class="col-sm-4"  id="${childKey}">
                    <div class="card ">
                        <img class="card-img-top" src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Card image" />
                        <div class="card-body">
                            <p class="card-title">${author}</p>
                            <p class="card-text">${title}</p>
                        </div>
                    </div>
                </div>`;
            postCards.innerHTML += str;
          });
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
