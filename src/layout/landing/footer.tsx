import logo from "@/assets/footer_logo.svg";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { GiWhistle } from "react-icons/gi";
import { SlSocialInstagram } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const LandingFooter = () => {
  const navigate = useNavigate();
  const socials = [
    <SlSocialInstagram />,
    <FaLinkedinIn />,
    <FaFacebookF />,
    <FaXTwitter />,
  ];
  const routes = [
    {
      name: "Privacy Policy",
      route: "/privacy",
    },
    {
      name: "Terms & Conditions",
      route: "/terms",
    },
    {
      name: "Data Policy",
      route: "/",
    },
    {
      name: "Cookie Policy",
      route: "/cookie",
    },
    {
      name: "FAQs",
      route: "/",
    },
    {
      name: "Community Guildlines",
      route: "/",
    },
  ];
  return (
    <div className="">
      <div className="footer-gradient">
        <div className="py-12 lg:pt-24 border-b">
          <div className="box">
            <div>
              <img src={logo} alt="logo" className="mx-auto" />
            </div>
            <div className="mt-6 lg:mt-9">
              <ul className="flex justify-center gap-x-6">
                {socials.map((item, i) => (
                  <div
                    className="w-9 h-9 text-white place-center border border-white cursor-pointer circle"
                    key={i}
                  >
                    {item}
                  </div>
                ))}
              </ul>
            </div>
            <div className="mt-12 lg:mt-9">
              <ul className="flex flex-col lg:flex-row justify-center gap-y-6 gap-x-6 lg:gap-x-12">
                {routes.map((item, i) => (
                  <div className=" text-white " key={i}>
                    <p
                      className="text-center cursor-pointer"
                      onClick={() => navigate(`${item.route}`)}
                    >
                      {item.name}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="py-12">
          <p className="text-center text-white fs-400">
            © 2024 Fantrip. All rights reserved.{" "}
            <span className="block lg:inline">
              {" "}
              | Whistle Blower{" "}
              <GiWhistle className="text-white inline text-xl" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
