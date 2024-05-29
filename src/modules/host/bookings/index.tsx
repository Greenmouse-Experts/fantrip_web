import BookingAnalytics from "./booking-analytics"
import BookingListingTable from "./booking-table"

const BookingIndex = () => {
  return (
    <div>
      <div>
        <BookingAnalytics />
      </div>
      <div className="mt-6">
        <BookingListingTable/>
      </div>
    </div>
  )
}

export default BookingIndex