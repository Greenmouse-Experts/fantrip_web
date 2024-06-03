import GradientListBox from "@/components/text-format/gradient-list-box";
import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";

const CookiePage = () => {
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              Fantrip Cookie Policy
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="box mt-16 lg:mt-8 grid gap-6 lg:gap-10 mb-16 lg:mb-24">
        <div>
          <PolicyHeader text="Introduction" />
          <div>
            <PolicyList text="Fantrip uses cookies and similar technologies to enhance your experience on our platform. This Cookie Policy explains how we use cookies and how you can manage your preferences. By using Fantrip, you agree to our use of cookies in accordance with this policy." />
          </div>
        </div>
        <div>
          <PolicyHeader text="What Are Cookies?" />
          <div>
            <PolicyList text="Cookies are small text files stored on your device (computer, tablet, smartphone) when you visit our platform. They collect information about your device and your interactions with Fantrip, helping to improve your user experience, understand how our platform is used, and tailor our interactions with you." />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Types of Cookies We Use" />
          <div className="grid gap-4">
            <PolicyList
              head="Strictly Necessary Cookies:"
              text=" These are essential for you to browse Fantrip and use its features. Without these cookies, services like secure login and payment processing cannot be provided."
            />
            <PolicyList
              head="Performance and Analytics Cookies:"
              text=" These cookies collect information about how you use Fantrip, such as which pages you visit and if you experience any errors. This data helps us improve the functionality and performance of our platform."
            />
            <PolicyList
              head="Functionality Cookies:"
              text=" These cookies allow Fantrip to remember choices you make (such as your user name or language) and provide enhanced, more personal features."
            />
            <PolicyList
              head="Targeting or Advertising Cookies:"
              text=" Fantrip may use these cookies to deliver adverts relevant to you. They can also limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns."
            />
          </div>
        </div>
        <div className="">
          <PolicyHeader text="Managing Cookies" />
          <p className="fw-500 mb-3 lg:mb-4">
          Under GDPR, your consent is required for the use of non-strictly necessary cookies. Fantrip provides you with the ability to manage your cookie preferences.
          </p>
          <div className="grid gap-4">
            <PolicyList
              head="Consent Mechanism:"
              text=" When you first visit Fantrip, a consent banner will appear, allowing you to accept or reject the use of certain types of cookies."
            />
            <PolicyList
              head="Browser Settings:"
              text=" You can choose to disable cookies through your web browser settings. However, doing so may limit your use of certain functionalities on our platform."
            />
            <PolicyList
              head="Third-Party Management Tools:"
              text=" You can use third-party tools to manage the acceptance or rejection of cookies."
            />
          </div>
        </div>
        <div>
          <PolicyHeader text="Your Rights" />
          <div>
            <PolicyList text="GDPR grants you rights over your data, including the right to request access to, correct, delete, or restrict the processing of your personal data. You can exercise these rights at any time by contacting us at support@Fantrip.app." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Sharing of Cookie Data" />
          <div>
            <PolicyList text="Fantrip may share data collected by cookies with trusted third parties for the purposes outlined in this policy, such as analytics or advertising partners. These parties are obligated to protect your data and may only use it according to our instructions." />
          </div>
        </div>
        <div>
          <PolicyHeader text="Changes to Our Cookie Policy" />
          <div>
            <PolicyList text="We may update this Cookie Policy to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you about significant changes by posting a notice on our platform or by sending you a notification." />
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
                <span className="fw-500">support@Fantrip.app</span> .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePage;
