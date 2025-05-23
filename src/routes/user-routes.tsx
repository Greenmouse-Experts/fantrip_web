import SEO from "@/components/SEO";
import UserLayout from "@/layout/users";
import BookingPage from "@/pages/users/booking";
import BookingSuccess from "@/pages/users/booking-success";
import GuestActivity from "@/pages/users/guest-activity";
import GuestActivityWrapper from "@/pages/users/guest-activity-wrapper";
import HostaFan from "@/pages/users/host";
import HostSetup from "@/pages/users/host-setup";
import GuestNotification from "@/pages/users/notifications";
import PaymentModalWrapper from "@/pages/users/payment-modal-wrapper";
import GuestRecommendations from "@/pages/users/recommendations";
import GuestReservationPage from "@/pages/users/reservation";
import UserProfile from "@/pages/users/user-profile";

export const userRoutes = [
  {
    path: '/user/',
    element: (
      <>
        <SEO title="Users" />
        <UserLayout />
      </>
    ),
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
      {
        path: 'booking',
        element: <BookingPage />,
      },
      {
        path: 'reservation',
        element: <GuestReservationPage />,
      },
      {
        path: 'recommendations',
        element: <GuestRecommendations />,
      },
      {
        path: 'booking-success/:id',
        element: <BookingSuccess />,
      },
      {
        path: 'notifications',
        element: <GuestNotification />,
      },
      {
        path: "guest-activity",
        element: <GuestActivityWrapper />,
        children: [
          { path: "payment/:id", element: <PaymentModalWrapper /> },
        ],
      },
      {
        path: 'guest-activity',
        element: <GuestActivity />
      }
    ],
  },
]