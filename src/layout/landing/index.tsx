import { Outlet } from "react-router-dom"
import LandingHeader from "./header"
import LandingFooter from "./footer"

const LandingLayout = () => {
  return (
    <div>
        <LandingHeader/>
        <Outlet/>
        <LandingFooter/>
    </div>
  )
}

export default LandingLayout