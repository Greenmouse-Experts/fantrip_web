import React, { FC } from "react";
import { FaStar } from "react-icons/fa6";

interface Props {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  size: number;
}
const RatingComponent: FC<Props> = ({ value, setValue, size }) => {
  const stars = Array(5).fill("");
  return (
    <div className="flex gap-x-4 lg:gap-x-8">
      <div className="flex gap-x-3 items-center">
        {stars.map((_, i) => (
          <FaStar
            key={i}
            size={size}
            className={`cursor-pointer hover:text-orange-500 ${
              value >= i + 1 ? "text-orange-500" : "text-gray-500"
            }`}
            onClick={() => setValue(i + 1)}
          />
        ))}
      </div>
      <div className="flex items-end gap-x-1">
        <p className="fw-600 text-3xl">{value}</p>
        <p className="fw-500 text-xl">/5</p>
      </div>
    </div>
  );
};

export default RatingComponent;
