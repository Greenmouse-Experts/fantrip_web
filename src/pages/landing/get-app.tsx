import google from "@/assets/svg/google.svg";
import apple from "@/assets/svg/apple.svg";
import { Link } from "react-router-dom";

const GetAppPage = () => {
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
            <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
              Download the App
            </p>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="section">
        <div className="box">
          <div className="lg:flex">
            <div className="lg:w-6/12">
              <img
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1718032473/fantrip/Group_1171275109_1_qtdup5.png"
                alt="mobile-app"
                className="w-10/12 lg:w-8/12 mx-auto"
              />
            </div>
            <div className="lg:w-6/12 mt-8 lg:mt-0">
              <div>
                <p className="syne text-2xl lg:text-4xl fw-600">
                  Download the <span className="text-gradient">fantrip</span>{" "}
                  Mobile App
                </p>
                <p className="mt-8">
                  Stay connected to your favorite teams and never miss a game
                  with the Fantrip Mobile App. Get real-time updates, exclusive
                  content, and seamless home booking all in one place.
                </p>
                <p className="mt-6">
                  Download now and join the ultimate fan experience!
                </p>
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-12 mt-12">
                <img
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1718032472/fantrip/Rectangle_h5tk7n.png"
                  alt="qr-code"
                  className="w-[140px]"
                />
                <Link to={""}>
                  <img src={google} alt="google_link" className="w-[150px]" />
                </Link>
                <Link to={""}>
                  <img src={apple} alt="apple_link" className="w-[150px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAppPage;
