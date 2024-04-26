import UserLayout from "@/layout/users";
import HostaFan from "@/pages/users/host";
import HostSetup from "@/pages/users/host-setup";
import UserProfile from "@/pages/users/user-profile";

export const userRoutes = [
    {
        path: '/user/',
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <></>,
          },
          {
            path: 'profile',
            element: <UserProfile />,
          },
          {
            path: 'host-setup',
            element: <HostSetup />,
          },
          {
            path: 'host',
            element: <HostaFan />,
          },
        ],
      },
]