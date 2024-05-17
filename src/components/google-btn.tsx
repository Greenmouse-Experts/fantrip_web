import logo from '@/assets/google.png'
import { FC } from 'react'

interface Props{
    text: string
}
const GoogleButton:FC<Props> = ({text}) => {
  return (
    <div className='border-[1.35px] cursor-pointer border-[#DDDDDD] flex items-center justify-center gap-x-6 py-2 rounded-[6.7px]'>
        <img src={logo} alt="logo" className='w-4 md:w-7'/>
        <p className='inter fs-400 lg:text-lg'>{text}</p>
    </div>
  )
}

export default GoogleButton