import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { BASE_URL } from "../../services/constant";
import { useToast } from "@chakra-ui/react";
import logo from "@/assets/images/auth-logo.png";

const VerifyUser = () => {
  const myParam = new URLSearchParams(location.search).get("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();
  useEffect(() => {
    VerifyUser();
  }, []);
  const VerifyUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/verify-email`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myParam}`,
        },
      });

      const result = await response.json();
      if (result.statusCode === 200) {
        toast({
          render: () => (
            <div className="text-white bg-gradient rounded p-3">
              Email verified successfully
            </div>
          ),
          position: "top",
        });
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error: any) {
      setIsLoading(false);
      setIsError(true);
      toast({
        title: error.response.data.message,
        isClosable: true,
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <>
      <div className="main_login">
        <div className="bg-layout-gradient h-screen w-full mont">
          <div className="w-full h-full bg-login">
            <div className="box h-full flex items-center justify-center">
              <div className="lg:w-[550px] mx-auto bg-white lg:px-16 p-6">
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-[250px] mx-auto my-6"
                    width={400}
                    height={80}
                  />
                </Link>
                <div className="my-8 lg:mt-16 mb-5 mx-auto">
                  {isLoading && (
                    <div className="w-full h-36 place-center">
                      <BeatLoader size={34} color="black" />
                    </div>
                  )}
                  {isSuccess && (
                    <div>
                      <img
                        src={
                          "https://res.cloudinary.com/greenmouse-tech/image/upload/v1705925994/rsh/check-mark_vhbeuv.png"
                        }
                        alt="check"
                        className="w-6/12 mx-auto"
                      />
                      <p className="text-center text-black fw-600 text-lg lg:text-xl">
                        Accout confirmation Successful
                      </p>
                      <p className="mt-4 fw-600 text-gray-500 text-center italics fs-300">
                        Redirecting to login...
                      </p>
                    </div>
                  )}
                  {isError && (
                    <div>
                      <img
                        src={
                          "https://res.cloudinary.com/greenmouse-tech/image/upload/v1705929170/rsh/failed_zbvdtm.gif"
                        }
                        alt="check"
                        className="w-4/12 mx-auto"
                      />
                      <p className="text-center text-black mt-5 fw-600 text-lg lg:text-xl">
                        Accout confirmation Failed
                      </p>
                      <p className="mt-4 fw-600 text-gray-500 text-center italics fs-300">
                        Please make sure you click on the correct link on the
                        verication mail.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyUser;
