import FaqList from "@/modules/landing/faqs/faqs-list";

const FaqsPage = () => {
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              Frequently Asked Questions
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="section">
        <div className="box">
          <FaqList />
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;
