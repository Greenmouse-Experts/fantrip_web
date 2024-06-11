import GradientListBox from "@/components/text-format/gradient-list-box";
import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";
import { Link } from "react-router-dom";

const ContentList = () => {
  return (
    <div className="section">
      <div className="box">
        <div className="grid gap-8">
          <div>
            <PolicyHeader text="Login issues" />
            <div>
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  How do I reset my password? <br /> <br />
                  Understand how to reset your account password on desktop,
                  mobile web, and apps.
                </p>
              </div>
            </div>
          </div>
          <div>
            <PolicyHeader text="What Are Cookies?" />
            <div>
              <PolicyList text="Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit our platform. They collect information about your device and your interactions with Fantrip, helping to improve your user experience, understand how our platform is used, and tailor our interactions with you." />
            </div>
          </div>
          <div className="">
            <PolicyHeader text="Desktop or mobile web" />
            <p className="fw-500 mb-3 lg:mb-4">
              If you want to reset your password before logging in:
            </p>
            <div className="grid gap-4">
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  <Link
                    to={"/auth/forget"}
                    className="text-prima fw-500 underline"
                  >
                    Click here
                  </Link>{" "}
                  to redirect to reset/forogot password page
                </p>
              </div>
              <PolicyList text="Enter the email used to register your profile" />
              <PolicyList text="An email with your profile's credentials will be sent to the address associated with your account. Once you receive the email, click on Reset Password and you will be redirected to a new login page." />
            </div>
            <p className="fw-500 mt-6 mb-3 lg:mb-4">
              If you want to reset your password after logging in:
            </p>
            <div className="grid gap-4">
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  <Link
                    to={"/user/profile"}
                    className="text-prima fw-500 underline"
                  >
                    Click here
                  </Link>{" "}
                  to redirect to change password page
                </p>
              </div>
              <PolicyList text="Navigate to change password tab" />
              <PolicyList text="Enter your existing password, new password, then confirm new password; and save." />
            </div>
          </div>
          <div>
            <PolicyHeader text="iOS and Android" />
            <div className="grid gap-5">
              <PolicyList text="Tap on the three horizontal pink lines [☰] in the top-left corner;" />
              <PolicyList text="Then on Settings;" />
              <PolicyList text="Then Account Information;" />
              <PolicyList text="Then  Password;" />
              <PolicyList text="Enter your existing password, new password, then confirm new password; and" />
              <PolicyList text="Select Change Password." />
              <PolicyList text="Once you have updated your new password, click LOG IN and enter your username and newly created password." />
            </div>
          </div>
          <div>
            <PolicyHeader text="What do I do if my account is locked?" />
            <div>
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  Understand what causes locked accounts and the steps required
                  to successfully login again. <br /> <br />
                  Note that after consecutively submitting incorrect login
                  information five (5) times, accounts are automatically locked
                  for 15 minutes.
                  <br /> <br />
                  To log in, you need to input your your profile name (nickname)
                  or email address. If locked out, please wait 15 minutes and
                  try again with the correct login details. <br /> <br /> If
                  you’d like to access your account immediately, please reset
                  your password. Passwords must consist of only letters, digits,
                  and symbols (no spaces).
                </p>
              </div>
            </div>
          </div>
          <div>
            <PolicyHeader text="How can I share my Fantrip adventures and feedback?" />
            <div>
              <div className="flex gap-x-2">
                <div className="relative top-[5px]">
                  <GradientListBox />
                </div>
                <p>
                  Your voice is our cheer and your feedback, our winning
                  strategy! We're all ears for your epic tips on how we can up
                  our game. Got a suggestion, a high-five moment, or even a
                  'could-be-better' thought? Don't hold back! <br /> <br />
                  Send us an email to support@Fantrip.app. Spill all the
                  details, suggestions, and game-changing ideas you've got.
                  Together, let's make Fantrip the ultimate fan journey!
                </p>
              </div>
            </div>
          </div>
          <div>
            <PolicyHeader text="Fantrip booking cancellation and refund policies" />
            <p className="fw-500 mb-3 lg:mb-4">
              As sports fans, we understand the uncertainty that can accompany
              travel for sporting events. We have tailored our cancellation
              policies to suit your needs. To ensure we are host-centric and
              guest-centric, this policy acknowledges the high-demand events
              where the likelihood of rebooking at the last minute is lower.
              Refunds offer a balanced approach, providing a safety net for both
              guests and hosts.
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
          <div>
            <PolicyHeader text="Fantrip booking pricing" />
            <p className="fw-500 mb-3 lg:mb-4">
              What is the pricing range for accommodations on Fantrip?
            </p>
            <div className="grid gap-5">
              <PolicyList text=" The pricing range on our platform is strictly set between €25 to €75. This range is intended to make accommodations affordable for sports fans while also ensuring hosts are fairly compensated for their hospitality." />
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
                  changes in sports event schedules. Details of these policies
                  can be found in our{" "}
                  <Link to={""} className="text-prima fw-500 underline">
                    cancellation & refund policysection
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
