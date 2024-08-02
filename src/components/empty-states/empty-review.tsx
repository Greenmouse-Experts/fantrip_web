import { IoMdChatbubbles } from 'react-icons/io'

const EmptyReview = () => {
  return (
    <div className='py-12 text-center'>
        <div className='flex justify-center'>
            <IoMdChatbubbles className='text-4xl lg:text-6xl text-prima'/>
        </div>
        <p className='syne'>No Reviews yet</p>
    </div>
  )
}

export default EmptyReview