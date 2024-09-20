import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import Button from "./Button";

const CookieModal = () => {
  const [show, setShow] = useState(true);
  const accept = Cookies.get("fantrip_cookie");

  useEffect(() => {
    Cookies.set("fantrip_cookie", `yes`);
  }, []);
  return (
    <div>
      {!accept && show && (
        <div className="fixed bottom-5 w-[300px] lg:w-[400px] shadow-lg left-3 z-[4000] p-3 lg:p-4 bg-white dark:bg-darkColorLight">
          <div className="flex justify-end">
            <LiaTimesSolid className="text-xl dark:text-white" onClick={() => setShow(false)} />
          </div>
          <div className="hidden md:flex justify-center">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1726758335/fantrip/Group_1171275094_2_1_dxenv9.png"
              alt="cookie-icon"
              className="w-[60px]"
            />
          </div>
          <div className="mt-2 lg:mt-5">
            <p className="text-xl lg:text-2xl fw-600 syne text-center">
              Allow Cookies
            </p>
            <p className="mt-3 text-center">
              This website uses cookies to ensure you get the best experience on
              our website.
            </p>
          </div>
          <div className="mt-3 lg:mt-8">
            <p className="text-center">
              <Link to={"/cookie"} className="text-center text-prima fw-600">
                Cookie Policy
              </Link>
            </p>
            <div className="mt-3">
              <Button title={"Accept"} onClick={() => setShow(false)}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieModal;
