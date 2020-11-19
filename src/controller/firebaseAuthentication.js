

import firebase from 'firebase/auth'



export function signupWithEmailAndPassword({email, password}){

    firebase.default.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in 
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });

}


export function loginWithEmailAndPassword({email, password}){

    firebase.default.auth().signInWithEmailAndPassword(email,password).then((user) => {
        // Signed in 
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

}

export function signoutOfApp(){
    firebase.default.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
}