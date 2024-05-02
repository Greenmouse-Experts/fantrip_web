import AdminDashboardLayout from "@/layout/host";
import AdminDasboard from "@/pages/host/dashboard";

export const adminRoutes = [
    {
        path: '/admin/',
        element: <AdminDashboardLayout />,
        children: [
          {
            index: true,
            element: <AdminDasboard/>,
          },
          // {
          //   path: 'settings',
          //   element: <UserProfile />,
          // },
          // {
          //   path: 'host-setup',
          //   element: <HostSetup />,
          // },
        ],
      },
]