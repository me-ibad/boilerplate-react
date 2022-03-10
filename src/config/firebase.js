import firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyCqDb8e3lA9XRP1Y7pSb4tDDxZktdFlHHM',
  authDomain: 'fire-base-react-33e3a.firebaseapp.com',
  projectId: 'fire-base-react-33e3a',
  storageBucket: 'fire-base-react-33e3a.appspot.com',
  messagingSenderId: '853770171127',
  appId: '1:853770171127:web:85dd44cde889dc456e19f2',
  measurementId: 'G-DTF9DWBJ7T',
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export { firebase, auth };
