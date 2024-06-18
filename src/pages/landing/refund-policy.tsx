import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";

const RefundPolicy = () => {
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
          <PolicyHeader text="Fantrip booking cancellation and refund policies" />
          <p className="fw-500 mb-3 lg:mb-4">
            As sports fans, we understand the uncertainty that can accompany
            travel for sporting events. We have tailored our cancellation
            policies to suit your needs. To ensure we are host-centric and
            guest-centric, this policy acknowledges the high-demand events where
            the likelihood of rebooking at the last minute is lower. Refunds
            offer a balanced approach, providing a safety net for both guests
            and hosts.
          </p>
          <p className="fw-500 mb-3 lg:mb-4">Flexible</p>
          <div className="grid gap-5">
            <PolicyList
              head="Guests' benefit:"
              text=" Full refund if canceled up to 24 hours before check-in."
            />
            <PolicyList
              head="Hosts' benefit:"
              text=" If canceled less than 24 hours before check-in, the host is paid for each night the guest stays, plus an additional night as compensation for the late cancellation."
            />
          </div>
          <p className="fw-500 mb-3 lg:mb-4 mt-5">Moderate</p>
          <div className="grid gap-5">
            <PolicyList
              head="Guests' benefit:"
              text=" Full refund if canceled up to 5 days before check-in."
            />
            <PolicyList
              head="Hosts' benefit:"
              text=" If canceled less than 5 days before check-in, the host is paid for each night the guest stays, plus one additional night and 50% for the remaining unspent nights."
            />
          </div>
          <p className="fw-500 mb-3 lg:mb-4 mt-5">Firm</p>
          <div className="grid gap-5">
            <PolicyList
              head="Guests' benefit:"
              text=" Full refund if canceled at least 30 days before check-in. Additionally, a full refund is available if the booking is canceled within 48 hours of making it, provided the cancellation occurs at least 14 days before check-in."
            />
            <PolicyList
              head="Hosts' benefit:"
              text=" 50% refund for cancellations made between 7 and 30 days before check-in; no refund for cancellations made less than 7 days before check-in."
            />
          </div>
        </div>
        <div>
          <PolicyHeader text="Event-specific adjustments for Fantrip's cancellation policies:" />
          <p className="fw-500 mb-3 lg:mb-4">
            When a major sports event (for which the booking was made) gets
            rescheduled or significantly altered (e.g., change of venue, date,
            or cancellation).
          </p>
          <div>
            <PolicyList text="Guests' benefit: Full refund, regardless of when the change occurs or when the guest cancels the booking after the announcement of the rescheduled event." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
