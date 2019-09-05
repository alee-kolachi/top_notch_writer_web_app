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
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnSubmit = document.getElementById("btnSubmit");

  //get current location
  var loc = window.location.pathname;
  var dir = loc.substring(0, loc.lastIndexOf("/"));

  //Add Login Event
  btnSubmit.addEventListener("click", e => {
    //growSpinner.classList.remove("hide");
    //get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;

    const auth = firebase.auth();

    //sign in with firebase auth
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => alert(e.message));
    console.log(email);
  });

  //Add a real time listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebase.auth().currentUser + " firebase.auth().currentuser");
      window.location.replace(dir + "/index.html");
      //   window.location.replace(dir + "/passwords.html");
      //growSpinner.classList.add("hide");
      //btnLogout.style.display = 'block';
    } else {
      console.log("not logged in");

      //btnLogout.style.display = 'none';
    }
  });
})();
