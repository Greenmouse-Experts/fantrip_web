import  { FC } from 'react'

interface Props{
    close: () => void
}
const MeetProfileIndex:FC<Props> = ({}) => {
  return (
    <div>
        <div className='m-2 p-4 meet-drop rounded-[23px] bg-white'>
            <div className='flex'>
                <div className='w-6/12 text-center'>
                    <div className='w-7/12 mx-auto aspect-square rounded-full bg-gray-400'></div>
                    <p className='fw-600 text-xl lg:text-3xl my-1'>Chris</p>
                    <p className='fw-600 text-green-600 fs-500'>Verified Host</p>
                </div>
                <div className='w-6/12 flex justify-center'>
                    <div className='w-7/12 grid divide-y-2'>
                        <div>
                            <p className='fw-600 text-2xl'>113</p>
                            <p>Reviews</p>
                        </div>
                        <div>
                            <p className='fw-600 text-2xl'>113</p>
                            <p>Reviews</p>
                        </div>
                        <div>
                            <p className='fw-600 text-2xl'>113</p>
                            <p>Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MeetProfileIndex