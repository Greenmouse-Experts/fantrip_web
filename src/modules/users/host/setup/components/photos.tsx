import BtnContent from "@/components/btn-content"
import { FC } from "react"
import { BsInfoCircle } from "react-icons/bs"
import { FaRegImage } from "react-icons/fa6"

interface Props{
    next: () => void
}
const SetupPhotos:FC<Props> = ({next}) => {
  return (
    <div>
        <p className="text-xl lg:text-4xl lg:w-9/12">Upload Your Profile Picture and 
a Picture of the Room</p>
        <div className="mt-6 flex gap-x-1">
            <BsInfoCircle className="shrink-0 text-sm relative top-[4px]"/>
            <p className="fs-400">Use a profile picture of yourself in your favorite team's jersey or at a stadium.</p>
        </div>
        <div className="mt-4 flex">
            <div className="relative cursor-pointer py-2 border border-[#9847FE] rounded-[14px]">
                <input type="file" className="opacity-0 absolute w-full h-full"/>
                <p className="text-center text-[#9847FE] fw-500 px-5 py-1">Upload photos</p>
            </div>
        </div>
        <div className="mt-8">
            <div className="w-44 lg:w-96 h-44 place-center rounded-[14px] border border-[#D2D2D2] border-dashed">
                <div className="text-center">
                    <FaRegImage className="text-[#D2D2D2] text-xl mx-auto mb-1"/>
                    <p className="text-[#9847FE] fs-400">Upload more photos</p>
                    <p className="fs-500">or drag and drop them here</p>
                </div>
            </div>
        </div>
        <div className="mt-8 flex justify-end">
            <div className="btn-primary cursor-pointer px-6 py-2" onClick={next}>
                <BtnContent name="Upload & continue"/>
            </div>
        </div>
    </div>
  )
}

export default SetupPhotos