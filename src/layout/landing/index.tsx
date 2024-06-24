import { Outlet } from "react-router-dom"
import LandingHeader from "./header"
import LandingFooter from "./footer"
import ScrollToTop from "@/lib/utils/scrollTop"
import ChatProvider from "../chat/chat-provider"


const LandingLayout = () => {
  return (
    <div>
      <ScrollToTop />
        <LandingHeader/>
        <ChatProvider/>
        <Outlet/>
        <LandingFooter/>
    </div>
  )
}

export default LandingLayout