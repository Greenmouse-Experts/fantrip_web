import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";

const AppAdvert = () => {
  return (
    <div className="section">
      <div className="box">
        <div className="lg:flex items-center justify-between">
          <div className="lg:w-5/12">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711984698/fantrip/Group_1171275052_nbprsf.png"
              alt="fandom"
              className="w-full"
            />
          </div>
          <div className="lg:w-7/12">
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
            <div className="flex items-center gap-x-6 lg:mt-12 mt-6 lg:mt-12">
              <Link to={""} className="btn-primary block px-8 py-4">
                <BtnContent name="Explore matchday area guide" />
              </Link>
              <Link to={""}>
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711986112/fantrip/Frame_23_yu0vbi.png"
                  alt="google"
                  className="w-full h-[55px] object-fit"
                />
              </Link>
              <Link to={""}>
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1711986113/fantrip/Frame_24_ii4i87.png"
                  alt="apple"
                  className="w-full object-fit h-[55px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppAdvert;
