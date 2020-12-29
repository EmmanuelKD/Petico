import defaultModule from './firebaseInitializer'
import {getAllUserData} from "./crudModules"
// const fireStore=firebase.firestore(defaultModule);


export async function signupWithEmailAndPassword(email, password){
   return await defaultModule.auth().createUserWithEmailAndPassword(email, password)

}


// .then((user) => {
//   // Signed in 
//   // ...
//   loginWithEmailAndPassword(email,password);
// })
// .catch((error) => {
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ..
// });


export async function loginWithEmailAndPassword(email, password){

  return await defaultModule.auth().signInWithEmailAndPassword(email,password)

}
// .then((user) => {
//   // Signed in 
//   // ...
// })
// .catch((error) => {
//   var errorCode = error.code;
//   var errorMessage = error.message;
// });


export async function signoutOfApp(){
  return await defaultModule.auth().signOut()
  }


  export  function onAutStateChange(logout,login){

    defaultModule.auth().onAuthStateChanged(async function (user) {
      if (user) {
       await getAllUserData(user.uid).then(async (data) => {
        if(data.exists)
          var userTypeAdmin=  await data.get("isUSersAdmin");
           login(userTypeAdmin)
        }
        )
      } else {
        // logout()
      }
    });
  }