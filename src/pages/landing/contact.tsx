import ContactIndex from "@/modules/landing/contact";

const ContactPage = () => {
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              Contact us
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="section">
        <div className="box">
          <ContactIndex />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
