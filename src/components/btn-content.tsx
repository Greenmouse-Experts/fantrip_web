import { FC } from "react";
import { FiDownload } from "react-icons/fi";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from "react-icons/hi";

interface Props{
    name: string
    type?: string
    reverse?: boolean
}
const BtnContent:FC<Props> = ({name, type, reverse}) => {
  return (
    <div className={`flex items-center gap-x-3 ${reverse && 'flex-row-reverse'}`}>
        {name}
        {type === 'download' ? <FiDownload/> : reverse? <HiOutlineArrowNarrowLeft/> : <HiOutlineArrowNarrowRight/>}
    </div>
  )
}

export default BtnContent