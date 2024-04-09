import { CiDiscount1 } from "react-icons/ci"
import { FaStar, FaWifi } from "react-icons/fa6"
import { IoMdWine } from "react-icons/io"
import { IoChatboxEllipsesOutline, IoPricetagOutline } from "react-icons/io5"
import { MdOutlineBalcony } from "react-icons/md"
import { SlScreenDesktop } from "react-icons/sl"
import { VscJersey } from "react-icons/vsc"

const CondoDetails = () => {
  return (
    <div>
        <div className="flex gap-x-4">
            <div className="flex px-4 py-2 shadow-lg gap-x-3 items-center">
                <FaStar className="text-[#9847FE]"/>
                <p className="fw-500">Top Rated</p>
            </div>
            <div className="flex px-4 py-2 shadow-lg gap-x-3 items-center">
                <IoChatboxEllipsesOutline className="text-[#9847FE]"/>
                <p className="fw-500">Ask a question</p>
            </div>
        </div>
        <div className="mt-6 lg:mt-10 border-b border-[#D2D2D2] pb-5 lg:pb-8">
            <p className="text-lg lg:text-3xl fw-600">Modern Condo</p>
            <p className="mt-2 text-[#494949]">1 Double Bed . Shared Bathroom</p>
        </div>
        <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
            <p className="fw-600 lg:text-lg">Amenities and Unique Features</p>
            <div className="mt-4">
                <ul className="grid lg:grid-cols-2 gap-5">
                    <li className="flex items-center gap-x-3">
                        <SlScreenDesktop className="text-[#9847FE]"/>
                        <p className="fs-400">50" 4K TV with Premium Sports Package</p>
                    </li>
                    <li className="flex items-center gap-x-3">
                        <MdOutlineBalcony className="text-[#9847FE]"/>
                        <p className="fs-400">Access to a private balcony with stadium view</p>
                    </li>
                    <li className="flex items-center gap-x-3">
                        <FaWifi className="text-[#9847FE]"/>
                        <p className="fs-400">High-speed Wi-Fi for streaming the games</p>
                    </li>
                    <li className="flex items-center gap-x-3">
                        <VscJersey className="text-[#9847FE] text-[18px]"/>
                        <p className="fs-400">Complimentary team merch for guests</p>
                    </li>
                    <li className="flex items-center gap-x-3">
                        <IoMdWine className="text-[#9847FE]"/>
                        <p className="fs-400">In-house mini-bar stocked with game day snacks</p>
                    </li>
                </ul>
            </div>
        </div>
        <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <p className="fw-600 lg:text-lg">Special Offers</p>
        <div className="mt-5">
            <ul className="grid gap-5">
                <li className="flex items-center gap-x-3">
                    <CiDiscount1 className="text-[18px] text-[#9847FE]"/>
                    <p className="fs-400">10% off for game weekend bookings</p>
                </li>
                <li className="flex items-center gap-x-3">
                    <CiDiscount1 className="text-[18px] text-[#9847FE]"/>
                    <p className="fs-400">Stay for 7 nights, get one night free</p>
                </li>
            </ul>
        </div>
        </div>
        <div className="mt-6 border-b border-[#D2D2D2] pb-5 lg:pb-8">
        <p className="fw-600 lg:text-lg">Pricing</p>
        <div className="mt-5">
            <ul className="grid gap-5">
                <li className="flex items-center gap-x-3">
                    <IoPricetagOutline className="text-[18px] text-[#9847FE]"/>
                    <p className="fs-400">Weekdays: €70/night</p>
                </li>
                <li className="flex items-center gap-x-3">
                    <IoPricetagOutline className="text-[18px] text-[#9847FE]"/>
                    <p className="fs-400">Game Days/Weekends: $119/night</p>
                </li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default CondoDetails