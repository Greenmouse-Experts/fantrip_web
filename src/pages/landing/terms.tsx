import GradientListBox from "@/components/text-format/gradient-list-box";
import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";

const TermsPage = () => {
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              Fantrip Terms of Service
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="box mt-16 lg:mt-8 grid gap-6 lg:gap-10 mb-16 lg:mb-24">
        <div>
          <PolicyHeader text="Acceptance of Terms:" />
          <div>
            <PolicyList text="Welcome to fantrip. By accessing and utilizing the fantrip platform, you acknowledge and agree to be bound by these Terms of Service ('Terms'), along with all applicable laws and regulations. It is your responsibility to ensure compliance with any local laws that might apply to your use of fantrip. These Terms govern your use of our platform and services, forming a binding legal agreement between you and fantrip." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Definitions:" />
          <div>
            <PolicyList text="User/You/Your: Refers to you, the person accessing or using the fantrip platform, whether as a guest looking for accommodation, a host offering accommodation, or a participant in our community features. Fantrip/We/Us/Our: Refers to the fantrip platform, including all its features, services, and content provided to you." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Communications:" />
          <div>
            <PolicyList text="By creating an account and using the fantrip platform, you consent to receive electronic communications from us, including emails, push notifications, and messages within our platform. These communications may pertain to your account, our services, promotions, updates, and more. You agree that any notices, agreements, disclosures, or other communications that we send to you electronically satisfy any legal communication requirements, including that such communications be in writing." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Use of the Platform:" />
          <div className="grid gap-4">
            <PolicyList
              head="Compliance:"
              text=" You agree to use the platform only for lawful purposes and in a way that complies with all applicable local, national, and international laws and regulations."
            />
            <PolicyList
              head="Account Security:"
              text=" You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account."
            />
            <PolicyList
              head="Prohibited Uses:"
              text=" You agree not to use the platform in any way that could damage, disable, overburden, or impair it or interfere with any other party's use and enjoyment of the platform."
            />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="User Conduct:" />
          <div className="grid gap-4">
            <PolicyList
              head="Respectful Interaction:"
              text=" You commit to interacting with other users respectfully and to not engage in harassment, use offensive language, or intimidate others."
            />
            <PolicyList
              head="Content Responsibility:"
              text=" You are responsible for the content you share on the platform and agree to ensure that it does not infringe upon the rights of others or contribute to unlawful activity."
            />
            <PolicyList
              head="Monitoring and Recording:"
              text=" To maintain the safety and integrity of our platform, we reserve the right to monitor and, if necessary, record interactions on the platform. This will be carried out with the utmost respect for privacy and confidentiality and will only be done to ensure compliance with our community guidelines and to address safety concerns."
            />
          </div>
        </div>
        <div>
          <PolicyHeader text="Community Guidelines and Safety:" />
          <div>
            <PolicyList text="Fantrip is committed to creating a safe and welcoming environment for all users. Our community guidelines are designed to support this commitment, and we expect all users to adhere to these principles. Violation of these guidelines may result in suspension or termination of your account and access to the platform." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Changes to the Terms:" />
          <div>
            <PolicyList text="Fantrip reserves the right, at our discretion, to modify or replace these Terms at any time. By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised Terms. We will provide notice of significant changes to the Terms by posting on the platform or by other appropriate means." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Termination::" />
          <div>
            <PolicyList text="Fantrip may terminate or suspend your access to the platform immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these Terms." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Host Participation and User Support:" />
          <p className="fw-500 mb-3 lg:mb-4">
            Fantrip is dedicated to creating a safe and reliable environment for
            all users and hosts on our platform. While we facilitate connections
            between sports fans and accommodations, it's essential to clarify
            the roles and responsibilities within these interactions:
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Independent Hosts:"
              text=" Individuals acting as hosts on fantrip operate in an independent capacity and are not considered employees or agents of fantrip. We value their contributions to our community but do not control their actions, advice, or interactions within the platform."
            />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="User Safety and Support:" />
          <p className="fw-500 mb-3 lg:mb-4">
            Fantrip prioritizes the safety and satisfaction of our users. In
            instances of insecurity at a host's location, deceptive listings, or
            any other concerns, Fantrip commits to providing support and
            mediation to resolve issues swiftly and fairly. This includes:
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Verification Processes:"
              text=" Implementing robust verification processes for hosts and listings to prevent fraudulent activity."
            />
            <PolicyList
              head="24/7 Support:"
              text=" Offering around-the-clock support for users facing issues or concerns with accommodations."
            />
            <PolicyList
              head="Incident Response:"
              text=" Establishing a clear procedure for reporting and addressing incidents, including the possibility of refunds, rebooking assistance, and direct support for affected users."
            />
            <PolicyList
              head="Liability and Responsibility:"
              text=" While fantrip facilitates bookings and provides a platform for community interaction, the responsibility for the condition of accommodations and the conduct during stays lies primarily with hosts and users. Fantrip will not be held liable for direct issues arising from individual accommodations or interactions but will serve as a mediator to resolve disputes and support affected parties."
            />
          </div>
        </div>
        <div>
          <PolicyHeader text="Community Guidelines and Monitoring:" />
          <div>
            <PolicyList text="To maintain the integrity and safety of our platform, interactions within community chats and between users and hosts may be monitored. This monitoring aims to ensure compliance with our community guidelines and address safety concerns, with all interactions treated with confidentiality." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Feedback and Improvement:" />
          <div>
            <PolicyList text="Encouraging feedback from users and hosts to continuously improve safety measures, support services, and overall user experience on the fantrip platform." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Governing Law and Jurisdiction" />
          <p className="fw-500 mb-3 lg:mb-4">
            Fantrip operates globally, with its headquarters in Canada and
            initial operations in Europe. As such, our Terms of Service, Privacy
            Policy, and Data Policy are designed to comply with the General Data
            Protection Regulation (GDPR) for European users and adhere to
            Canadian laws for operations outside of Europe. This dual compliance
            ensures that fantrip respects and protects the rights of all users,
            regardless of their location.
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Jurisdiction:"
              text=" These Terms shall be governed by and construed in accordance with the laws of Canada and the regulations of the GDPR, without regard to conflict of law principles. For disputes arising under GDPR compliance, users have the right to lodge a complaint with a supervisory authority in the European Union"
            />
            <PolicyList
              head="Global Compliance:"
              text=" Fantrip commits to adhering to the legal requirements of each country it operates in, ensuring a consistent and secure experience for users worldwide. Our policies may be adjusted to reflect the legal standards and practices of specific regions, always prioritizing user privacy and security."
            />
            <PolicyList
              head="Dispute Resolution:"
              text=" Fantrip encourages the resolution of disputes through our support and mediation processes. However, if legal action becomes necessary, disputes will be resolved under the jurisdiction of the appropriate Canadian courts or through the relevant European dispute resolution mechanisms for GDPR-related issues."
            />
          </div>
          <p className="fw-500 my-6">
            By using fantrip, you signify your acceptance of these Terms. Users
            and hosts agree to these governing laws and jurisdictions,
            acknowledging that legal proceedings, if any, will be conducted in
            English and within the designated jurisdictions, depending on the
            nature of the dispute and the involved parties' locations. These
            Terms serve as the foundation for a fair and safe use of the fantrip
            platform for everyone.
          </p>
        </div>
        <div>
          <PolicyHeader text="Contact Us" />
          <div>
            <div className="flex gap-x-2">
              <div className="relative top-[5px]">
                <GradientListBox />
              </div>
              <p>
                For questions, concerns, or feedback regarding our Privacy
                Policy, user support, or liability terms, please contact us at{" "}
                <span className="fw-500">support@fantrip.app</span> .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
