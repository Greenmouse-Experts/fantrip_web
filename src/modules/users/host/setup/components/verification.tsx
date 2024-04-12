import BtnContent from '@/components/btn-content'
import { BsInfoCircle } from 'react-icons/bs'
import { FaRegImage } from 'react-icons/fa6'

const SetupVerification = () => {
    return (
        <div>
            <p className="text-xl lg:text-4xl lg:w-9/12">Government ID for Verification</p>
            <div className="mt-6 flex gap-x-1">
                <BsInfoCircle className="shrink-0 text-sm relative top-[4px]"/>
                <p className="fs-400">To ensure the safety and trust of our community, we require a government-issued ID for verification.</p>
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
            <div className="mt-8 flex gap-x-1 text-[#E50038]">
            <BsInfoCircle className="text-sm shrink-0 relative top-[4px]"/>
            <p className="fs-400 ">Please upload a photo or scanned copy of your government-issued ID.</p>
        </div>
            <div className="mt-8 flex justify-end">
                <div className="btn-primary cursor-pointer px-6 py-2">
                    <BtnContent name="Create Host Profile"/>
                </div>
            </div>
        </div>
      )
}

export default SetupVerification