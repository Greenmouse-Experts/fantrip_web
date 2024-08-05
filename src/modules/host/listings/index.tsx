import ListingAnalytics from "./component/listing-analytics"
import StayListingTable from "./component/stay-table"

const HostListingindex = () => {
  return (
    <div>
      <div>
        <ListingAnalytics />
      </div>
      <div className="mt-6">
        <StayListingTable/>
      </div>
    </div>
  )
}

export default HostListingindex