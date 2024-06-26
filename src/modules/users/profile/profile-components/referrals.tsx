import { IoGiftOutline, IoSend } from "react-icons/io5";
import { LuFileSignature } from "react-icons/lu";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";

const UserReferrals = () => {
  return (
    <div>
      <p className="hidden lg:block fw-600 lg:text-lg">My Referrals</p>
      <p className="text-sm text-gray-500">Invite your friends to fantrip. If they sign up you will get amazing bonuses</p>
      <div className="border border-[#E8EAED] rounded-[16px] mt-6 p-4">
        {/* <div className="rounded-[14px] bg-layout-gradient p-6 text-white">
          <p className="text-gray-200 fw-500">Referral Bonus</p>
          <p className="text-2xl fw-600 mt-1">$0.00</p>
        </div> */}
        <div className="mt-6 grid lg:grid-cols-3">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto circle place-center bg-[#FFEDF2]">
                    <MdOutlineMarkUnreadChatAlt className="text-2xl text-[#9847fe]"/>
                </div>
                <div className="mt-2">
                    <p className="fw-500">Send Invitation</p>
                    <p className="fs-300 text-gray-600 px-4">Send a referral to friends and tell them how cool fantrip is!</p>
                </div>
            </div>
            <div className="text-center">
                <div className="w-16 h-16 mx-auto circle place-center bg-[#FFEDF2]">
                    <LuFileSignature className="text-2xl text-[#9847fe]"/>
                </div>
                <div>
                    <p className="fw-500">Registartion</p>
                    <p className="fs-300 text-gray-600 px-4">Let them register to our services using your referral link.</p>
                </div>
            </div>
            <div className="text-center">
                <div className="w-16 h-16 mx-auto circle place-center bg-[#FFEDF2]">
                    <IoGiftOutline className="text-2xl text-[#9847fe]"/>
                </div>
                <div>
                    <p className="fw-500">Get Gifts!</p>
                    <p className="fs-300 text-gray-600 px-4">You get to recieve variety of gifts from Fantrip!</p>
                </div>
            </div>
        </div>
        <div className="mt-8 lg:mt-12 lg:px-3">
        <p className="fw-600">Invite your friends</p>
        <p className="text-sm text-gray-500">Insert your friend's email address and send them invitation to join Fantrip!</p>
        <div className="mt-3">
            <div className="border border-gray-400 rounded-[50px] flex gap-x-2 py-2 pr-2 pl-5 w-full">
                <input type="email" className="outline-none bg-transparent py-1 px-2 w-full" />
                <div className="w-12 h-12 shrink-0 circle place-center bg-[#9847fe] cursor-pointer">
                <IoSend className="text-[#fff] text-2xl shrink-0"/>
                </div>
            </div>
        </div>
      </div>
      <div className="mt-8 lg:mt-12 lg:px-3 pb-5">
        <p className="fw-600">Share the referral link</p>
        <p className="text-sm text-gray-500">You can also share your referral link by copying it and sharing it on your socials!</p>
        <div className="mt-3">
            <div className="bg-[#FFEDF2] border border-gray-400 rounded-[50px] flex gap-x-2 py-2 px-5 items-center w-full">
                <input type="email" className="bg-[#FFEDF2] outline-none py-1 px-2 w-full" value={'282yryri34sn'}  disabled/>
                <p className="cursor-pointer text-[#9847fe] fw-600 fs-500 whitespace-nowrap">Copy Link</p>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserReferrals;
