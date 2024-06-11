import LandingLayout from "@/layout/landing";
import LandingAbout from "@/pages/landing/about";
import { AreaGuide } from "@/pages/landing/area-guide";
import CommunityGuidelines from "@/pages/landing/community-guideline";
import CookiePage from "@/pages/landing/cookie";
import FaqsPage from "@/pages/landing/faqs";
import FindStay from "@/pages/landing/find-stay";
import FindStayDetails from "@/pages/landing/find-stay-details";
import GetAppPage from "@/pages/landing/get-app";
import HelpPage from "@/pages/landing/help-page";
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
            path: 'faqs',
            element: <FaqsPage />,
          },
          {
            path: 'get-help',
            element: <HelpPage/>,
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
            path: 'get-app',
            element: <GetAppPage/>,
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
          {
            path: 'community-guidelines',
            element: <CommunityGuidelines />,
          },
        ],
      },
]