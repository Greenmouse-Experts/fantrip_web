import ForgetPasswordPage from "@/pages/auth/forget";
import LoginPage from "@/pages/auth/login";
import RegistrationPage from "@/pages/auth/register";

export const authRooutes = [
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegistrationPage />,
  },
  {
    path: "/auth/forget",
    element: <ForgetPasswordPage />,
  },
];
