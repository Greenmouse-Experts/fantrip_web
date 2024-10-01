const SpreadWord = () => {
  return (
    <div className="lg:mt-28 lg:flex items-center gap-x-12 justify-between bg-layout-gradient p-4 md:px-6 py-12 lg:p-8 lg:pl-12 rounded-[30px]">
      <div className="lg:w-[500px] shrink-0 relative lg:h-auto">
        <img
          src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1727794871/fantrip/IMG-20241001-WA0000_mdjsm6.jpg"
          alt="slides"
          className=" rounded-[30px] w-full mx-auto md:w-[500px] lg:w-[500px]"
        />
      </div>
      <div className="lg:w-full lg:pr-8 mt-4 lg:mt-0">
        <div className="text-white">
          <p className="syne fw-600 text-3xl lg:text-4xl 2xl:text-5xl">
            Want to spread the word about Fantrip ?
          </p>
          <p className="mt-6 2xl:text-xl">
            For all press and media inquiries, hit us up at{" "}
            <span
              onClick={(e) => {
                window.location.href = "mailto:support@fantrip.app";
                e.preventDefault();
              }}
              className="text-green-500 text-lg fw-500 cursor-pointer"
            >
              founders@fantrip.app
            </span>
            . We love seeing our story told and cant wait to hear from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpreadWord;
