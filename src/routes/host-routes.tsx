import UserDashboardLayout from "@/layout/host";
import HostBookings from "@/pages/host/booking";
import UserDashboard from "@/pages/host/dashboard";
import HostInbox from "@/pages/host/inbox";
import HostListings from "@/pages/host/listings";
import HostSettings from "@/pages/host/settings";
import HostTransactions from "@/pages/host/transactions";

export const hostRoutes = [
    {
        path: '/host/',
        element: <UserDashboardLayout />,
        children: [
          {
            index: true,
            element: <UserDashboard/>,
          },
          {
            path: 'listings',
            element: <HostListings/>,
          },
          {
            path: 'bookings',
            element: <HostBookings/>,
          },
          {
            path: 'transact',
            element: <HostTransactions/>,
          },
          {
            path: 'inbox',
            element: <HostInbox/>,
          },
          {
            path: 'settings',
            element: <HostSettings/>,
          },
        ],
      },
]