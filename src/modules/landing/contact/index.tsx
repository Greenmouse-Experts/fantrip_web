import { IoMail } from "react-icons/io5";
import ContactForm from "./contact-form";
import SpreadWord from "./spread-word";
import InLoop from "./in-loop";
import { Link } from "react-router-dom";

const ContactIndex = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20">
        <div>
          <p className="text-3xl font-[600] syne lg:text-4xl [@media(min-width:1311px)]:text-5xl lg:!leading-[58px]">
            Got questions, ideas, or just want to share your latest fan
            adventure?
          </p>
          <p className="text-[#494949] lg:text-lg mt-6 lg:mt-12 lg:leading-[36px]">
            Shoot us an email at support@fantrip.app and get ready for a
            friendly reply from our awesome team.Were here to make your Fantrip
            Expereience nothing short of amazing!
          </p>
          <div className="mt-5 lg:mt-12">
            <Link
              to={`#`}
              onClick={(e) => {
                window.location.href = "mailto:support@fantrip.app";
                e.preventDefault();
              }}
              className="flex gap-x-2 items-center cursor-pointer hover:text-prima"
            >
              <IoMail className="text-prima" />
              <span>support@fantrip.app</span>
            </Link>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
      <div className="section">
        <SpreadWord />
      </div>
      <div className="section">
        <InLoop />
      </div>
    </div>
  );
};

export default ContactIndex;
