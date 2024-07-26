import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { landingRooutes } from "./routes/landing-routes";
import { ChakraProvider } from "@chakra-ui/react";
import { authRooutes } from "./routes/auth-routes";
import { userRoutes } from "./routes/user-routes";
import { hostRoutes } from "./routes/host-routes";
import { GOOGLE_AUTH_KEY } from "./services/constant";

const router = createBrowserRouter([
  ...landingRooutes,
  ...authRooutes,
  ...userRoutes,
  ...hostRoutes,
]);

function App() {
  return (
    <ChakraProvider>
      <GoogleOAuthProvider clientId={`${GOOGLE_AUTH_KEY}`}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </ChakraProvider>
  );
}

export default App;
