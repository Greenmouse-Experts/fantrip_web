import { FC } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

interface Props{
    name: string
}
const BtnContent:FC<Props> = ({name}) => {
  return (
    <div className="flex items-center gap-x-3">
        {name}
        <HiOutlineArrowNarrowRight/>
    </div>
  )
}

export default BtnContent