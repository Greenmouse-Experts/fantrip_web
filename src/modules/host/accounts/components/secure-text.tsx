import { FaCircleInfo } from "react-icons/fa6";

const SecureText = () => {
  return (
    <div className="flex gap-x-2 p-4 border border-gray-500 rounded-lg">
      <FaCircleInfo className="text-xl shrink-0 text-[#fc819f] relative top-1" />
      <p>
        At Fantrip, we take your security and privacy seriously. Rest assured
        that your bank information is protected using industry-standard
        encryption and security protocols. We employ advanced technologies to
        safeguard your financial data from unauthorized access or misuse.
      </p>
    </div>
  );
};

export default SecureText;
