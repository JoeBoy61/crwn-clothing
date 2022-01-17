// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAqU-3-9Ec5lSZhaLbLJBlF0VGN7voxYtA",
    authDomain: "crwn-clothing-db-46698.firebaseapp.com",
    projectId: "crwn-clothing-db-46698",
    storageBucket: "crwn-clothing-db-46698.appspot.com",
    messagingSenderId: "737288326459",
    appId: "1:737288326459:web:80f6b01896c2a1b3cf3b1e",
    measurementId: "G-GQDLN6DEKQ"
  };

//   firebase.initializeApp(config);
initializeApp(config);

//   export const auth = firebase.auth();
//   export const firestore = firebase.firestore();
export const auth = getAuth();
export const firestore = getFirestore();

//   const provider = new firebase.auth.GoogleAuthProvider();
//   provider.setCustomerParameters({ prompt: 'select_account' });
//   export const signInWithGoogle = () => auth.signInWithPopup(provider);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ params: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// export default firebase;