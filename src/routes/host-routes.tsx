import UserDashboardLayout from "@/layout/host";
import HostAmenityPage from "@/pages/host/amenities";
import HostBookings from "@/pages/host/booking";
import UserDashboard from "@/pages/host/dashboard";
import HostEditListing from "@/pages/host/edit-listing";
import HostInbox from "@/pages/host/inbox";
import HostListings from "@/pages/host/listings";
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