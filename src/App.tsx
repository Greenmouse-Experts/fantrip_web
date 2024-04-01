import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { landingRooutes } from "./routes/landing-routes";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([...landingRooutes]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
