import TopDestinationSwiper from "./destination-swiper"

const TopDestination = () => {
    return (
        <div className="section pt-6">
            <div className="box">
                <div className="flex justify-between">
                    <p className="text-2xl lg:text-4xl fw-600 syne">Restaurants in top destinations</p>
                    <p>See all</p>
                </div>
                <div>
               <TopDestinationSwiper/>
            </div>
            </div>
        </div>
      )
}

export default TopDestination