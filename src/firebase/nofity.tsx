import { useState, useEffect } from "react";
import { onMessageListener, requestForToken } from "../firebase/firebase";
import { useToast } from "@chakra-ui/react";
import audioFile from "../assets/audio/notify.mp3"
interface Notify {
  title: string;
  body: string;
}
const PushNotification = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [audio] = useState(new Audio(audioFile)); // Replace with your sound file

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      if (!('Notification' in window)) {
        console.error('This browser does not support notifications');
        return;
      }

      // Get current permission status
      setPermission(Notification.permission);

      // Automatically request permission if in default state
      // Uncomment the following lines to enable automatic permission request
      if (Notification.permission === 'default') {
        const result = await Notification.requestPermission();
        setPermission(result);
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

  const [notification, setNotification] = useState<Notify>({
    title: "",
    body: "",
  });

  const toast = useToast();

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
      if (permission !== "granted") {
        console.warn("Notification permission not granted");
        return;
      } else {
        playNotificationSound();
      }
      notify();
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload: any) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return <></>;
};

export default PushNotification;
