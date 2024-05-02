import { useState } from 'react'
import SetupSidebar from './sidebar/setup-sidebar'
import ProfileSetup from './components/profile-setup'
import SetupPhotos from './components/photos'
import SetupBio from './components/bio'
import SetupSocials from './components/socials'
import SetupVerification from './components/verification'

const HostSetupIndex = () => {
    const [active, setActive] = useState(1)
  return (
    <div className='flex lg:gap-x-12'>
        <div className='lg:w-[35%]'>
            <SetupSidebar active={active}/>
        </div>
        <div className='lg:w-[65%]'>
            {
                active === 1 && <ProfileSetup next={() => setActive(2)}/>}
                {active === 2 && <SetupPhotos prev={() => setActive(1)} next={() => setActive(3)}/>}
                {active === 3 && <SetupBio prev={() => setActive(2)} next={() => setActive(4)}/>}
                {active === 4 && <SetupSocials prev={() => setActive(3)} next={() => setActive(5)}/>}
                {active === 5 && <SetupVerification prev={() => setActive(4)}/>}
        </div>
    </div>
  )
}

export default HostSetupIndex