import { SITE_URL } from "@/services/constant";
import { useToast } from "@chakra-ui/react";
import { FC } from "react";
import { MdContentCopy } from "react-icons/md";
import {
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

interface Props {
  id: string;
  title: string | undefined;
  userId: string;
}
const SharePost: FC<Props> = ({ id, title, userId }) => {
  const url = `${SITE_URL}/chat-room?chatpost-id=${id}&chatinit-id=${userId}`;
  const head = title || "";
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast({
      render: () => (
        <div className="text-white text-center fw-600 syne bg-gradient rounded p-3">
          Link Copied
        </div>
      ),
      position: "top",
    });
  };

  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-8">
        <TwitterShareButton url={url} title={head}>
          <XIcon size={"full"} round className="social-icons" />
        </TwitterShareButton>
        <LinkedinShareButton url={url} title={head}>
          <LinkedinIcon size={"full"} round className="social-icons" />
        </LinkedinShareButton>
        <FacebookShareButton url={url} title={head}>
          <FacebookIcon size={"full"} round className="social-icons" />
        </FacebookShareButton>
        <RedditShareButton url={url} title={head}>
          <RedditIcon size={"full"} round className="social-icons" />
        </RedditShareButton>
        <WhatsappShareButton url={url} title={head}>
          <WhatsappIcon size={"full"} round className="social-icons" />
        </WhatsappShareButton>
      </div>
      <div className="mt-6 lg:mt-10">
        <div className="flex justify-between items-center">
          <p>Post Link</p>
          <button
            onClick={handleCopy}
            className="flex items-center gap-x-2 text-[#fc819f] fw-500 cursor-pointer"
          >
            <MdContentCopy /> Copy link
          </button>
        </div>
        <div className="mt-3 border border-gray-300 p-3 rounded-[10px]">
          <p>{url}</p>
        </div>
      </div>
    </div>
  );
};

export default SharePost;
