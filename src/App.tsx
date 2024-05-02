import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { landingRooutes } from "./routes/landing-routes";
import { ChakraProvider } from "@chakra-ui/react";
import { authRooutes } from "./routes/auth-routes";
import { userRoutes } from "./routes/user-routes";
import { adminRoutes } from "./routes/host-routes";

const router = createBrowserRouter([
  ...landingRooutes,
  ...authRooutes,
  ...userRoutes,
  ...adminRoutes,
]);

function App() {
  // const [screenLoading, setScreenLoading] = useState(false);

  // useEffect(() => {
  //   setScreenLoading(true);
  //   setTimeout(() => {
  //     setScreenLoading(false);
  //   }, 3000);
  // }, []);
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
