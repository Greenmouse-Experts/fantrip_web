import { FC } from "react";
import { FiDownload } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

interface Props{
    name: string
    type?: string
}
const BtnContent:FC<Props> = ({name, type}) => {
  return (
    <div className="flex items-center gap-x-3">
        {name}
        {type === 'download' ? <FiDownload/> : <HiOutlineArrowNarrowRight/>}
    </div>
  )
}

export default BtnContent