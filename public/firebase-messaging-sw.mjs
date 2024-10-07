// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const API_KEY = `${import.meta.env.VITE_FIREBASE_API_KEY}`;
const AUTH_DOMAIN = `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`;
const PROJECT_ID = `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`;
const STORAGE_BUCKET = `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`;
const MESSAGING_SENDER_ID = `${
  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
}`;
const APP_ID = `${import.meta.env.VITE_FIREBASE_APP_ID}`;
const MEASUREMENT_ID = `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});