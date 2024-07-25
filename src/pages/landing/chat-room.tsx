import useAuth from "@/hooks/authUser";
import ChatIndex from "@/modules/chat/chat-room";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, []);
  if (isLoggedIn)
    return (
      <div>
        <ChatIndex/>
      </div>
    );
};

export default ChatPage;
