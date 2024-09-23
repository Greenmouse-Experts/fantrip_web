const SpreadWord = () => {
  return (
    <div className="mt-36 md:mt-48 lg:mt-28 lg:flex justify-between bg-layout-gradient p-4 md:px-6 py-12 lg:p-8 lg:pl-12 rounded-[30px]">
      <div className="lg:w-[500px] shrink-0 relative h-16 md:h-28 lg:h-auto">
        <img
          src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1726752452/fantrip/Group_1171275094_1_ouxiej.png"
          alt="slides"
          className="absolute bottom-2 -right-3 md:right-12 lg:right-0 lg:-bottom-12 w-full md:w-[500px] lg:w-[500px]"
        />
      </div>
      <div className="lg:w-full lg:pr-8">
        <div className="text-white">
          <p className="syne fw-600 text-3xl lg:text-4xl 2xl:text-5xl">Want to spread the word about Fantrip ?</p>
          <p className="mt-6 2xl:text-xl">
            For all press and media inquiries, hit us up at {" "}
            <span className="text-green-500">founders@fantrip.app</span>. We love seeing our story told and cant wait to
            hear from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpreadWord;
