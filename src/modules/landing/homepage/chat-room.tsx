import BtnContent from "@/components/btn-content";
import { Link } from "react-router-dom";

const ChatRoom = () => {
  return (
    <div className="section bg-layout-gradient">
      <div className="box overflow-hidden">
        <div className="lg:flex items-center justify-between flex-row-reverse">
          <div className="lg:w-6/12 lg:flex justify-end">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1722605319/fantrip/Group_1171275141_1_1_apss8h.png"
              alt="fandom"
              className="w-full lg:w-10/12 relative lg:-right-3"
            />
          </div>
          <div className="text-white lg:w-6/12">
            <p className="text-3xl lg:text-5xl fw-600 syne">
              Show off your{" "}
              <span className="text-gradient syne">sports smarts</span>{" "}
            </p>
            <div className="mt-9">
              <p className="mt-7 fw-500 italics">
                {" "}
                Share your game predictions, celebrate the wins, or debate that
                last referee call. And don't forget our quizzes - climb up the
                leaderboard and earn your badges.
              </p>
              <p className="mt-7 fw-500 italics">
                {" "}
                This is where the real game happens off the field.
              </p>
            </div>
            <div className="flex lg:mt-16 mt-6">
              <Link to={""} className="btn-primary block px-8 py-4">
                <BtnContent name="Download fantrip" type="download" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
