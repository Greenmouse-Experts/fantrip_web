import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";

const AppAdvert = () => {
  
  return (
    <div className="section">
      <div className="box">
        <div className="lg:flex items-center justify-between">
          <div className="lg:w-5/12">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1722639536/fantrip/Group_1171275140_3_zrbv4i.png"
              alt="fandom"
              className="w-full lg:w-11/12"
            />
          </div>
          <div className="lg:w-7/12 lg:mt-0 mt-12">
            <div className="flex">
              <p className="border border-[#9847FE] rounded-[50px] px-7 py-2 fs-400">
                We cater to every aspect of your sports passion
              </p>
            </div>
            <p className="text-xl lg:text-4xl fw-600 syne mt-5 lg:mt-9">
              Forget sifting through generic travel guides
            </p>
            <p className="monts italic fs-500 lg:text-[17px] fw-500 mt-5 lg:mt-9">
              Discover hidden gems, sports bars, pubs, and even those elusive
              parking spots, all recommended by fans like you!!
            </p>
            <p className="monts italic fs-500 lg:text-[17px] fw-500 mt-4">
              Our sports-centric Area Guide is your playbook for the best
              fan-approved spots. From pre-game bites to victory celebration
              spots, get the inside scoop powered by real fans. Contribute your
              winning recommendations, too!
            </p>
            <div className="lg:flex items-center gap-x-6 mt-6 lg:mt-12">
              <Link
                to={"/area-guide"}
                className="btn-primary block px-4 md:px-8 py-4"
              >
                <BtnContent name="Explore matchday area guide" />
              </Link>
              <div className="flex justify-center lg:justify-normal mt-12 lg:mt-0 gap-x-6">
                <Link to={""}>
                  <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711986112/fantrip/Frame_23_yu0vbi.png"
                    alt="google"
                    className="lg:w-full  h-[55px] object-fit"
                  />
                </Link>
                <Link to={""}>
                  <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711986113/fantrip/Frame_24_ii4i87.png"
                    alt="apple"
                    className="lg:w-full object-fit h-[55px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppAdvert;
