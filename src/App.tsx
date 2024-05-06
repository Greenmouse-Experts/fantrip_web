import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { landingRooutes } from "./routes/landing-routes";
import { ChakraProvider } from "@chakra-ui/react";
import { authRooutes } from "./routes/auth-routes";
import { userRoutes } from "./routes/user-routes";
import { hostRoutes } from "./routes/host-routes";

const router = createBrowserRouter([
  ...landingRooutes,
  ...authRooutes,
  ...userRoutes,
  ...hostRoutes,
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
