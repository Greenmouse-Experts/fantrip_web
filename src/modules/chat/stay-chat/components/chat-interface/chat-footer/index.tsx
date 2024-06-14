import { IoSend } from 'react-icons/io5'

const ChatFooter = () => {
  return (
    <div className='p-2'>
        <div className='border border-gray-500 rounded-full flex'>
            <input type="text" className='p-2 pl-4 w-full rounded-l-full outline-none' />
            <button className='w-16 shrink-0 place-center bg-[#9847fe] rounded-r-full text-white'><IoSend className='text-xl'/></button>
        </div>
    </div>
  )
}

export default ChatFooter