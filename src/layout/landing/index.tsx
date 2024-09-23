import { Outlet } from "react-router-dom"
import LandingHeader from "./header"
import LandingFooter from "./footer"
import ScrollToTop from "@/lib/utils/scrollTop"
import ChatProvider from "../chat/chat-provider"
import CookieModal from "@/components/cookie-modal"


const LandingLayout = () => {
  return (
    <div>
      <ScrollToTop />
        <LandingHeader/>
        <ChatProvider/>
        <CookieModal/>
        <Outlet/>
        <LandingFooter/>
    </div>
  )
}

export default LandingLayout