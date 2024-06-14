import { BsCheck2Circle } from "react-icons/bs";

const VerifyDetails = () => {
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
                        <BsCheck2Circle className="lg:text-lg"/>
                        <p className="lg:fw-500">Government ID</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <BsCheck2Circle className="lg:text-lg"/>
                        <p className="lg:fw-500">Residence & Location</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <BsCheck2Circle className="lg:text-lg"/>
                        <p className="lg:fw-500">Phone Number</p>
                    </li>
                    <li className="flex items-center gap-x-2">
                        <BsCheck2Circle className="lg:text-lg"/>
                        <p className="lg:fw-500">Email Address</p>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyDetails;
