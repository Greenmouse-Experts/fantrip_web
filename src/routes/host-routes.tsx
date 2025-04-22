import SEO from "@/components/SEO";
import UserDashboardLayout from "@/layout/host";
import HostAccounts from "@/pages/host/accounts";
import HostAmenityPage from "@/pages/host/amenities";
import HostBookings from "@/pages/host/booking";
import UserDashboard from "@/pages/host/dashboard";
import HostEditListing from "@/pages/host/edit-listing";
import HostInbox from "@/pages/host/inbox";
import HostListings from "@/pages/host/listings";
import HostNotification from "@/pages/host/notification";
import HostPayments from "@/pages/host/payments";
import HostRecommendations from "@/pages/host/recommendations";
import HostReservationPage from "@/pages/host/reservation";
import HostSettings from "@/pages/host/settings";
import HostTransactions from "@/pages/host/transactions";

export const hostRoutes = [
  {
    path: '/host/',
    element: (
      <>
        <SEO title="Host" />
        <UserDashboardLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: 'listings',
        element: <HostListings />,
      },
      {
        path: 'listings/:id',
        element: <HostEditListing />,
      },
      {
        path: 'bookings',
        element: <HostBookings />,
      },
      {
        path: 'reservations',
        element: <HostReservationPage />,
      },
      {
        path: 'accounts',
        element: <HostAccounts />,
      },
      {
        path: 'transact',
        element: <HostTransactions />,
      },
      {
        path: 'inbox',
        element: <HostInbox />,
      },
      {
        path: 'area-guide',
        element: <HostRecommendations />,
      },
      {
        path: 'payments',
        element: <HostPayments />,
      },
      {
        path: 'amenities',
        element: <HostAmenityPage />,
      },
      {
        path: 'settings',
        element: <HostSettings />,
      },
      {
        path: 'notifications',
        element: <HostNotification />,
      },
    ],
  },
]