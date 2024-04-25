import AdminDashboardLayout from "@/layout/admin";
import AdminDasboard from "@/pages/admin/dashboard";

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