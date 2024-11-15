import SmallFaqList from "../faqs/small-faq-list";

const FaqSection = () => {
  return (
    <div className="section">
      <div className="box">
        <div className="lg:pt-16">
          <div>
            <div className="flex justify-center">
              <p className="border border-[#9847fe] fs-300 lg:fs-500 px-5 py-2 rounded-[40px] text-gradient fw-500">
                Why just read about sports when you can live the story?
              </p>
            </div>
            <div className="mt-8">
              <p className="text-center text-2xl lg:text-4xl fw-600 syne">
                <span className="text-gradient syne">Fantrip </span>- Welcome to
                the future of fan travel
              </p>
            </div>
            <div className="mt-5 lg:w-7/12 mx-auto text-center">
              <p className="fw-500">
                Designed by sports journalists and techy sports enthusiasts for
                sports fans!  Your front-row ticket to the most immersive fan
                experience. Ready to play?
              </p>
            </div>
          </div>
          <div className="bg-faq rounded-3xl lg:bg-fit p-6 lg:p-16 mt-10 lg:mt-24">
            <div className="lg:flex">
              <div className="lg:w-6/12">
                <SmallFaqList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
