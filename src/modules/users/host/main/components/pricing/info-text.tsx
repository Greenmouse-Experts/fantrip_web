import { BsInfoCircle } from "react-icons/bs"

const InfoText = () => {
  return (
    <div className="flex gap-x-4">
        <BsInfoCircle className="shrink-0 text-sm lg:text-[17px] relative top-[4px]" />
        <div className="w-full text-[#494949]">
            <p>Our focus is on affordability and fan community. We encourage hosts to set a base price that they feel fairly compensates them for hosting. When setting your price, consider:</p>
            <ul className="list-disc grid gap-4 mt-5 pl-3">
                <li><span className="fw-500">Location:</span> Is your listing near the stadium, attractions, or transport hubs? High-cost-of-living areas may warrant higher prices than low-cost-of-living areas. <span className="text-[#9847FE]">Please be fair and considerate in your pricing</span>. Remember, you are hosting a fan like you.</li>
                <li><span className="fw-500">Apartment style:</span> The appeal of the accommodation type is crucial in pricing. Whether offering simple options like a couch or a bed on the floor, or more upscale choices like a modern loft, cozy studio, or a family unit, the style and comfort level should directly affect the price. </li>
                <li><span className="fw-500">Number of guests:</span> Pricing should start with a base rate for a standard number of guests and include additional fees for extra guests. This approach helps maintain fairness in pricing based on the number of people using the space.</li>
            </ul>
        </div>
    </div>
  )
}

export default InfoText