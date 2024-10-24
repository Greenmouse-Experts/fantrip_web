// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// const API_KEY = `${import.meta.env.VITE_FIREBASE_API_KEY}`;
// const AUTH_DOMAIN = `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`;
// const PROJECT_ID = `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`;
// const STORAGE_BUCKET = `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`;
// const MESSAGING_SENDER_ID = `${
//   import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
// }`;
// const APP_ID = `${import.meta.env.VITE_FIREBASE_APP_ID}`;
// const MEASUREMENT_ID = `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`;

const firebaseConfig = {
  apiKey: "AIzaSyCNkgXixFhJ7Sj-7iLCJzgNMDqe0pQvKh8",
  authDomain: "fantrip-4b016.firebaseapp.com",
  projectId: "fantrip-4b016",
  storageBucket: "fantrip-4b016.appspot.com",
  messagingSenderId: "772695799759",
  appId: "1:772695799759:web:180812b3c685e6226b44ba",
  measurementId: "G-CVMWDCQC0Y",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // Play sound
  const audio = new Audio("/notify.mp3");
  audio.play().catch((error) => console.error("Error playing sound:", error));

  self.registration.showNotification(notificationTitle, notificationOptions);
});
