import Button from "@/components/Button"
import TextInput, { InputType } from "@/components/TextInput"

const UserSecurity = () => {
  return (
    <div>
        <p className="fw-600 lg:text-lg">Change Password</p>
        <div className="border border-[#E8EAED] rounded-[16px] mt-6 p-4">
            <div className="grid gap-4 py-4">
            <div className=''>
                <p className="fw-500">Old Password</p>
                <div>
                    <TextInput type={InputType.password}/>
                </div>
            </div>
            <div className=''>
                <p>New Password</p>
                <div>
                    <TextInput type={InputType.password}/>
                </div>
            </div>
            <div className=''>
                <p>Confirm New Password</p>
                <div>
                    <TextInput type={InputType.password}/>
                </div>
            </div>
            <div className="flex mt-8 justify-end">
                <div className="w-4/12">
                <Button title={'Change Password'} type="int"/>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserSecurity