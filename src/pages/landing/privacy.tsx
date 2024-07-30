import GradientListBox from "@/components/text-format/gradient-list-box";
import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";

const PrivacyPage = () => {
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              Fantrip Privacy Policy
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="box mt-16 lg:mt-8 grid gap-6 lg:gap-10 mb-16 lg:mb-24">
        <div>
          <PolicyHeader text="Introduction" />
          <div>
            <PolicyList text="Fantrip respects your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, secure, and disclose your information when you interact with our platform. Our goal is to enhance your experience while ensuring your data is handled with the utmost care and respect, in full compliance with applicable privacy laws." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Data We Collect" />
          <p className="fw-500 mb-3 lg:mb-4">
            Fantrip is designed to enrich your sports fan experience, requiring
            us to collect certain types of information:
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Personal Identifiers and Contact Details:"
              text=" This includes but is not limited to your name, mailing address, email address, and phone number, enabling us to personalize your experience and communicate effectively."
            />
            <PolicyList
              head="Technical and Usage Data:"
              text=" We gather information on how you access and utilize our platform, such as your IP address, browser types, and login data, to improve platform functionality and user experience."
            />
            <PolicyList
              head="Financial and Transactional Information:"
              text=" For seamless booking and payment processing, we collect financial details through secure third-party services like PayPal or Stripe, alongside maintaining records of your transactions and accessed services."
            />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Use of Your Information" />
          <p className="fw-500 mb-3 lg:mb-4">
            The information we collect serves multiple purposes
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Service provision:"
              text=" Ensuring the effective management of your bookings, processing payments, and providing dedicated customer support."
            />
            <PolicyList
              head="Service Improvement:"
              text=" Continuously personalizing and enhancing your fantrip experience based on your feedback and interactions."
            />
            <PolicyList
              head="Analysis and Communication:"
              text=" Analyzing usage patterns to refine our platform's functionality and engaging with you for updates, marketing, and promotional purposes, subject to your communication preferences."
            />
          </div>
        </div>
        <div>
          <PolicyHeader text="Data Security" />
          <div>
            <PolicyList text="To protect your personal data against unauthorized access, alteration, disclosure, or destruction, fantrip employs stringent technical and organizational measures. We are unwavering in our commitment to the security and confidentiality of your information." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Your Data Protection Rights" />
          <p className="fw-500 mb-3 lg:mb-4">
            In alignment with data protection laws, you are entitled to several
            rights regarding your personal data:
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Access and Correction:"
              text=" You have the right to access your personal data and request correction of any inaccuracies."
            />
            <PolicyList
              head="Erasure:"
              text=" Under specific circumstances, you can request the deletion of your personal data."
            />
            <PolicyList
              head="Restriction and Withdrawal of Consent:"
              text=" You may restrict the processing of your data and withdraw your consent at any time without impacting the processing based on consent before its withdrawal."
            />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Disclosure of Your Information" />
          <p className="fw-500 mb-3 lg:mb-4">
            Fantrip may disclose your data under specific conditions:
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Legal Obligations:"
              text=" To comply with legal requirements or protect the rights and safety of our users and the platform, data may be shared."
            />
            <PolicyList
              head="Third-Party Service Providers:"
              text=" We partner with third parties for essential operations (e.g., payment processing, data analysis, email delivery), who are authorized to use your data solely for the tasks we've engaged them for, under strict confidentiality."
            />
          </div>
        </div>
        <div>
          <PolicyHeader text="Indemnification and Liability" />
          <div>
            <PolicyList text="While fantrip facilitates connections between sports fans for accommodation bookings, we strive to maintain a safe and trustworthy platform. Users are encouraged to exercise judgment and care in their interactions. By using fantrip, you agree to indemnify and hold harmless fantrip and its affiliates from any claims, damages, losses, liabilities, and expenses directly arising from violations of our Terms of Service or unlawful use of the platform. However, this does not waive fantrip's responsibility to provide a secure and reliable platform, nor does it absolve us of all liability for our actions. We are committed to supporting our users within the scope of our platform's services and features." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="User Support and Platform Liability" />
          <p className="fw-500 mb-3 lg:mb-4">
            Fantrip is dedicated to supporting our users, both guests and hosts,
            through a fan-to-fan accommodation booking service. Our commitment
            is to ensure that every booking made through our platform is secure,
            respectful, and in line with our community standards. While we
            encourage a shared spirit of sports fandom, we recognize the
            importance of safety, reliability, and trust in these interactions.
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Verification and Safety:"
              text=" We implement verification processes for hosts to ensure the authenticity of listings. Our platform provides guidelines and support for a safe and enjoyable stay, but it's crucial for both hosts and guests to exercise responsibility and due diligence."
            />
            <PolicyList
              head="User Support:"
              text=" In the event of disputes, security concerns, or issues with accommodations, fantrip will offer support to mediate and resolve such issues to the best of our ability. This includes assistance in communication between hosts and guests, providing information on rights and responsibilities, and, where applicable, facilitating refunds or rebookings in accordance with our policies."
            />
            <PolicyList
              head="Limited Liability:"
              text=" Fantrip acts as an intermediary platform to connect sports fans for accommodation purposes. While we are committed to user satisfaction and safety, our liability is limited to the services provided directly through the fantrip platform. We cannot be held liable for direct, incidental, or consequential damages arising from the use of booked accommodations. However, we pledge to work diligently to address and mitigate any issues arising from your interactions on our platform, demonstrating our commitment to your positive experience."
            />
            <PolicyList
              head="Continuous Improvement:"
              text=" Fantrip is dedicated to continuously improving our platform, policies, and practices based on user feedback and experiences. We encourage our community to share their insights to help us enhance safety, usability, and overall satisfaction."
            />
          </div>
        </div>
        <div>
          <PolicyHeader text="Governing Law" />
          <div>
            <PolicyList text="This Privacy Policy and your use of fantrip are governed by Canadian law, in addition to respecting the GDPR and the laws of the countries we operate in. We are committed to complying with local regulations and ensuring that our platform meets international standards of privacy, safety, and reliability." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Changes to This Privacy Policy:" />
          <div>
            <PolicyList text="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes." />
          </div>
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
                <span className="fw-500">support@fantrip.app</span> . <br />
                <br /> By engaging with fantrip, you acknowledge and consent to
                the practices outlined in this Privacy Policy, trusting us to
                manage your data with the highest standards of privacy and
                security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
