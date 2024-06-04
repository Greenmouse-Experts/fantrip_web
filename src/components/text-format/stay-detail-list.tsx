import { FC } from "react";

interface Props {
  name: string;
  value: string;
}
const StayDetailList: FC<Props> = ({ name, value }) => {
  return (
    <div>
      <p className="text-gray-300">{name}:</p>
      <p className="mt-[2px] fw-500 text-[17px]">{value}</p>
    </div>
  );
};

export default StayDetailList;
