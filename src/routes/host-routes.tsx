import UserDashboardLayout from "@/layout/host";
import HostAmenityPage from "@/pages/host/amenities";
import HostAreaGuide from "@/pages/host/area-guide";
import HostBookings from "@/pages/host/booking";
import UserDashboard from "@/pages/host/dashboard";
import HostEditListing from "@/pages/host/edit-listing";
import HostInbox from "@/pages/host/inbox";
import HostListings from "@/pages/host/listings";
import HostPayments from "@/pages/host/payments";
import HostReservationPage from "@/pages/host/reservation";
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
            path: 'listings/:id',
            element: <HostEditListing/>,
          },
          {
            path: 'bookings',
            element: <HostBookings/>,
          },
          {
            path: 'reservations',
            element: <HostReservationPage/>,
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
            path: 'area-guide',
            element: <HostAreaGuide/>,
          },
          {
            path: 'payments',
            element: <HostPayments/>,
          },
          {
            path: 'amenities',
            element: <HostAmenityPage/>,
          },
          {
            path: 'settings',
            element: <HostSettings/>,
          },
        ],
      },
]