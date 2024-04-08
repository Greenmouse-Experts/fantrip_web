import LandingLayout from "@/layout/landing";
import LandingAbout from "@/pages/landing/about";
import FindStay from "@/pages/landing/find-stay";
import FindStayDetails from "@/pages/landing/find-stay-details";
import LandingHomepage from "@/pages/landing/homepage";

export const landingRooutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
          {
            index: true,
            element: <LandingHomepage />,
          },
          {
            path: 'about',
            element: <LandingAbout />,
          },
          {
            path: 'find-stay',
            element: <FindStay />,
          },
          {
            path: 'find-stay/:id',
            element: <FindStayDetails />,
          },
        ],
      },
]