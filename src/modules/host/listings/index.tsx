import ListingAnalytics from "./component/listing-analytics"
import StayListingTanle from "./component/stay-table"

const HostListingindex = () => {
  return (
    <div>
      <div>
        <ListingAnalytics />
      </div>
      <div className="mt-6">
        <StayListingTanle/>
      </div>
    </div>
  )
}

export default HostListingindex