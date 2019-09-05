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
  const txtName = document.getElementById("txtName");
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const txtRetypePassword = document.getElementById("txtRetypePassword");
  const btnSubmit = document.getElementById("btnSubmit");
  let saveName = false;

  //get current location
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf("/"));

  //Add Signup Event
  btnSubmit.addEventListener("click", e => {
    //get email and password
    const name = txtName.value;
    const email = txtEmail.value;
    const password = txtPassword.value;

    const auth = firebase.auth();

    //sign in with firebase auth
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));
  });

  //Add a real time listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebase.auth().currentUser.uid);

      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .set(
          {
            name: txtName.value
          },
          function(error) {
            window.location.href = dir + "/index.html";
          }
        );

      //   window.location.replace(dir + "/passwords.html");
      //growSpinner.classList.add("hide");
      //btnLogout.style.display = 'block';
    } else {
      console.log("sign up please!");

      //btnLogout.style.display = 'none';
    }
  });
})();
