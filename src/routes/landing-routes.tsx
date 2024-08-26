import LandingLayout from "@/layout/landing";
import LandingAbout from "@/pages/landing/about";
import AreaGuideCategoryPlace from "@/pages/landing/area-category-place";
import { AreaGuide } from "@/pages/landing/area-guide";
import AreaGuideCategory from "@/pages/landing/area-guide-catergory";
import AreaGuideLocation from "@/pages/landing/area-guide-location";
import ChatPage from "@/pages/landing/chat-room";
import CommunityGuidelines from "@/pages/landing/community-guideline";
import CookiePage from "@/pages/landing/cookie";
import FaqsPage from "@/pages/landing/faqs";
import FindStay from "@/pages/landing/find-stay";
import FindStayDetails from "@/pages/landing/find-stay-details";
import GetAppPage from "@/pages/landing/get-app";
import HelpPage from "@/pages/landing/help-page";
import LandingHomepage from "@/pages/landing/homepage";
import HostStays from "@/pages/landing/host-stays";
import PriceBooking from "@/pages/landing/price-booking";
import PrivacyPage from "@/pages/landing/privacy";
import RefundPolicy from "@/pages/landing/refund-policy";
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
            path: 'host-stay/:id',
            element: <HostStays />,
          },
          {
            path: 'area-guide',
            element: <AreaGuide />,
          },
          {
            path: 'area-guide/:name',
            element: <AreaGuideCategory />,
          },
          {
            path: 'area-guide/location/:name',
            element: <AreaGuideLocation />,
          },
          {
            path: 'area-guide/:name/:id',
            element: <AreaGuideCategoryPlace />,
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
            path: 'refund-policy',
            element: <RefundPolicy />,
          },
          {
            path: 'booking-pricing',
            element: <PriceBooking />,
          },
          {
            path: 'community-guidelines',
            element: <CommunityGuidelines />,
          },
          {
            path: 'chat-room',
            element: <ChatPage/>,
          },
        ],
      },
]