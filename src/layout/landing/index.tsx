import { Outlet } from "react-router-dom"
import LandingHeader from "./header"
import LandingFooter from "./footer"
import ScrollToTop from "@/lib/utils/scrollTop"

const LandingLayout = () => {
  return (
    <div>
      <ScrollToTop />
        <LandingHeader/>
        <Outlet/>
        <LandingFooter/>
    </div>
  )
}

export default LandingLayout