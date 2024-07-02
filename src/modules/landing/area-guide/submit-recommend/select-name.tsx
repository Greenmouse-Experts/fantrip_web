import React, { FC } from "react";
import { NAME_CHOICE } from ".";
import { IoCheckmarkCircle } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import Button from "@/components/Button";

interface Props {
  nameChoice: NAME_CHOICE;
  nameOptions: { name: string; value: NAME_CHOICE }[];
  setNameChoice: React.Dispatch<React.SetStateAction<NAME_CHOICE>>;
  next: () => void;
}
const SelectNaming: FC<Props> = ({
  nameChoice,
  nameOptions,
  setNameChoice,
  next,
}) => {
  return (
    <div className="text-center">
      <p className="syne fw-600 text-lg lg:text-2xl">Choose how to display your name</p>
      <p className="fs-500 lg:fs-600 fw-500 my-5 text-[#505050] w-10/12 mx-auto">
        Would you like to contribute under your real name or a nickname? Using
        your real name can lend more credibility to your contributions, but it's
        entirely your choice!
      </p>
      <div className=" my-5 lg:my-12 grid lg:grid-cols-2 gap-4 lg:w-10/12 mx-auto">
        {nameOptions.map((item) => (
          <div
            className={`cursor-pointer rounded-[16px] px-3 py-2 lg:px-5 lg:py-4 flex items-center gap-x-2 ${
              nameChoice === item.value ? "bg-[#9847FE]" : "bg-[#F3E8FF]"
            }`}
            onClick={() => setNameChoice(item.value)}
          >
            {nameChoice === item.value ? (
              <div>
                <IoCheckmarkCircle className="text-white text-xl" />
              </div>
            ) : (
              <div>
                <FaRegCircle />
              </div>
            )}
            <p
              className={`fw-500 ${
                nameChoice === item.value ? "text-white" : ""
              }`}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div>
        <Button title={"Confirm and Continue"} onClick={next} />
      </div>
    </div>
  );
};

export default SelectNaming;
