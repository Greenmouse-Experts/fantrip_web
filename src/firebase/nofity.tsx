import { useState, useEffect, useRef } from "react";
import { onMessageListener, requestForToken } from "../firebase/firebase";
import { useToast } from "@chakra-ui/react";
import audioFile from "../assets/audio/notify.mp3";

interface Notify {
  title: string;
  body: string;
}

const PushNotification = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [audio] = useState(new Audio(audioFile));
  const [notification, setNotification] = useState<Notify>({
    title: "",
    body: "",
  });
  const toast = useToast();
  const initializedRef = useRef(false); // Ref to track initialization

  useEffect(() => {
    if (initializedRef.current) return; // Skip if already initialized
    initializedRef.current = true; // Set to true after first run

    const checkAndRequestPermission = async () => {
      if (!("Notification" in window)) {
        console.error("This browser does not support notifications");
        return;
      }

      const currentPermission = Notification.permission;
      setPermission(currentPermission);

      if (currentPermission === "default") {
        const result = await Notification.requestPermission();
        setPermission(result);

        if (result === "granted") {
          requestForToken();
        }
      } else if (currentPermission === "granted") {
        requestForToken();
      }
    };

    checkAndRequestPermission();
  }, []);

  const playNotificationSound = async () => {
    try {
      await audio.play();
    } catch (error) {
      console.error("Error playing notification sound:", error);
    }
  };

  const notify = () =>
    toast({
      render: () => (
        <div className="text-white bg-primary w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
          <ToastDisplay />
        </div>
      ),
      position: "top",
    });

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      if (permission === "granted") {
        playNotificationSound();
        notify();
      } else {
        console.warn("Notification permission not granted");
      }
    }
  }, [notification]);

  useEffect(() => {
    const onMessage = async () => {
      onMessageListener()
        .then((payload: any) => {
          setNotification({
            title: payload?.notification?.title,
            body: payload?.notification?.body,
          });
        })
        .catch((err) => console.log("failed: ", err));
    };

    onMessage();
  }, []);

  return <></>;
};

export default PushNotification;
