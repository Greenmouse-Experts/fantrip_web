import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";

const FandomHome = () => {
  return (
    <div className="section bg-layout-gradient">
      <div className="box">
        <div className="lg:flex items-center justify-between flex-row-reverse">
          <div className="lg:w-5/12 flex justify-end">
            <img
              src="https://res.cloudinary.com/do2kojulq/image/upload/v1730999120/FTCRT_ce0rnm.png"
              alt="fandom"
              className="lg:w-9/12"
            />
          </div>
          <div className="text-white lg:w-6/12 mt-8 lg:mt-0">
            <p className="text-3xl lg:text-5xl fw-600 syne">
              Where <span className="text-gradient syne">fandom</span> finds a
              home
            </p>
            <p className="mt-4 lg:mt-8 monts lg:text-xl fw-500">
              More than a bed for the night. It&apos;s about sharing the
              passion, the cheers, and maybe even the tears. Welcome to where
              the real fans stay!
            </p>
            <div className="flex lg:mt-12 mt-6">
              <Link
                to={"/user/host-setup"}
                className="btn-primary block px-8 py-4"
              >
                <BtnContent name="Become a fan host" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FandomHome;
