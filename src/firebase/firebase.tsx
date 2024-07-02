// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useMutation } from "@tanstack/react-query";
import { addFcmToken } from "@/services/api/routine";

const VAPID_KEY = import.meta.env.VITE_VAPID_KEY;
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
export const app = initializeApp(firebaseConfig);

export const requestForToken = async () => {
  const messaging = getMessaging(app);

  await getToken(messaging, { vapidKey: `${VAPID_KEY}` })
    .then((currentToken: string) => {
      if (currentToken) {
        sendToken(currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err: any) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const sendToken = async (payload: string) => {
  const data = {
    deviceType: "Web",
    token: payload,
  };
  useMutation({
    mutationFn: () => addFcmToken(data),
    mutationKey: ["save_fcm"],
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
