import LandingLayout from "@/layout/landing";
import LandingAbout from "@/pages/landing/about";
import { AreaGuide } from "@/pages/landing/area-guide";
import CookiePage from "@/pages/landing/cookie";
import FindStay from "@/pages/landing/find-stay";
import FindStayDetails from "@/pages/landing/find-stay-details";
import LandingHomepage from "@/pages/landing/homepage";
import PrivacyPage from "@/pages/landing/privacy";
import TermsPage from "@/pages/landing/terms";

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
          {
            path: 'area-guide',
            element: <AreaGuide />,
          },
          {
            path: 'privacy',
            element: <PrivacyPage />,
          },
          {
            path: 'terms',
            element: <TermsPage />,
          },
          {
            path: 'cookie',
            element: <CookiePage />,
          },
        ],
      },
]