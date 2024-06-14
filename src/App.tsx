import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { landingRooutes } from "./routes/landing-routes";
import { ChakraProvider } from "@chakra-ui/react";
import { authRooutes } from "./routes/auth-routes";
import { userRoutes } from "./routes/user-routes";
import { hostRoutes } from "./routes/host-routes";
import ChatInterface from "./modules/chat/stay-chat/components/chat-interface";
import { useUtils } from "./hooks/useUtils";
import ReactModal from "react-modal-resizable-draggable";

const router = createBrowserRouter([
  ...landingRooutes,
  ...authRooutes,
  ...userRoutes,
  ...hostRoutes,
]);

function App() {
  const { stayChatModal: showModal, toggleStayChatmodal: setShowModal } =
    useUtils();
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
      <ReactModal
        minWidth={400}
        minHeight={500}
        initWidth={400}
        initHeight={500}
        onFocus={() => console.log("Modal is clicked")}
        className={"rounded-xl overflow-hidden"}
        onRequestClose={() => setShowModal(true)}
        isOpen={showModal}
      >
        <ChatInterface close={() => setShowModal(false)} />
      </ReactModal>
    </ChakraProvider>
  );
}

export default App;
