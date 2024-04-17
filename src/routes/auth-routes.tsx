import ForgetPasswordPage from "@/pages/auth/forget";
import LoginPage from "@/pages/auth/login";
import RegistrationPage from "@/pages/auth/register";
import ResetPasswordPage from "@/pages/auth/reset";
import VerifyUser from "@/pages/auth/verify";

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
  {
    path: "/auth/confirm",
    element: <VerifyUser/>
  },
  {
    path: "/auth/reset",
    element: <ResetPasswordPage/>
  }
];
