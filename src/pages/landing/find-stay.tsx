
import FetchStayComponent from "@/modules/landing/find-stay/fetch-component";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const FindStay = () => {
 
  return (
    <div>
      <div className="pt-16 lg:pt-28 bg-layout-gradient">
        <div className="lg:pb-12">
          <div className="py-16 text-white text-center">
          <p className="px-4 lg:px-0 text-2xl lg:text-4xl fw-600 text-center text-white">
            Stay in the heart of the game!
          </p>
          <Link to={'/user/host-setup'} className="flex gap-x-1 mt-2 items-center justify-center text-gradient lg:text-lg fw-500">
            <span>Become a host</span>
            <MdOutlineKeyboardDoubleArrowRight className="text-[#9847FE] lg:text-lg"/>
          </Link>
          </div>
        </div>
      </div>
      <FetchStayComponent/>
      <div className="section bg-[#EDEDFF] mt-24">
      <div className="box">
        <div className="lg:flex flex-row-reverse items-center">
          <div className="lg:w-5/12 lg:flex justify-end">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1712587463/fantrip/Group_1171275051_2_1_dvaat3.png"
              alt="shouting fan"
              className="w-full"
            />
          </div>
          <div className="lg:w-7/12 lg:pl-3 mt-6 lg:mt-0">
            <p className="syne text-2xl lg:text-4xl fw-600 mb-5 dark:!text-black">Experience game day with a superfan host!</p>
            <p className="lg:text-lg dark:!text-black">
              Your host isn't just anyone – they're your pre-match pundit,
              post-game analyst, and fellow cheerleader. Check out their fan
              cave, get the lowdown on their favorite team, and score a stay
              that's all about the love of the game.
            </p>
            <p className="mt-4 lg:mt-8 lg:text-lg dark:!text-black">
              Who needs standard hotel rooms or unavailable hosts when you can
              have a fan's den?
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default FindStay;
