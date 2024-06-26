import UserLayout from "@/layout/users";
import BookingPage from "@/pages/users/booking";
import BookingSuccess from "@/pages/users/booking-success";
import HostaFan from "@/pages/users/host";
import HostSetup from "@/pages/users/host-setup";
import GuestReservationPage from "@/pages/users/reservation";
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
          {
            path: 'booking',
            element: <BookingPage />,
          },
          {
            path: 'reservation',
            element: <GuestReservationPage />,
          },
          {
            path: 'booking-success/:id',
            element: <BookingSuccess />,
          }
        ],
      },
]