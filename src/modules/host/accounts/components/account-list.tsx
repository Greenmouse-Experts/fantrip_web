import PyramidSpin from "@/components/loaders/pyramid-spin";
import PolicyHeader from "@/components/text-format/policy-header";
import PolicyList from "@/components/text-format/policy-list";
import { viewProfile } from "@/services/api/authApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const AccountList = () => {
  const { isLoading, data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => viewProfile(),
  });

  const [
    { frontView, backView, adBackView, adFrontView, bankInfo, ssn, ip },
    setView,
  ] = useState({
    frontView: false,
    backView: false,
    adFrontView: false,
    adBackView: false,
    bankInfo: false,
    ssn: false,
    ip: false,
  });

  const handleToggle = (name: string, value: boolean) => {
    setView((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      return newState;
    });
  };

  const hideHash = (
    <p className="relative top-1 fw-600 text-gray-500">*********</p>
  );

  return (
    <div>
      {isLoading && (
        <div className="py-12 lg:py-24 place-center">
          <PyramidSpin size={1.8} />
        </div>
      )}
      {profile && (
        <div>
          <div className="border rounded-lg border-gray-500 p-4">
            <div>
              <PolicyHeader text="Identity Card" />
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Front View" />
                <div className="flex gap-x-3 items-center">
                  {frontView ? (
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      https://front-view.png
                    </a>
                  ) : (
                    hideHash
                  )}
                  {frontView ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("frontView", false)}
                    />
                  ) : (
                    <IoEyeOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("frontView", true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Back View" />
                <div className="flex gap-x-3 items-center">
                  {backView ? (
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      https://front-view.png
                    </a>
                  ) : (
                    hideHash
                  )}
                  {backView ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("backView", false)}
                    />
                  ) : (
                    <IoEyeOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("backView", true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg border-gray-500 p-4 mt-4">
            <div>
              <PolicyHeader text="Address Document" />
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Front View" />
                <div className="flex gap-x-3 items-center">
                  {adFrontView ? (
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      https://front-view.png
                    </a>
                  ) : (
                    hideHash
                  )}
                  {frontView ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("frontView", false)}
                    />
                  ) : (
                    <IoEyeOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("frontView", true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Back View" />
                <div className="flex gap-x-3 items-center">
                  {adBackView ? (
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                      https://front-view.png
                    </a>
                  ) : (
                    hideHash
                  )}
                  {backView ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("backView", false)}
                    />
                  ) : (
                    <IoEyeOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("backView", true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg border-gray-500 p-4 mt-4">
            <div>
              <div className="flex gap-x-3 items-top">
                <PolicyHeader text="Bank Details" />
                <div className="mt-2">
                  {bankInfo ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("bankInfo", false)}
                    />
                  ) : (
                    <IoEyeOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("bankInfo", true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Account Number:" />
                <div className="flex gap-x-3 items-center">
                  {bankInfo ? <p>4049493333UI</p> : hideHash}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Account Name:" />
                <div className="flex gap-x-3 items-center">
                  {bankInfo ? <p>Wesley Aspir Snipes</p> : hideHash}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Country:" />
                <div className="flex gap-x-3 items-center">
                  {bankInfo ? <p>Canada</p> : hideHash}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Currency:" />
                <div className="flex gap-x-3 items-center">
                  {bankInfo ? <p>USD</p> : hideHash}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Bank Name:" />
                <div className="flex gap-x-3 items-center">
                  {bankInfo ? <p>STRIPE TEST ACCOUNT</p> : hideHash}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Account Holder Type:" />
                <div className="flex gap-x-3 items-center">
                  {bankInfo ? <p>Individual</p> : hideHash}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Routing Number" />
                <div className="flex gap-x-3 items-center">
                  {bankInfo ? <p>Canada</p> : hideHash}
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg border-gray-500 p-4 mt-4">
            <div>
              <PolicyHeader text="Other Informations" />
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Required Digits:" />
                <div className="flex gap-x-3 items-center">
                  {ssn ? <p>4567</p> : hideHash}
                  {ssn ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("ssn", false)}
                    />
                  ) : (
                    <IoEyeOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("ssn", true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-x-3 items-center">
                <PolicyList text="Device IP:" />
                <div className="flex gap-x-3 items-center">
                  {ip ? <p>43:127:56:45</p> : hideHash}
                  {ip ? (
                    <IoEyeOffOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("ip", false)}
                    />
                  ) : (
                    <IoEyeOutline
                      className="cursor-pointer"
                      onClick={() => handleToggle("ip", true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountList;
