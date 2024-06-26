import { useState } from "react"
import SidebarLayout from "./sidebar"
import UserAccount from "./profile-components/account"
import UserSecurity from "./profile-components/security"
import UserReferrals from "./profile-components/referrals"
import MobileSidebar from "./sidebar/mobile-callout"

const ProfileComponent = () => {
    const [active, setActive] = useState(1)
  return (
    <div className="lg:flex justify-between lg:px-10">
        <div className="lg:hidden">
          <MobileSidebar active={active} setActive={setActive}/>
        </div>
        <div className="hidden lg:block lg:w-[32%] p-5 border-gradient sidebar-shadow">
            <SidebarLayout active={active} setActive={setActive}/>
        </div>
        <div className="lg:w-[65%]">
            {active === 1 && <UserAccount/>}
            {active === 2 && <UserSecurity/>}
            {active === 3 && <UserReferrals/>}
        </div>
    </div>
  )
}

export default ProfileComponent