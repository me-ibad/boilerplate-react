import React, { useEffect } from 'react';

// import firebase from '../../config/firebase';
import { initializeApp } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  initializeAuth,
  browserSessionPersistence,
  browserPopupRedirectResolver,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function Home() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCqDb8e3lA9XRP1Y7pSb4tDDxZktdFlHHM',
    authDomain: 'fire-base-react-33e3a.firebaseapp.com',
    projectId: 'fire-base-react-33e3a',
    storageBucket: 'fire-base-react-33e3a.appspot.com',
    messagingSenderId: '853770171127',
    appId: '1:853770171127:web:85dd44cde889dc456e19f2',
    measurementId: 'G-DTF9DWBJ7T',
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    alert(error);
    if (user) {
      alert('d');
      window.recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
        },
        auth
      );

      async function onSignInSubmit() {
        alert('called');
        const phoneNumber = '+9230840088537';
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).

            alert('submiy');
            window.confirmationResult = confirmationResult;
            // ...
          })
          .catch((error) => {
            // Error; SMS not sent

            alert('errr');
            // ...
          });
      }
    }
  }, []);

  return (
    <div>
      <span>Home</span>
    </div>
  );
}

export default Home;
