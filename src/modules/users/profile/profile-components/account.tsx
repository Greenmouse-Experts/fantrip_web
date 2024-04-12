import { AiOutlineEdit } from "react-icons/ai"

const UserAccount = () => {
  return (
    <div>
        <p className="fw-600 lg:text-lg">My Profile</p>
        <div className="border border-[#E8EAED] rounded-[16px] mt-6">
            <div className="flex items-center gap-x-4 p-4">
                <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png" alt="profile" className="w-[70px]" />
                <div>
                    <p className="fw-600">Victor Dwae</p>
                    <p className="mt-1 fs-500">User</p>
                </div>
            </div>
        </div>
        <div className="border border-[#E8EAED] rounded-[16px] mt-6 p-4">
            <div className="flex justify-between items-center">
                <p className="fw-600 lg:text-lg">Personal Information</p>
                <div className="flex gap-x-2 items-center border border-gray-400 px-2 rounded-[14px] text-gray-400 cursor-pointer ">
                    <p>Edit</p>
                    <AiOutlineEdit/>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-5 items-center mt-7 pb-2">
                <div>
                    <p className="fs-500 text-[#5F5F5F]">First Name</p>
                    <p className="fw-500 mt-1">Victor</p>
                </div>
                <div>
                    <p className="fs-500 text-[#5F5F5F]">Last Name</p>
                    <p className="fw-500 mt-1">Nwanyi</p>
                </div>
                <div>
                    <p className="fs-500 text-[#5F5F5F]">Email</p>
                    <p className="fw-500 mt-1">victornwayi@gmail.com</p>
                </div>
                <div>
                    <p className="fs-500 text-[#5F5F5F]">First Name</p>
                    <p className="fw-500 mt-1">+1 (409) 939 35535</p>
                </div>
            </div>
        </div>
        <div className="border border-[#E8EAED] rounded-[16px] mt-6 p-4">
            <div className="flex justify-between items-center">
                <p className="fw-600 lg:text-lg">Address</p>
                <div className="flex gap-x-2 items-center border border-gray-400 px-2 text-gray-400 cursor-pointer rounded-[14px]">
                    <p>Edit</p>
                    <AiOutlineEdit/>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-5 items-center mt-7 pb-2">
                <div>
                    <p className="fs-500 text-[#5F5F5F]">Country</p>
                    <p className="fw-500 mt-1">United Kingdom</p>
                </div>
                <div>
                    <p className="fs-500 text-[#5F5F5F]">State</p>
                    <p className="fw-500 mt-1">London</p>
                </div>
                <div>
                    <p className="fs-500 text-[#5F5F5F]">City</p>
                    <p className="fw-500 mt-1">Tottheham</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserAccount