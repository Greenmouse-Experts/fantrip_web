import { useState } from 'react'
import UserAccount from '@/modules/users/profile/profile-components/account'
import UserReferrals from '@/modules/users/profile/profile-components/referrals'
import UserSecurity from '@/modules/users/profile/profile-components/security'
import SettingSideMenu from './side-menu'
import MobileSidebar from './mobile-callout'

const HostSettingsIndex = () => {
    const [active, setActive] = useState(1)
    return (
      <div className="lg:flex justify-between">
         <div className="lg:hidden">
          <MobileSidebar active={active} setActive={setActive}/>
        </div>
          <div className="hidden lg:block lg:w-[23%] p-5 border-gradient sidebar-shadow">
              <SettingSideMenu active={active} setActive={setActive}/>
          </div>
          <div className="lg:w-[75%]">
              {active === 1 && <UserAccount/>}
              {active === 2 && <UserSecurity/>}
              {active === 3 && <UserReferrals/>}
          </div>
      </div>
    )
}

export default HostSettingsIndex