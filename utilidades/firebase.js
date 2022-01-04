import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD505Ht9hcPvNv5gxOj5EC1Ti2ul8hF2VM",
    authDomain: "restaurantes-ba91c.firebaseapp.com",
    projectId: "restaurantes-ba91c",
    storageBucket: "restaurantes-ba91c.appspot.com",
    messagingSenderId: "1050323472937",
    appId: "1:1050323472937:web:647f46e54377172938c238"
  };
  
  // Initialize Firebase
  export const firebaseApp = firebase.initializeApp(firebaseConfig);