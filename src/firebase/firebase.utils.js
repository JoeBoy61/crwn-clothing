// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firestore = firebase.firestore();
// import 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAqU-3-9Ec5lSZhaLbLJBlF0VGN7voxYtA",
    authDomain: "crwn-clothing-db-46698.firebaseapp.com",
    projectId: "crwn-clothing-db-46698",
    storageBucket: "crwn-clothing-db-46698.appspot.com",
    messagingSenderId: "737288326459",
    appId: "1:737288326459:web:80f6b01896c2a1b3cf3b1e",
    measurementId: "G-GQDLN6DEKQ"
  };

  initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`);

    const snapShot = await getDoc(userRef);

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userRef, {
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error){
        console.log('error creating user', error.message)
      }
    }

    return userRef;
  };

//   firebase.initializeApp(config);

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