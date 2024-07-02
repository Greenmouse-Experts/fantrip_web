import { useState, useEffect } from "react";
import { onMessageListener, requestForToken } from "../firebase/firebase";
import { useToast } from "@chakra-ui/react";
interface Notify {
  title: string;
  body: string;
}
const PushNotification = () => {
  const [notification, setNotification] = useState<Notify>({
    title: "",
    body: "",
  });
  const toast = useToast();
  const notify = () =>
    toast({
      render: () => (
        <div className="text-white w-[290px] text-center fw-600 syne bg-gradient rounded p-3">
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
