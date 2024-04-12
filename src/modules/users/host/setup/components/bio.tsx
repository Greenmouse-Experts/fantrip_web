import TextInput, { InputType } from '@/components/TextInput'
import BtnContent from '@/components/btn-content'
import { FC } from 'react'
import { BsInfoCircle } from 'react-icons/bs'

interface Props{
    next: () => void
}
const SetupBio:FC<Props> = ({next}) => {
    return (
        <div>
            <p className="text-xl lg:text-4xl">Fill in a Short Bio</p>
            <div className="mt-6 flex gap-x-1">
                <BsInfoCircle className="shrink-0 text-sm relative top-[4px]"/>
                <p className="fs-400">Details about your favorite sports team, why you love hosting a fan, and any personal touches you bring to the hosting experience.</p>
            </div>
            <div className="lg:w-9/12 mt-8">
                <TextInput type={InputType.textarea} label="Write your bio here" labelClassName="text-[#9F9F9F]" altClassName='h-32 w-full rounded-[4px]'/>
            </div>
            <div className="mt-8 flex justify-end">
                <div className="btn-primary cursor-pointer px-6 py-2" onClick={next}>
                    <BtnContent name="Continue"/>
                </div>
            </div>
        </div>
      )
}

export default SetupBio