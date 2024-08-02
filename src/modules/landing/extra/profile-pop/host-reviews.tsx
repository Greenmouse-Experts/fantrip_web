import EmptyReview from '@/components/empty-states/empty-review'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

const HostReviews = () => {
    // const reviews = [
    //     {
    //         name: "Emily S.",
    //         post: "Chris was an amazing host! The apartment was spotless and had everything we needed. The location was perfect, and Chris's local tips made our stay even better. Highly recommend!",
    //         date: "june 2024",
    //         picture: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1718361962/fantrip/Ellipse_974_ksptr4.png"
    //     },
    //     {
    //         name: "Jennifer Lawrence",
    //         post: "The apartment was spotless and had everything we needed.Chris was an amazing host!  The location was perfect, and Chris's local tips made our stay even better. Highly recommend!",
    //         date: "April 2024",
    //         picture: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"
    //     },
    // ]
  return (
    <div>
        <div className='flex justify-between items-center'>
        <p className='text-lg fw-600'>Reviews from past guests</p>
        <div className='flex gap-x-2 items-center'>
            <button className='w-5 h-5 circle border border-gray-600 place-center'>
                <IoArrowBack/>
            </button>
            <button className='w-5 h-5 circle border border-gray-600 place-center'>
                <IoArrowForward/>
            </button>
        </div>
        </div>
        <div className='mt-4'>
            <div>
                <EmptyReview/>
            </div>
            {/* <div className='flex gap-x-4 w-full overflow-x-auto scroll-pro'>
                {
                    reviews.map((item) => (
                        <div className='bg-gradient rounded-[23px] p-[1px]'>
                            <div className='bg-[#EDEDFF] rounded-[23px] p-4 w-[340px]'>
                            <div>
                                <p className='fs-500'>"{item.post}"</p>
                            </div>
                            <div className='flex justify-end mt-3'>
                                <div className='flex gap-x-2'>
                                    <div>
                                        <p className='fw-600'>{item.name}</p>
                                        <p>{item.date}</p>
                                    </div>
                                    <img src={item.picture} alt="avatar" className='w-12 shrink-0 aspect-square object-cover circle' />
                                </div>
                            </div>
                            </div>
                        </div>
                    ))
                }
            </div> */}
        </div>
    </div>
  )
}

export default HostReviews