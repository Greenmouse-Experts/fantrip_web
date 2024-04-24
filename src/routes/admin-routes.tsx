import AdminDashboardLayout from "@/layout/admin";
import AdminDasboard from "@/pages/admin/dashboard";
import HostSetup from "@/pages/users/host-setup";
import UserProfile from "@/pages/users/user-profile";

export const adminRoutes = [
    {
        path: '/admin/',
        element: <AdminDashboardLayout />,
        children: [
          {
            index: true,
            element: <AdminDasboard/>,
          },
          {
            path: 'settings',
            element: <UserProfile />,
          },
          {
            path: 'host-setup',
            element: <HostSetup />,
          },
        ],
      },
]