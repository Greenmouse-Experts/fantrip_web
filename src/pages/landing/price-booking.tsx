import GradientListBox from "@/components/text-format/gradient-list-box";
import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";
import { Link } from "react-router-dom";

const PriceBooking = () => {
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              Fantrip booking cancellation and refund policies
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="box mt-16 lg:mt-8 grid gap-6 lg:gap-10 mb-16 lg:mb-24">
        <div>
          <PolicyHeader text="Fantrip booking pricing" />
          <p className="fw-500 mb-3 lg:mb-4">
            What is the pricing range for accommodations on Fantrip?
          </p>
          <div className="grid gap-5">
            <PolicyList text=" Booking fees on fantrip is intended to make accommodation affordable for sports fans while also ensuring hosts are fairly compensated for their hospitality." />
          </div>
          <p className="fw-500 mb-3 lg:mb-4 mt-5">
            Are there any additional fees for guests?
          </p>
          <div className="grid gap-5">
            <PolicyList text=" We strive for transparency and simplicity in our pricing. There are no hidden or additional fees for guests. The price you see listed is the total price you pay." />
          </div>
          <p className="fw-500 mb-3 lg:mb-4 mt-5">
            How is the service fee calculated for hosts?
          </p>
          <div className="grid gap-5">
            <PolicyList text=" Fantrip charges a flat 12% service fee to hosts. This fee is deducted from the booking cost and covers the operational expenses of our platform, including customer support and secure payment processing." />
          </div>
          <p className="fw-500 mb-3 lg:mb-4 mt-5">
            Do you charge for additional guests?
          </p>
          <div className="grid gap-5">
            <PolicyList text="To maintain simplicity, we do not charge extra for additional guests up to a certain number (e.g., four guests). Beyond this number, a flat fee may apply, which will be clearly communicated in the listing." />
          </div>
          <p className="fw-500 mb-3 lg:mb-4 mt-5">
            How does Fantrip handle security deposits?
          </p>
          <div className="grid gap-5">
            <PolicyList text="To protect both our hosts and guests, we have a simplified security deposit system. A flat-rate deposit is held for each booking, and the conditions for any deductions are clearly outlined. This process is automated for fairness and efficiency." />
          </div>
          <p className="fw-500 mb-3 lg:mb-4 mt-5">
            What are Fantrip's cancellation policies?
          </p>
          <div>
            <div className="flex gap-x-2">
              <div className="relative top-[5px]">
                <GradientListBox />
              </div>
              <p>
                We offer three types of cancellation policies - Flexible,
                Moderate, and Firm - to cater to different needs. In addition,
                we have special event-specific adjustments to accommodate
                changes in sports event schedules. Details of these policies can
                be found in our{" "}
                <Link
                  to={"/refund-policy"}
                  className="text-prima fw-500 underline"
                >
                  cancellation & refund policysection
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceBooking;
