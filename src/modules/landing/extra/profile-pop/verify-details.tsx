import { FC } from "react";
import { BsCheck2Circle } from "react-icons/bs";

interface Props {
  verifiedId: boolean;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
}
const VerifyDetails:FC<Props> = ({verifiedId, verifiedEmail, verifiedPhone}) => {
  return (
    <div>
      <div>
        <div>
          <p className="text-lg fw-600">Chris&apos; confirmed informations</p>
        </div>
        <div className="mt-4">
          <div>
            <ul className="grid gap-2">
              <li className="flex items-center gap-x-2">
                <BsCheck2Circle
                  className={`lg:text-lg ${
                    verifiedId ? "text-green-600" : "opacity-60"
                  }`}
                />
                <p className="lg:fw-500">Government ID</p>
              </li>
              <li className="flex items-center gap-x-2">
                <BsCheck2Circle
                  className={`lg:text-lg ${
                    verifiedId ? "text-green-600" : "opacity-60"
                  }`}
                />
                <p className="lg:fw-500">Residence & Location</p>
              </li>
              <li className="flex items-center gap-x-2">
                <BsCheck2Circle
                  className={`lg:text-lg ${
                    verifiedPhone ? "text-green-600" : "opacity-60"
                  }`}
                />
                <p
                  className={`lg:fw-600 ${
                    verifiedEmail ? "text-green-600" : ""
                  }`}
                >
                  Phone Number
                </p>
              </li>
              <li className="flex items-center gap-x-2">
                <BsCheck2Circle
                  className={`lg:text-lg ${
                    verifiedEmail ? "text-green-600" : "opacity-60"
                  }`}
                />
                <p
                  className={`lg:fw-600 ${
                    verifiedEmail ? "text-green-600" : ""
                  }`}
                >
                  Email Address
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyDetails;
