import Cookies from "js-cookie";
import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import Button from "./Button";

const CookieModal = () => {
  const [show, setShow] = useState(true);
  const accept = Cookies.get("fantrip_cookie");

  const handleAccept = () => {
    setShow(false)
    Cookies.set("fantrip_cookie", `yes`);
  }

  return (
    <div>
      {!accept && show && (
        <div className="fixed bottom-1 md:bottom-3 lg:left-2 p-1 md:p-0 w-full z-[4000]">
          <div className="p-2 box lg:px-3 lg:p-3 bg-white dark:bg-darkColorLight shadow-lg rounded-lg ">
            <div className="hidden absolute right-4 top-3">
              <LiaTimesSolid
                className="text-xl cursor-pointer dark:text-white"
                onClick={() => setShow(false)}
              />
            </div>
            <div className="hidden justify-center">
              <img
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1726758335/fantrip/Group_1171275094_2_1_dxenv9.png"
                alt="cookie-icon"
                className="w-[10px]"
              />
            </div>
            <div className="md:flex gap-x-3">
              <div className="w-full">
                <p className="text-lg flex gap-x-4 items-center fw-600 syne">
                  Allow Cookies
                  <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1726758335/fantrip/Group_1171275094_2_1_dxenv9.png"
                    alt="cookie-icon"
                    className="w-[16px] h-[16px]"
                  />
                </p>
                <p className="mt-2 fs-500">
                  This website uses cookies to ensure you get the best
                  experience on our website.
                </p>
              </div>
              <div className="md:w-[200px] flex justify-end items-center gap-x-3">
                <p className="text-center">
                  <Link
                    to={"/cookie"}
                    className="text-center whitespace-nowrap text-prima fw-600"
                  >
                    Cookie Policy
                  </Link>
                </p>
                <div className="">
                  <Button
                    title={"Accept"}
                    onClick={() => handleAccept()}
                    altClassName="btn-int px-5 py-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieModal;
