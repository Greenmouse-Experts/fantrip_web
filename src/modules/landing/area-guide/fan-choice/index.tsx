import FanChoiceSwiper from "./fan-choice-swiper"

const FanChoice = () => {
  return (
    <div className="section pb-6">
        <div className="box">
            <div className="flex justify-between">
                <p className="text-2xl lg:text-4xl fw-600 syne">Fans&apos; Choice: Dining & Restaurants</p>
                <p>See all</p>
            </div>
            <div>
            <FanChoiceSwiper/>
        </div>
        </div>
    </div>
  )
}

export default FanChoice