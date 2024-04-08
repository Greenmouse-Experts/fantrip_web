import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { landingRooutes } from "./routes/landing-routes";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ScreenLoader from "./lib/utils/screen-loader";
import { authRooutes } from "./routes/auth-routes";

const router = createBrowserRouter([...landingRooutes, ...authRooutes]);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <></>,
//     children: [...landingRooutes, ...authRooutes],
//   },
// ]);

function App() {
  const [screenLoading, setScreenLoading] = useState(false);

  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 3000);
  }, []);
  return (
    <ChakraProvider>
      {screenLoading && <ScreenLoader />}
      {!screenLoading && <RouterProvider router={router} />}
    </ChakraProvider>
  );
}

export default App;
